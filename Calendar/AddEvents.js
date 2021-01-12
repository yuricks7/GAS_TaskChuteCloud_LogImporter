function ExportToCalendar() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet       = spreadsheet.getSheetByName('data');
  var dataRange   = sheet.getDataRange();
  var values      = dataRange.getValues();

  const rows = {
    header      : 2,
    arrayFormula: 3,
    firstData   : 4,
    lastData    : values.length + 1,
  };

  const cols = {
    actionDate:  1,
    startTime : 23,
    finishTime: 24,

    isCopied: 25,

    project: 28,
    task   : 35,
    mode   : 38,
    link   : 44,
    comment: 45,
  };

  // シートのデータをカレンダーに転記
  const calendar = getCalendar_('行動ログ');

  try { // 1度に転記する数が多いとエラーで止められるため、try~catch構文の中で処理する
    var isCopied = [];
    for (var i = rows.firstData - 1; i < values.length; i++) {

      // レコード1件分のデータ
      var rowData = values[i];

      // レコードの内容によっては処理を飛ばす
      if (rowData[cols.finishTime - 1] === '') {
        isCopied.push('');
        continue;
      }
      if (rowData[cols.isCopied - 1]) {
        isCopied.push(true);
        continue;
      }

      // イベントを作成
      var data  = {
        startTime : rowData[cols.startTime  - 1],
        finishTime: rowData[cols.finishTime - 1],

        project: rowData[cols.project - 1],
        task   : rowData[cols.task    - 1],
        mode   : rowData[cols.mode    - 1],
        link   : rowData[cols.link    - 1],
        comment: rowData[cols.comment - 1],
      }

      var event = createEvent_(calendar, data); // 重複があったら上書きするようにした方が良いかも？
      if (data.mode) changeEventColor_(event, data.mode);

      isCopied.push(true);
    }

  } catch(e) {

  }

  // 転記が完了したものは、シートに`true`を入力
  const arr2d = transpose_([isCopied]);
  sheet.getRange(rows.firstData,  cols.isCopied, isCopied.length, 1).setValues(arr2d);
}

/**
 * カレンダーを取得
 * 
 * @param {string} name
 * 
 * @return {CalendarApp.Calendar} 記録先のカレンダー
 */
function getCalendar_(name) {
  const calendars = CalendarApp.getCalendarsByName(name);
  return calendars[0];
}

/**
 * イベントの説明に記入する文章（ログの概要）をHTML形式で作成する
 * 
 * @param {object} data CSVでダウンロードしたデータ（を加工したもの）
 */
function generateEventDescription_(data) {
  // ログの概要（イベントの説明に記入）
  const pre = '<b>【';
  const suf = '】</b>';

  var link    = switchIfUndefined_(data.link, '<a href="' + data.link + '">link</a>');
  var comment = switchIfUndefined_(data.comment, data.comment);

  var m = '';
  m += pre + 'プロジェクト' + suf + data.project + '\n';
  m += pre + '作業モード' + suf + data.mode + '\n';
  m += pre + 'リンク' + suf + link + '\n';
  m += pre + 'コメント' + suf + comment;

  return m;
}

/**
 * 空欄なら`-`に置き換える
 * 
 * @param {string} src
 * @param {string} defaultStr
 * 
 * @return 置き換え後の値
 */
function switchIfUndefined_(src, defaultStr) {
  if (!src) {
    return '-';

  } else {
    return defaultStr;

  }
}

/**
 * 指定のカレンダーにイベントを作成する
 * 
 * @param {CalendarApp.Calendar} calendar
 * @param {object}               data
 * 
 * @return {CalendarApp.CalendarEvent (+1 overload)}
 */

function createEvent_(calendar, data) {
  // イベントのデータを設定
  var eventData = {
    title:  data.task,
    start:  new Date(data.startTime),
    finish: new Date(data.finishTime),
    option: {
      description: generateEventDescription_(data),
    },
  }

  // イベントを作成
  return calendar.createEvent(
    eventData.title,
    eventData.start,
    eventData.finish,
    eventData.option
  );
}

/**
 * モードの番号ごとにイベントの色を設定する
 * 
 * @param {CalendarApp.CalendarEvent} event
 * @param {string}                    mode
 */
function changeEventColor_(event, mode) {
  var eventColor = modeToColor_(mode);
  event.setColor(eventColor);
}

/**
 * 系列の色を取得
 * 
 * @param {string} mode
 * 
 * @return {string} カラーコード or 組み込みの色名
 */
function modeToColor_(mode) {
  // 系列ごとに色を定義
  const modeColors = defineSeries_();

  var buf = {};
  for (defs in modeColors) {
    buf = modeColors[defs];
    if (mode.indexOf(buf.key) !== -1) return buf.color;
  }
}

/**
 * 系列ごとの色を定義
 * 
 * @return {object} 系列ごとのキーワードと色を格納したオブジェクト
 */
function defineSeries_() {
  const eventColors = CalendarApp.EventColor;

  return {
    mdFinance:     { key: '00.', color: eventColors.RED, },

    mdPlan:        { key: '01.', color: eventColors.ORANGE, },
    mdSetting:     { key: '02.', color: eventColors.ORANGE, },
    mdMove:        { key: '03.', color: eventColors.RED, },

    mdMtg:         { key: '10.', color: eventColors.PALE_RED, },
    mdKouryu:      { key: '11.', color: eventColors.PALE_RED, },

    mdDesigning:   { key: '20.', color: eventColors.MAUVE, }, // 藤色
    mdCoding:      { key: '21.', color: eventColors.MAUVE, },

    mdFocus:       { key: '30.', color: eventColors.CYAN, },
    mdLearn:       { key: '40.', color: eventColors.BLUE, },

    mdSimpleTask:  { key: '50.', color: eventColors.PALE_BLUE, },

    mdHouseWork:   { key: '70.', color: eventColors.GREEN },
    mdArrangement: { key: '71.', color: eventColors.GREEN, },

    mdHealthCare:  { key: '80.', color: eventColors.PALE_GREEN, },
    mdBreakTime:   { key: '90.', color: eventColors.PALE_GREEN, },
    mdRestTime :   { key: '91.', color: eventColors.PALE_GREEN, },

    mdIdleTime:    { key: 'だらだら', color: eventColors.GRAY, },
    mdSleep:       { key: '99.',     color: eventColors.GRAY, },
  };
}

/**
 * 一次元配列を二次元配列（縦）にする
 *
 * 【参考】
 * - ワクガンス　|　JavaScriptの覚書
 *   https://amaraimusi.sakura.ne.jp/note_prg/JavaScript/note2.html
 * 
 * - メモ：2次元配列の行列を入れ替える - まえとうしろ
 *   https://maetoo11.hatenablog.com/entry/2017/05/10/123140
 *   > 各行の0番目の値を取り出した配列を作る、行の1番目の値を取り出した配列を作る…を繰り返して、新しい2次元配列を作成。
 * 
 * @param {[][]} src 転置前の配列
 *
 * @return {[][]} 転置後の二次元配列
 */
function transpose_(src) {
  return Object.keys(src[0]).map(function (c) {
    return src.map(function (r) {
      return r[c];
    });
  });
}
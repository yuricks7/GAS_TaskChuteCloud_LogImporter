function ExportToCalendar() {
  const dataSheet = new DataSheet();
  const rows   = dataSheet.rows;
  const cols   = dataSheet.cols;
  const values = dataSheet.values;

  // シートのデータをカレンダーに転記
  const logCalendar = new LogCalendar();
  const calendar    = logCalendar.cal;

  // try { // 1度に転記する数が多いとエラーで止められるため、try~catch構文の中で処理する
    var isCopied = [];
    for (var i = rows.firstData - 1; i < values.length; i++) {
      var rowValues = values[i];

      // レコードの内容によっては処理を飛ばす
      if (rowValues[cols.finishTime - 1] === '') {
        isCopied.push('');
        continue;
      }

      if (rowValues[cols.isCopied - 1]) {
        isCopied.push(true);
        continue;
      }

      // イベントを作成
      var logEvent = new LogEvent(calendar, rowValues, cols);
      var content = logEvent.content;
      var event   = logEvent.event;

      // var event = createEvent_(calendar, logContent); // 重複があったら上書きするようにした方が良いかも？
      if (content.mode) changeEventColor_(event, content.mode);
      // if (logContent.mode) changeEventColor_(event, logContent.mode);

      isCopied.push(true);
    }

  // } catch(e) {

  // }

  // 転記が完了したものは、シートに`true`を入力
  const arr2d = transpose_([isCopied]);
  dataSheet.sheet.getRange(rows.firstData,  cols.isCopied, isCopied.length, 1).setValues(arr2d);
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
 * @return {{}} 系列ごとのキーワードと色を格納したオブジェクト
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
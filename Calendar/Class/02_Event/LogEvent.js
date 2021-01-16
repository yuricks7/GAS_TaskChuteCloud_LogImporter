/**
 * イベントを管理するクラス
 *
 * @param {CalendarApp.Calendar} calendar   記録先のカレンダー
 * @param {LogContent}           logContent 1行分のデータ
 */
var LogEvent = function (calendar, logContent) {
  this.calendar   = calendar;
  this.logContent = logContent;

  // 可読性を考えて、初期化時点ではイベント作成しない
  this.event = {};
  // this.event = this.create(this.calendar, this.logContent);
}

/**
 * 指定のカレンダーにイベントを作成する
 * 
 * @return {CalendarApp.CalendarEvent}
 */
LogEvent.prototype.create = function() {
  var logContent = this.logContent;
  var details = {
    description: this._toDescriptionHtml(logContent),
  };

  // イベントを作成
  this.event = this.calendar.createEvent(
    logContent.task,
    new Date(logContent.startTime),
    new Date(logContent.finishTime),
    details
  );

  return this.event;
}

/**
 * イベントの説明に記入する文章（ログの概要）をHTML形式で作成する
 */
LogEvent.prototype._toDescriptionHtml = function() {
  var data = this.logContent;

  // ログの概要（イベントの説明に記入）
  const pre = '<b>【';
  const suf = '】</b>';

  var link    = this._replaceIfUndefined(data.link,    '<a href="' + data.link + '">link</a>');
  var comment = this._replaceIfUndefined(data.comment, data.comment);

  var m = '';
  m += pre + 'プロジェクト' + suf + data.project + '\n';
  m += pre + '作業モード'   + suf + data.mode + '\n';
  m += pre + 'リンク'      + suf + link + '\n';
  m += pre + 'コメント'     + suf + comment;

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
LogEvent.prototype._replaceIfUndefined = function(src, defaultStr) {
  if (!src) {
    return '-';

  } else {
    return defaultStr;

  }
}

/**
 * モードの番号ごとにイベントの色を設定する
 * 
 * @note
 *  16進数(#ffffffなど)では指定できない模様…
 * 
 * 【参考】
 *   Google Apps Script - googleカレンダーに予定（イベント）を登録する際に内容により色を指定したい。｜teratail
 *   https://teratail.com/questions/186554
 */
LogEvent.prototype.changeColor = function() {
  var color = this._modeToColor(this.logContent.mode);

  try {
    this.event.setColor(color);
  } catch(e) {
    
  }
}

/**
 * 系列の色を取得
 * 
 * @return {string} カラーコード or 組み込みの色名
 */
LogEvent.prototype._modeToColor = function() {
  var mode = this.logContent.mode;

  // 系列ごとに色を定義
  const modeColors = this._defineModeColors();

  var buf = {};
  for (defs in modeColors) {
    buf = modeColors[defs];
    if (mode.indexOf(buf.key) !== -1) return buf.color;
  }
}

/**
 * モード番号ごとの色を定義
 * 
 * 【参考】
 *   Enum EventColor  |  Apps Script  |  Google Developers
 *   https://developers.google.com/apps-script/reference/calendar/event-color
 * 
 * @return {{}} 系列ごとのキーワードと色を格納したオブジェクト
 */
LogEvent.prototype._defineModeColors = function() {
  const eventColors = CalendarApp.EventColor;

  return {
    finance:     { key: '00.', color: eventColors.RED, },

    plan:        { key: '01.', color: eventColors.YELLOW, },
    setting:     { key: '02.', color: eventColors.YELLOW, },
    move:        { key: '03.', color: eventColors.RED, },

    mtg:         { key: '10.', color: eventColors.PALE_RED, },
    kouryu:      { key: '11.', color: eventColors.PALE_RED, },

    designing:   { key: '20.', color: eventColors.MAUVE, }, // 藤色
    coding:      { key: '21.', color: eventColors.MAUVE, },

    focus:       { key: '30.', color: eventColors.MAUVE, },
    learn:       { key: '40.', color: eventColors.BLUE, },

    simpleTask:  { key: '50.', color: eventColors.PALE_BLUE, },

    houseWork:   { key: '70.', color: eventColors.CYAN },
    arrangement: { key: '71.', color: eventColors.CYAN, },

    healthCare:  { key: '80.', color: eventColors.GREEN, },
    breakTime:   { key: '90.', color: eventColors.PALE_GREEN, },
    restTime :   { key: '91.', color: eventColors.PALE_GREEN, },

    idleTime:    { key: 'だらだら', color: eventColors.GRAY, },
    sleep:       { key: '99.',     color: eventColors.GRAY, },
  };
}
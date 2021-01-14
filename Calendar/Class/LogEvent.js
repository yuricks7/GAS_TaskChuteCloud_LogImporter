/**
 * イベントを管理するクラス
 *
 * @param {CalendarApp.Calendar} calendar  記録先のカレンダー
 * @param {[]}                   rowValues 1行分のデータ
 * @param {{}}                   cols      行番号
 */
var LogEvent = function (calendar, rowValues, cols) {
  this.calendar = calendar

  var logContent = new LogContent(rowValues, cols);
  this.content  = logContent

  this.event = createEvent_(this.calendar, this.content);

}

/**
 * 指定のカレンダーにイベントを作成する
 * 
 * @param {CalendarApp.Calendar} calendar
 * @param {LogContent}           content  イベント1件分のデータ
 * 
 * @return {CalendarApp.CalendarEvent}
 */
function createEvent_(calendar, content) {
  // イベントのデータを設定
  var eventData = {
    title:  content.task,
    start:  new Date(content.startTime),
    finish: new Date(content.finishTime),
    option: {
      description: generateEventDescription_(content),
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
 * イベントの説明に記入する文章（ログの概要）をHTML形式で作成する
 * 
 * @param {{}} data CSVでダウンロードしたデータ（を加工したもの）
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
 * ●●する
 *
 * @param {} 
 * @param {} 
 * @param {} 
 * @param {} 
 * @return {} 
 */
LogEvent.prototype.NEW_METHOD = function (argument) {
  if (!argument) {
    Logger.log('引き数がアリマセーン')
  }

  argument

  return argument;
};
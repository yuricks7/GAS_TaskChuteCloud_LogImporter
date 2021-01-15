/**
 * 記録先のカレンダーを管理するクラス
 *
 * @param {} 
 * @param {} 
 * @param {} 
 * @param {} 
 */
var LogCalendar = function(name) {
  // this.property = property;

  this.calendar = CalendarApp.getCalendarsByName(name)[0];
}

/**
 * 指定のカレンダーにイベントを作成する
 * 
 * @param {LogContent} logContent  イベント1件分のデータ
 * 
 * @return {LogEvent} イベントを管理するクラス
 */
LogCalendar.prototype.add = function(logContent) {
  var eventLog = new LogEvent(this.calendar, logContent);
  eventLog.create();

  return eventLog;
};
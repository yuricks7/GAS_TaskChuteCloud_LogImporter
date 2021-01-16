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

/**
 * 指定日のイベントをすべて削除する
 * 
 * - 日付は`yyyy/mm/dd hh:mm:ss`形式で渡すこと。
 * 
 * @param {String} date 日付（`yyyy/mm/dd hh:mm:ss`形式）
 */
LogCalendar.prototype.deleteAll = function(date) {
  var testDate = new Date(date);
  var events = this.calendar.getEventsForDay(testDate);
  for (var i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }
}

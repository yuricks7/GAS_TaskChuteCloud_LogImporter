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

  this.days = {
    first: new Date('2020/07/11 00:00:00'), // 記録日
    last : new Date(), // 実行日当日
  };
}

/**
 * 指定のカレンダーにイベントを作成する
 * 
 * @param {LogContent} logContent  イベント1件分のデータ
 * 
 * @return {LogEvent} イベントを管理するクラス
 */
LogCalendar.prototype.add = function(logContent) {
  // 重複があれば、上書きするために予め消しておく
  this.removeDuplicate(new Date(logContent.startTime), logContent.task);

  var eventLog = new LogEvent(this.calendar, logContent);
  eventLog.create();

  return eventLog;
};

/**
 * 重複があれば上書き
 * 
 * @param {Date}   dateTime 指定日時のDateオブジェクト
 * @param {string} title    イベントのタイトル
 */
LogCalendar.prototype.removeDuplicate = function(dateTime, title) {
  if ( !this.hasSameLog(dateTime, title) ) return;

  var events = this.calendar.getEventsForDay(dateTime);
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    if (event.getTitle() === title) {

      console.log('Title is duplicated.');
      event.deleteEvent();

      console.log(event.getStartTime());
      return;
    }
  }
};

/**
 * 指定日時かつ同じ内容のログがあるか
 * 
 * @param {Date}   dateTime 指定日時のDateオブジェクト
 * @param {string} title    イベントのタイトル
 * 
 * @return {boolean} イベントを管理するクラス
 */
LogCalendar.prototype.hasSameLog = function(dateTime, title) {
  const events = this.getAll();
  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    if (dateTime.getTime() != event.getStartTime().getTime()) continue;
    if (title === event.getTitle()) return true;
  }

  return false;
}

/**
 * 現在カレンダーに記録しているログをすべて修得する
 * 
 * @return {CalendarApp.CalendarEvent[]} 全期間のイベントを格納した配列
 */
LogCalendar.prototype.getAll = function() {
  return this.calendar.getEvents(this.days.first, this.days.last);
};

/**
 * カレンダーに登録されているログをすべて削除する
 */
LogCalendar.prototype.deleteAll = function(date) {
  var events = this.getAll();
  for (var i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }
}

/**
 * 指定日のログをすべて削除する
 * 
 * - 日付は`yyyy/mm/dd hh:mm:ss`形式で渡すこと。
 * 
 * @param {String} date 日付（`yyyy/mm/dd hh:mm:ss`形式）
 */
LogCalendar.prototype.deleteAllByDate = function(date) {
  var testDate = new Date(date);

  var events = this.calendar.getEventsForDay(testDate);
  for (var i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }
}

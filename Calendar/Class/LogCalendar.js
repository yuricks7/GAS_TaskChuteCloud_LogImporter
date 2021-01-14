/**
 * 記録先のカレンダーを管理するクラス
 *
 * @param {} 
 * @param {} 
 * @param {} 
 * @param {} 
 */
var LogCalendar = function() {
  // this.property = property;

  this.cal = CalendarApp.getCalendarsByName('行動ログ')[0];
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
LogCalendar.prototype.NEW_METHOD = function(argument) {
  if (!argument) {
    Logger.log('引き数がアリマセーン')
  }
  
  argument
  
  return argument;
};
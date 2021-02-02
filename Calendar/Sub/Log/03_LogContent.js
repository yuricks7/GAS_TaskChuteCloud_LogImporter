/**
 * シート1行分のデータを各プロパティに振り分けるクラス
 *
 * @param {[]} rowValues 1行分のデータ
 * @param {{}} cols      行番号
 */
var LogContent = function (rowValues, cols) {
  this.startTime  = rowValues[cols.startTime  - 1];
  this.finishTime = rowValues[cols.finishTime - 1];

  this.project = rowValues[cols.project - 1];
  this.task    = rowValues[cols.task - 1];
  this.mode    = rowValues[cols.mode - 1];
  this.link    = rowValues[cols.link - 1];
  this.comment = rowValues[cols.comment - 1];
}

// /**
//  * ●●する
//  *
//  * @param {} 
//  * @param {} 
//  * @param {} 
//  * @param {} 
//  * @return {} 
//  */
// LogContent.prototype.NEW_METHOD = function (argument) {
//   if (!argument) {
//     Logger.log('引き数がアリマセーン')
//   }

//   argument

//   return argument;
// };
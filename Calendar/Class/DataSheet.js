/**
 * `data`シートの情報を保持するクラス
 */
var DataSheet = function() {
  this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  this.sheet       = this.spreadsheet.getSheetByName('data');
  this.dataRange   = this.sheet.getDataRange();
  this.values      = this.dataRange.getValues();

  this.rows = {
    header      : 2,
    arrayFormula: 3,
    firstData   : 4,
    lastData    : this.values.length + 1,
  };

  this.cols = {
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

}

/**
 * 特定のセルの値を修得する
 *
 * @param {number} 
 * @param {number} 
 * 
 * @return {any} 
 */
DataSheet.prototype.cells = function(row, column) {
  return this.values[row - 1][column - 1];
};
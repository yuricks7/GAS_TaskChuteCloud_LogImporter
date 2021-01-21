/**
 * `data`シートの情報を保持するクラス
 */
var DataSheet = function() {
  this.spreadsheet  = SpreadsheetApp.getActiveSpreadsheet();
  this.sheet        = this.spreadsheet.getSheetByName('data');
  this.dataRange    = this.sheet.getDataRange();
  this.values       = this.dataRange.getValues();

  this.rows = {
    header      : 2,
    arrayFormula: 3,
    firstData   : 4,
    lastData    : this.values.length + 1,
  };

  this.headerValues = this.values[1];
  this.cols = {
    actionDate: this._columnNumber(  '実行日', true),
    startTime : this._columnNumber('開始日時', true),
    finishTime: this._columnNumber('終了日時', true),

    isCopied: this._columnNumber('転記済', true),

    project: this._columnNumber('プロジェクト', false),
    task   : this._columnNumber('タスク',      false),
    mode   : this._columnNumber('分類',        false),
    link   : this._columnNumber('リンク',      false),
    comment: this._columnNumber('コメント',    false),
  };
}

/**
 * ヘッダーの名前から列番号を修得する
 *
 * @param {string}  header
 * @param {boolean} isFromLeft
 * 
 * @return {number} 列番号
 */
DataSheet.prototype._columnNumber = function(header, isFromLeft) {
  var index = -1;
  if (isFromLeft === true) {
    index = this.headerValues.indexOf(header);

  } else {
    index = this.headerValues.lastIndexOf(header);

  }

  return index + 1;
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
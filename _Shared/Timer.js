/**
 * 実行時間を計測するクラス
 * 
 * - `ミリ秒`単位で管理
 */
var Timer = function() {
  // 初期化
  const initTime  = new Date();
  this.startTime  = initTime;
  this.finishTime = initTime;

  this.currentTime = this.rap();

  this.max = 6 * 60 * 1000;
}

/**
 * 実行時間を設定
 *
 * @param {number} minute 実行時間（分単位）
 *
 * @return {number} ミリ秒
 */
Timer.prototype.setMax = function(minute) {
  this.max = minute * 60 * 1000;
  return this.max;
}

/**
 * 計測を開始する
 */
Timer.prototype.start = function() {
  this.startTime = new Date;
  return this.startTime;
}

/**
 * 途中経過
 */
Timer.prototype.rap = function() {
  this.currentTime = new Date;
  return this.currentTime;
}

/**
 * 計測を終了する
 */
Timer.prototype.finish = function() {
  this.finishTime = new Date;
  return this.finishTime;
}

// /**
//  * 概要
//  *
//  * @param {number}   limitedTime 内容
//  * @param {function} func        実行する関数
//  * @param {boolean}  canPrint    ログ出力するか
//  *
//  * @return {any} 関数の戻り値
//  */
// Timer.prototype.runWithinLimit = function(limitedTime, func, canPrint) {
//   while (true) {
//     func();

//     var rap = this.rap();
//     if (canPrint) console.log(rap);
//     if (this.getRapTime() > limitedTime) break;
//   }

//   return;
// }

/**
 * ラップタイムを取得する
 *
 * @return {number} ラップタイム（ミリ秒）
 */
Timer.prototype.getRapTime = function() {
  return this.currentTime - this.startTime;
}

/**
 * 所要時間を計算する
 *
 * @return {number} 「hh:mm:ss」形式の文字列
 */
Timer.prototype.getProcessTime = function() {
//  var processTime = this.finishTime - this.startTime;

//  return this.getFormattedString(processTime, 'hh:mm:ss');
  return this.finishTime - this.startTime;
};

/**
 * Dateオブジェクトを指定の書式で文字列に変換する
 *
 * 【使用ライブラリ】
 * 日付の書式操作に外部ライブラリを使用
 * [Name]    Moment.js
 * [Key]     MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48
 * [version] 9
 *
 * @param {object} date   対象のDateオブジェクト
 * @param {string} format 変換の書式
 *
 * @return {string} 変換後の文字列
 */
Timer.prototype.getFormattedString = function(date, format) {
  if (!date)   date = new Date;
  if (!format) format = 'yyyy/mm/dd hh:mm:ss';

  return Moment.moment(date).format(format);
};

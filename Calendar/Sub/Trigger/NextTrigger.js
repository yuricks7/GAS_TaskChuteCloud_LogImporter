/**
 * 次回のトリガーを設定するクラス
 * 
 * @param {string} funcName
 * @param {number} afterByMinutes
 */
var NextTrigger = function(funcName, afterByMinutes) {
  this.afterByMinutes  = afterByMinutes;
  this.afterByMilliSec = afterByMinutes * 60 * 1000;

  this.funcName = funcName;
}

/**
 * トリガーを設定する
 *
 * - 【参考】
 *   - 高橋宣成（2020）『[詳解! Google Apps Script完全入門[第2版] ~GoogleアプリケーションとGoogle Workspaceの最新プログラミングガイド](https://amzn.to/3rSFq69)』秀和システム 第1版第1刷（p.547）
 */
NextTrigger.prototype.build = function() {
  return ScriptApp.newTrigger(this.funcName).timeBased().after(this.afterByMilliSec).create();
}
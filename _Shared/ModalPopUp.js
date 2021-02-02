/**
 * 処理中～処理完了のメッセージを設定する
 *
 * - 【参考】
 *   - モーダルの作成
 *     - [Google Apps Scriptで差し込み印刷的な何か | officeの杜](https://officeforest.org/wp/2019/02/07/google-apps-script%E3%81%A7%E5%B7%AE%E3%81%97%E8%BE%BC%E3%81%BF%E5%8D%B0%E5%88%B7%E7%9A%84%E3%81%AA%E4%BD%95%E3%81%8B/)
 *
 * @param {Ui} ui 操作対象ドキュメントのUIオブジェクト
 */
var ModalPopUp = function(ui) {
  this.ui     = ui;
  this.width  = 360;
  this.height = 240;
}

/**
 * メッセージを表示する
 * 
 * @param {string} title    モーダルのタイトル
 * @param {string} htmlPath ポップアップに使用するHTMLのソース
 */
ModalPopUp.prototype.print = function(title, htmlPath) {
  this.ui.showModalDialog(this._runScriptlet(htmlPath), title);
};

/**
 * 「処理中」のメッセージを表示する
 * 
 * @param {string} htmlPath ポップアップに使用するHTMLのソース
 */
ModalPopUp.prototype.printProcessing = function(htmlPath) {
  this.ui.showModalDialog(this._runScriptlet(htmlPath), '処理中');
};

/**
 * 「処理完了」のメッセージを表示する
 * 
 * @param {string} htmlPath ポップアップに使用するHTMLのソース
 */
ModalPopUp.prototype.printFinished = function(htmlPath) {
  this.ui.showModalDialog(this._runScriptlet(htmlPath), '処理完了');
};

/**
 * スクリプトレットを実行した上でHtmlOutputオブジェクトを取得する
 * 
 * @param {string} htmlPath ポップアップに使用するHTMLのソース
 * 
 * @return {HtmlService.HtmlOutput}
 */
ModalPopUp.prototype._runScriptlet = function(htmlPath) {
  var template = HtmlService.createTemplateFromFile(htmlPath);
  return template.evaluate()
                 .setWidth( this.width)
                 .setHeight(this.height);
};
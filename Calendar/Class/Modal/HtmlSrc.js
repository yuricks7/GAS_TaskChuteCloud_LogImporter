/**
 * モーダルのHTMLファイルを管理する
 */
var HtmlSrc = function() {
  // ポップアップのHTMLソース
  const sourceDir = 'Calendar/Class/Modal/client/';
  this.dir = sourceDir;

  this.path = {
    onOutput: sourceDir + 'spinner',
    finished: sourceDir + 'finishMessage',
  }
}
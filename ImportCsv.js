/* ------------------------------------------------------------------
 * TCCから出力したCSVデータをスプレッドシートに出力する
 * 
 * 【参考】
 * - 【GAS/Googleスプレッドシート】CSVファイルをアップロードしてGoogleスプレッドシートに内容を入力する - ソースに絡まるエスカルゴ
 *   https://rikoubou.hatenablog.com/entry/2020/03/17/183126 *
 * 
 * - Google Apps ScriptでCSVファイルのデータをスプレッドシートに展開する方法
 *   https://tonari-it.com/gas-dialog-csv-parse-spreadsheet/
 * 
 * 【note】
 * V8ランタイムだと`google.script.run`が上手く使えないので、Rhinoランタイムのままにしておくこと。
 * 
 * GASのgoogle.script.runをPromise化する - 330k info
 * https://www.330k.info/essay/gas_google_script_run_convert_promise/
 * 
 * ------------------------------------------------------------------ */

/**
 * スプシにメニューを追加
 */
function onOpen() {
  SpreadsheetApp.getUi()
                .createMenu('▼TaskChute Cloud')
                .addItem('インポート', 'csvDialog')
                .addSeparator()
                .addItem('グラフを修正', 'ChangeChartColors')
                .addToUi();
}

/**
 * ダイアログを表示
 */
function csvDialog() {
  var html = HtmlService.createHtmlOutputFromFile('index');
  SpreadsheetApp.getUi().showModalDialog(html, 'CSVをインポート');
}

/**
 * シートにデータを貼り付ける
 */
function uploadProcess(formObject) {
  // データを取得
  var formBlob = formObject.myFile;
  var csvText  = formBlob.getDataAsString("UTF-16LE"); // 文字コード指定
  var values   = Utilities.parseCsv(csvText, "\t");    // タブ区切り（tsv）

  // 貼り付け先を取得
  var sheet         = SpreadsheetApp.getActiveSheet();
  var dataRange     = sheet.getDataRange();
  var currentValues = dataRange.getValues();
  var lastIndex     = currentValues.length;

  // （重複していれば）見出しは除く
  if (lastIndex !== 0) values.shift();

  // 貼り付け
  var pasteRange = sheet.getRange(lastIndex + 1, 1, values.length, values[0].length);
  pasteRange.setValues(values);
}
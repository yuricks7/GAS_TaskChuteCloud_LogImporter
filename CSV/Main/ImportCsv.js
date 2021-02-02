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
 * ダイアログを表示
 * 
 * - 【参考】
 *   - CSSを適用する方法
 *     - [GASでWebページを作るときにHTMLとCSSを別ファイルに記述する方法](https://tonari-it.com/gas-web-html-css-scriptlet/#toc2)
 * 
 */
function showImportDialog() {
  var template = HtmlService.createTemplateFromFile('CSV/Sub/Modal/client/index');
  var html     = template.evaluate(); // スクリプトレットを実行した上でHtmlOutputオブジェクトを取得する

  SpreadsheetApp.getUi().showModalDialog(html, 'CSVをインポート');
}

/**
 * シートにデータを貼り付ける
 */
function uploadProcess(formObject) {
  // データを取得
  var formBlob  = formObject.myFile;
  var csvText   = formBlob.getDataAsString("UTF-16LE"); // 文字コード指定
  var csvValues = Utilities.parseCsv(csvText, "\t");    // タブ区切り（tsv）

  // 貼り付け先を取得
  var dataSheet = new DataSheet();
  var lastIndex = dataSheet.values.length;

  // （重複していれば）見出しは除く
  if (lastIndex !== 0) csvValues.shift();

  // 貼り付け
  var sheet = dataSheet.sheet;

  // （データ1行目からの場合）
  var pasteRange = sheet.getRange(
        dataSheet.rows.firstData, dataSheet.cols.actionDate,
        csvValues.length,         csvValues[0].length
  );

  // // （最終行（=アクティブ行 + 1）からの場合）
  // var pasteRange = sheet.getRange(
  //       lastIndex + 1,    1,
  //       csvValues.length, csvValues[0].length
  // );

  pasteRange.setValues(csvValues);
}
/**
 * メイン
 */
function ExportWithUi() {
  exportToCalendar(true);
}

function ExportWithoutUi() {
  exportToCalendar(false);
}

/**
 * メイン処理
 * 
 * @param {boolean} canDraw UIをつけるか（トリガーから実行する時は`false`を選択すること）
 */
function exportToCalendar(canDraw) {
  // 時限タイマーをセット
  const timer = new Timer();
  timer.setMax(5.5); // 少し余裕を持って5分半とする
  timer.start();

  // 処理中はポップアップでスピナーを表示
  if (canDraw) {
    const ui = SpreadsheetApp.getUi();
    const popUp   = new ModalPopUp(ui);
    const htmlSrc = new HtmlSrc();
    popUp.printProcessing(htmlSrc.path.onOutput);
  }

  // データを準備
  const dataSheet = new DataSheet();
  const rows   = dataSheet.rows;
  const cols   = dataSheet.cols;

  // 転記
  var results = transport_(dataSheet, timer);

  // 今回の結果を記録
  const arr2d = transpose_([results]); // →`true/false`ではなく`event id`の方が良いかも
  dataSheet.sheet.getRange(rows.firstData,  cols.isCopied, results.length, 1).setValues(arr2d);

  // 次のトリガーを設定しておく
  if (dataSheet.rows.lastData - 3 - 1 > results.length) scheduleReRun_();

  // 完了表示
  if (canDraw) popUp.printFinished(htmlSrc.path.finished);
}

/**
 * シートのデータをカレンダーに転記
 * 
 * - 【note】  
 *   - 1度に転記する数が多いとサーバーエラーで止められることがあるため、
 *     途中終了しないように`try~catch構文`の中で処理する
 *
 * @param {DataSheet} dataSheet 元データ
 * @param {Timer}     timer     実行時間の管理用
 *
 * @return {[[]]} シート記録用のデータ
 */
function transport_(dataSheet, timer) {
  const rows   = dataSheet.rows;
  const cols   = dataSheet.cols;
  const values = dataSheet.values;

  const actionLog = new LogCalendar('行動ログ');
  const  sleepLog = new LogCalendar('睡眠ログ');

  try {
    var results = []; // シート記録用（→`true/false`ではなく`event id`の方が良いかも）
    for (var i = rows.firstData - 1; i < values.length; i++) {
      var rowValues = values[i];

      // レコードの内容によっては処理を飛ばす
      if (rowValues[cols.finishTime - 1] === '') {
        results.push('');
        continue;
      }

      if (rowValues[cols.isCopied - 1]) {
        results.push(true);
        continue;
      }

      // 睡眠ログとそれ以外を分けて記録
      var logContent = new LogContent(rowValues, cols);
      switch (logContent.task) {
        case '睡眠':
          addLog_(sleepLog, logContent);
          break;

        default:
          addLog_(actionLog, logContent);
          break;
      }

      results.push(true);

      // 時間制限対策
      console.log(timer.rap());
      if (timer.getRapTime() > timer.max) break;
    }

  } catch(e) {

  }

  return results;
}

/**
 * モードにより色分けしながらイベントを作成する  
 * （重複があったら上書きするようにした方が良いかも？）
 *
 * @param {LogCalendar} logCalendar 内容
 * @param {LogContent}  logContent 内容
 */
function addLog_(logCalendar, logContent) {
  var mode       = logContent.mode;
  if (!mode) {
    logCalendar.add(logContent);

  } else {
    // 何故かIDEにメソッドが認識されないけど動く模様…（メンバーが多すぎる？）
    logCalendar.add(logContent).changeColor();

  }
}

/**
 * 一次元配列を二次元配列（縦）にする
 *
 * 【参考】
 * - ワクガンス　|　JavaScriptの覚書
 *   https://amaraimusi.sakura.ne.jp/note_prg/JavaScript/note2.html
 * 
 * - メモ：2次元配列の行列を入れ替える - まえとうしろ
 *   https://maetoo11.hatenablog.com/entry/2017/05/10/123140
 *   > 各行の0番目の値を取り出した配列を作る、行の1番目の値を取り出した配列を作る…を繰り返して、新しい2次元配列を作成。
 * 
 * @param {[[boolean]]} src 転置前の配列
 *
 * @return {[][]} 転置後の二次元配列
 */
function transpose_(src) {
  return Object.keys(src[0]).map(function (c) {
    return src.map(function (r) {
      return r[c];
    });
  });
}

/**
 * 3分後に再実行を予約しておく
 */
function scheduleReRun_() {
  const trigger = new NextTrigger(ExportWithoutUi.name, 3);
  trigger.build();
}
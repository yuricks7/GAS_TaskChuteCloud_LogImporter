/**
 * メイン
 */
function ExportToCalendar() {
  const dataSheet = new DataSheet();
  const rows   = dataSheet.rows;
  const cols   = dataSheet.cols;
  const values = dataSheet.values;

  const actionLog = new LogCalendar('行動ログ');
  const  sleepLog = new LogCalendar('睡眠ログ');

  // シートのデータをカレンダーに転記
  // 
  // @note
  //   1度に転記する数が多いとサーバーエラーで止められることがあるため、
  //   途中終了しないようにtry~catch構文の中で処理する
  //
  const timer = new Timer();
  timer.start();

  try {

    // 時限タイマーをセット
    const LIMITED_TIME = 5.5 * 60 * 1000; // 少し余裕を持って5分半とする
    var isCopied = []; // シート記録用

    while (true) {

      // 処理を開始
      for (var i = rows.firstData - 1; i < values.length; i++) {
        var rowValues = values[i];

        // レコードの内容によっては処理を飛ばす
        if (rowValues[cols.finishTime - 1] === '') {
          isCopied.push('');
          continue;
        }

        if (rowValues[cols.isCopied - 1]) {
          isCopied.push(true);
          continue;
        }

        // 睡眠ログとそれ以外を分けて記録
        var logContent = new LogContent(rowValues, cols);
        switch (logContent.task) {
          case '睡眠':
            addLog(sleepLog, logContent);
            break;

          default:
            addLog(actionLog, logContent);
            break;
        }

        isCopied.push(true);
      }

      console.log(timer.rap());
      if (timer.getRapTime() > LIMITED_TIME) break;
    }

  } catch(e) {

  }

  // 転記が完了したものは、シートに`true`を入力
  const arr2d = transpose_([isCopied]);
  dataSheet.sheet.getRange(rows.firstData,  cols.isCopied, isCopied.length, 1).setValues(arr2d);
}

/**
 * モードにより色分けしながらイベントを作成する
 * （重複があったら上書きするようにした方が良いかも？）
 *
 * @param {LogCalendar} logCalendar 内容
 * @param {LogContent}  logContent 内容
 */
function addLog(logCalendar, logContent) {
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
 * @param {[][]} src 転置前の配列
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
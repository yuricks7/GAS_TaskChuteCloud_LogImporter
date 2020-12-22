/**
 * 系列ごとの色を設定する
 */
function ChangeChartColors() {
  const ss         = SpreadsheetApp.getActive();
  const sheet      = ss.getSheetByName('chart');
  const sheetRange = sheet.getDataRange();
  const values     = sheetRange.getValues();

  // グラフ（chart）を取得
  const charts  = sheet.getCharts();

  var chart     = charts[charts.length - 1];
  const builder = chart.modify().asColumnChart();

  // 設定を変更
  chart = setOptions_(builder, values);
  sheet.updateChart(chart);
}

///**
// * グラフを新規作成する
// */
//function InsertNewChart() {
//  const ss         = SpreadsheetApp.getActive();
//  const sheet      = ss.getSheetByName('chart');
//  const sheetRange = sheet.getDataRange();
//  const values     = sheetRange.getValues();
//
//  // 新規作成
//  var builder = sheet.newChart()
//               .addRange(sheet.getRange('A6:DB1000'))
//               .setPosition(1, 1, 8, 15)
//               .asColumnChart()　
//               .setOption('title', 'Inflows')
//               .setOption('titleTextStyle' , { color: '#545454', fontSize: 20 });
//  
//  // 設定を変更
//  chart = setOptions_(builder, values);
//  sheet.insertChart(chart);
//};

/**
 * グラフをカスタマイズ
 * 
 * @param {object}  builder
 * @param {[][]} values
 */
function setOptions_(builder, values) {
  // 系列の名前
  builder.setNumHeaders(2); // 1行目からの行数
//  
//  // 凡例
//  builder.setOption('legend', {
//      position : 'right',
//      textStyle: { color: '#545454', fontSize: 10 },
//  });

  // グラフの色
  // （配列で設定）
  builder.setColors(setColors_(values));
  
//  // （系列ごとに設定）
//  builder.setOption('series', {
//    0: { color: 'red' },
//    1: { color: 'red' }
//  })

  return builder.build();
}

/**
 * 系列の色をまとめて配列化
 * 
 * @param {[][]} values
 */
function setColors_(values) {
  var colors = [];
  var color  = '';
  const modes = values[1];

  for (var i = 3; i < modes.length; i++) {
    var mode = modes[i];
    // console.log('mode: %s', mode); // ▼

    if (mode === '') break;
    if (mode === '総計') continue;

    // キーワードから色を設定
    color = modeToColor_(modes[i]);
    if (!color) continue;

    // 配列化
//    colors.unshift(modeToColor_(modes[i])); // 順番は変わらず、色だけ変わる…
    colors.push(color);
  }

  return colors;
}

/**
 * 系列の色を取得
 */
function modeToColor_(mode) {
    // console.log('変換: %s', mode); // ▼

  // 関数を定義
  function hasKeyword(keyword) {
    return String(mode).indexOf(keyword) !== -1;
  }
  
  const colors = {
    rose     : '#991250',
    orange   : 'orange',
    cherry   : '#d42759',
    plum     : 'plum',
    grape    : '#995686',
    blueberry: '#5678E9',
    turquoise: 'turquoise',
    emerald  : '#83f293',
    leaf     : '#439D29',
    muscat   : '#b3cf82',
    lightgray: 'lightgray',
    darkgray : 'darkgray',
    red      : '#ff0000',
    white    : '#ffffff',
    lightBlue: '#edf8fa',
  };

  // モードの番号ごとに変える
  switch (true) {
    // 目安
    case hasKeyword('【睡眠】'): return colors.lightBlue; // 目安
    case hasKeyword('【活動】'): return colors.white;

    // モード
    case hasKeyword('00.'): return colors.rose; // 金銭管理

    case hasKeyword('01.'): return colors.orange; // 計画
    case hasKeyword('02.'): return colors.orange; // 設定
    case hasKeyword('03.'): return colors.rose;   // 移動

    case hasKeyword('10.'): return colors.cherry; // MTG
    case hasKeyword('11.'): return colors.cherry; // 交流

    case hasKeyword('20.'): return colors.plum; // 設計
    case hasKeyword('21.'): return colors.plum; // コーディング

    case hasKeyword('30.'): return colors.grape; // フォーカス

    case hasKeyword('40.'): return colors.blueberry; // 学習

    case hasKeyword('50.'): return colors.turquoise; // 単純作業

    case hasKeyword('70.'): return colors.emerald; // 家事
    case hasKeyword('71.'): return colors.emerald; // 整理整頓

    case hasKeyword('80.'): return colors.leaf; // 健康管理

    case hasKeyword('90.'): return colors.muscat; // 小休憩
    case hasKeyword('91.'): return colors.muscat; // 休憩

    // 非アクティブ時間
    case hasKeyword('だらだら'): return colors.red;    // 強調（ズレて効いてない）
    case hasKeyword('99.'):     return colors.lightgray; // （ズレて効いてない）
      
    default: return colors.darkgray;
  }
}
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
//  const sheet      = ss.getSheetByName('Inflows(conv)');
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
 */
function setColors_(values) {
  var colors = [];
  const headers = values[0];
  const modes   = values[1];

  for (var i = 3; i < modes.length; i++) {
    var header = headers[i];
    var mode   = modes[i];

    // if (header === '実績 の SUM') continue;
    // if (header === '分類') continue;
    if (mode === '') break;

//    colors.unshift(modeToColor_(modes[i])); // 順番は変わらず、色だけ変わる…
    colors.push(modeToColor_(modes[i]));
  }

  return colors;
}

/**
 * 系列の色を取得
 */
function modeToColor_(mode) {
  // console.log(mode);

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
  };
  
  // モードの番号ごとに変える
  switch (true) {
    case hasKeyword('【睡眠】'): return 'red'; // 目安
    case hasKeyword('【活動】'): return 'white';

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
    case hasKeyword('だらだら'): return 'red'; // 強調
    case hasKeyword('99.'):     return colors.darkgray;
      
    default: return colors.lightgray;
  }
}
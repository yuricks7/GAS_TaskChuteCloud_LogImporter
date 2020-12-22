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
    if (mode === '') break;
    if (mode === '総計') continue;

    // キーワードから色を設定
    color = modeToColor_(modes[i]);
    if (!color) continue;

    // 配列化
    colors.push(color); // 系列は降順で入っている模様（unshiftにすると色だけ逆順に変わるのでカオスになる）
  }

  return colors;
}

/**
 * 系列の色を取得
 * 
 * @param {string} mode
 * 
 * @return {string} カラーコード or 組み込みの色名
 */
function modeToColor_(mode) {
  // 系列ごとに色を定義
  const colorCodes = defineColorCodes();
  const modeSeries = defineSeries(colorCodes);

  // 系列にあるモードの番号ごとに色を変える
  var temp = {};
  for (series in modeSeries) {
    temp = modeSeries[series];
    if (mode.indexOf(temp.key) !== -1) return temp.color;
  }
}

/**
 * グラフに使用する色を定義
 * 
 * @return {object} カラーコードか組み込みの色名を格納したオブジェクト
 */
function defineColorCodes() {
  return {
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
}

/**
 * 系列ごとの色を定義
 * 
 * @param {object} colorCodes
 * 
 * @return {object} 系列ごとのキーワードと色を格納したオブジェクト
 */
function defineSeries(colorCodes) {
  return {
    // 目安（背景代わり）
    bgSleep:  { key: '【睡眠】', color: colorCodes.lightBlue, },
    bgActive: { key: '【活動】', color: colorCodes.white, },

    // モード
    mdFinance:     { key: '00.', color: colorCodes.rose, },

    mdPlan:        { key: '01.', color: colorCodes.orange, },
    mdSetting:     { key: '02.', color: colorCodes.orange, },
    mdMove:        { key: '03.', color: colorCodes.rose, },

    mdMtg:         { key: '10.', color: colorCodes.cherry, },
    mdKouryu:      { key: '11.', color: colorCodes.cherry, },

    mdDesigning:   { key: '20.', color: colorCodes.plum, },
    mdCoding:      { key: '21.', color: colorCodes.plum, },

    mdFocus:       { key: '30.', color: colorCodes.grape, },
    mdLearn:       { key: '40.', color: colorCodes.blueberry, },

    mdSimpleTask:  { key: '50.', color: colorCodes.turquoise, },

    mdHouseWork:   { key: '70.', color: colorCodes.emerald },
    mdArrangement: { key: '71.', color: colorCodes.emerald, },

    mdHealthCare:  { key: '80.', color: colorCodes.leaf, },

    mdBreakTime:   { key: '90.', color: colorCodes.muscat, },
    mdRestTime :   { key: '91.', color: colorCodes.muscat, },

    mdIdleTime:    { key: 'だらだら', color: colorCodes.red, },
    mdSleep:       { key: '99.',    color: colorCodes.lightgray, },
  };
}
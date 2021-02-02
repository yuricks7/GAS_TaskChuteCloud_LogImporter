// /**
//  * 系列ごとの色を設定する
//  */
// function ChangeChartColors() {
//   const ss         = SpreadsheetApp.getActive();
//   const sheet      = ss.getSheetByName('シート6');
//   const sheetRange = sheet.getDataRange();
//   const values     = sheetRange.getValues();

//   // グラフ（chart）を取得
//   const charts  = sheet.getCharts();

//   var chart     = charts[charts.length - 1];
//   const builder = chart.modify().asColumnChart();

//   // 設定を変更
//   chart = setOptions_(builder, values);
//   // sheet.updateChart(chart);
// }

// /**
//  * グラフをカスタマイズ
//  * 
//  * @param {object} builder
//  * @param {[][]}   values
//  */
// function setOptions_(builder, values) {
//   // 系列の名前
//   builder.setNumHeaders(1); // 1行目からの行数

//   // グラフの色
//   // （配列で設定）
//   builder.setColors(setColors_(values));
  
//   // return builder.build();
// }

// /**
//  * 系列の色をまとめて配列化
//  * 
//  * @param {[][]} values
//  */
// function setColors_(values) {
//   var colors = [];
//   var color  = '';
//   const headerRow = 1;
//   const modes = values[headerRow - 1];

//   const firstModeCol = 3;
//   for (var i = firstModeCol - 1; i < modes.length; i++) {
//     var mode = modes[i];
//     if (mode === '') break;

//     // キーワードから色を設定
// console.log(mode);
//     color = modeToColor_(mode);

// if (!color) console.log('"color" is undefined...');
// console.log(color);
//     if (!color) continue;

//     // 配列化
//     colors.unshift(color); // 系列が「昇順」の場合
//     // colors.push(color); // 　〃　「降順」　〃　
//   }

//   return colors;
// }

// /**
//  * 系列の色を取得
//  * 
//  * @param {string} mode
//  * 
//  * @return {string} カラーコード or 組み込みの色名
//  */
// function modeToColor_(mode) {
//   const modeSeries = defineSeries();
//   // const modeSeries = defineSeries(colorCodes);

// // console.log('No.3');
// // console.log(mode);

//   // 系列にあるモードの番号ごとに色を変える
//   var temp = {};
//   for (series in modeSeries) {
//     temp = modeSeries[series];

// console.log('No.4');
// if (!temp) console.log('"dic" is undefined...');
// console.log(temp);
// console.log(temp.key);
// console.log(temp.color);

//     if (mode.indexOf(temp.key) !== -1) return temp.color;
//   }
// }

// /**
//  * 系列ごとの色を定義
//  * 
//  * @return {object} 系列ごとのキーワードと色を格納したオブジェクト
//  */
// function defineSeries() {
//   // 系列ごとに色を定義
//   const colorCodes = defineColorCodes();
// // console.log('通りました');

//   return {
//     // 目安（背景代わり）
//     bgSleep:  { key: '【睡眠】', color: colorCodes.lightBlue, },
//     bgActive: { key: '【活動】', color: colorCodes.white, },

//     // モード
//     mdFinance:     { key: '00.', color: colorCodes.rose, },

//     mdPlan:        { key: '01.', color: colorCodes.orange, },
//     mdSetting:     { key: '02.', color: colorCodes.orange, },
//     mdMove:        { key: '03.', color: colorCodes.rose, },

//     mdMtg:         { key: '10.', color: colorCodes.cherry, },
//     mdKouryu:      { key: '11.', color: colorCodes.cherry, },

//     mdDesigning:   { key: '20.', color: colorCodes.plum, },
//     mdCoding:      { key: '21.', color: colorCodes.plum, },

//     mdFocus:       { key: '30.', color: colorCodes.grape, },
//     mdLearn:       { key: '40.', color: colorCodes.blueberry, },

//     mdSimpleTask:  { key: '50.', color: colorCodes.turquoise, },

//     mdHouseWork:   { key: '70.', color: colorCodes.emerald },
//     mdArrangement: { key: '71.', color: colorCodes.emerald, },

//     mdHealthCare:  { key: '80.', color: colorCodes.leaf, },

//     mdBreakTime:   { key: '90.', color: colorCodes.muscat, },
//     mdRestTime :   { key: '91.', color: colorCodes.muscat, },

//     mdIdleTime:    { key: 'だらだら', color: colorCodes.red, },
//     mdSleep:       { key: '99.',    color: colorCodes.lightgray, },
//   };
// }

// /**
//  * グラフに使用する色を定義
//  * 
//  * @return {object} カラーコードか組み込みの色名を格納したオブジェクト
//  */
// function defineColorCodes() {
//   return {
//     rose     : '#991250',
//     orange   : 'orange',
//     cherry   : '#d42759',
//     plum     : 'plum',
//     grape    : '#995686',
//     blueberry: '#5678E9',
//     turquoise: 'turquoise',
//     emerald  : '#83f293',
//     leaf     : '#439D29',
//     muscat   : '#b3cf82',
//     lightgray: 'lightgray',
//     darkgray : 'darkgray',
//     red      : '#ff0000',
//     white    : '#ffffff',
//     lightBlue: '#edf8fa',
//   };
// }
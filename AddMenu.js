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
function myFunction() {
  var dataSheet = new DataSheet();

  console.log(dataSheet.cols.finishTime);

  console.log(dataSheet.cells(4, 1));


}

function colors(){
  const eventColors = CalendarApp.EventColor;

  var colorDic = {
    finance:     { key: '00.', color: eventColors.RED, },

    plan:        { key: '01.', color: eventColors.ORANGE, },
    setting:     { key: '02.', color: eventColors.ORANGE, },
    move:        { key: '03.', color: eventColors.RED, },

    mtg:         { key: '10.', color: eventColors.PALE_RED, },
    kouryu:      { key: '11.', color: eventColors.PALE_RED, },

    designing:   { key: '20.', color: eventColors.MAUVE, }, // 藤色
    coding:      { key: '21.', color: eventColors.MAUVE, },

    focus:       { key: '30.', color: eventColors.CYAN, },
    learn:       { key: '40.', color: eventColors.BLUE, },

    simpleTask:  { key: '50.', color: eventColors.PALE_BLUE, },

    houseWork:   { key: '70.', color: eventColors.GREEN },
    arrangement: { key: '71.', color: eventColors.GREEN, },

    healthCare:  { key: '80.', color: eventColors.PALE_GREEN, },
    breakTime:   { key: '90.', color: eventColors.PALE_GREEN, },
    restTime :   { key: '91.', color: eventColors.PALE_GREEN, },

    idleTime:    { key: 'だらだら', color: eventColors.GRAY, },
    sleep:       { key: '99.',     color: eventColors.GRAY, },
  };

  console.log(colorDic.finance.color);        // 11
  console.log(typeof colorDic.finance.color); // string

  console.log(colorDic.plan.color);        // 6
  console.log(typeof colorDic.plan.color); // string

}
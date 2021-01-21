/**
 * テスト
 */
function myFunction() {
  var dataSheet = new DataSheet();

  console.log(dataSheet.cols.finishTime);

  console.log(dataSheet.cells(4, 1));


}

/**
 * テスト
 */
function testMode() {
  const days = [
    '2021/01/10 00:00:00',
    '2021/01/11 00:00:00',
    '2021/01/12 00:00:00',
  ]

  // まとめて削除
  function deleteAllByDate(name) {
    const logCalendar = new LogCalendar(name);
    for (var i = 0; i < days.length; i++) {
      logCalendar.deleteAllByDate(days[i]);
    }
  }

  deleteAllByDate('行動ログ');
  deleteAllByDate('睡眠ログ');

  ExportToCalendar();
}

/**
 * テスト
 */
function testMode_All() {
  // まとめて削除
  new LogCalendar('行動ログ').deleteAll();
  new LogCalendar('睡眠ログ').deleteAll();

  // ExportToCalendar();
}

/**
 * テスト
 */
function testMode_02() {
  const actionLog = new LogCalendar('行動ログ');
  var events = actionLog.getAll();

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    console.log('[Start] %s, [Title] %s', event.getStartTime(), event.getTitle());
  }
}

/**
 * テスト
 */
function testMode_03() {
  const sleepLog     = new LogCalendar('睡眠ログ');
  const testDateTime = new Date('2021/01/13 00:46');
  const task         = '睡眠';

  const hasSameLog = sleepLog.hasSameLog(testDateTime, task);
  sleepLog.removeDuplicate(testDateTime, task);

  console.log(hasSameLog);
}

/**
 * テスト
 */
function testMode_04() {
  const timer = new Timer();
  timer.start();
  timer.rap();

  const LIMITED_TIME = 1 * 15 * 1000;
  while (timer.getRapTime() < LIMITED_TIME) {
    console.log(timer.rap());
  }

  console.log('Over 1 minute.');
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
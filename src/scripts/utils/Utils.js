export default class Utils {
  constructor() {
    this.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthShortList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.dayShortList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  // this fri / next fri
  // 9/22
  parseTextToItem(text) {
    let _month;
    let _day;
    let result;
    let datePart;
    let textPart;

    const resultThis = text.match(/this [A-Z]{3}\s/i);
    const resultNext = text.match(/next [A-Z]{3}\s/i);
    const resultDate = text.match(/[0-9]{1,2}\/[0-9]{1,2}\s/);

    if (resultThis) {
      result = resultThis;
    } else if (resultNext) {
      result = resultNext;
    } else if (resultDate) {
      result = resultDate;
    }
    datePart = result[0];
    textPart = text.replace(datePart, '').trim();

    _month = 9;
    _day = 2;

    let item = {
      schedule: {
        year: 2015,
        month: _month,
        monthName: this.monthList[_month - 1],
        shortMonthName: this.monthShortList[_month - 1],
        date: 22,
        hour: '18:00' || undefined,
        day: _day,
        dayName: this.dayList[_day],
        shortDayName: this.dayShortList[_day],
      },
      text: textPart
    };
    return item;
  }
}


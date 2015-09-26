import moment from 'moment';

export class TextToScheduleParser {
  constructor() {
    this.monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthShortList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.dayShortList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  // fri(friday) / this fri(friday) / next fri(friday) / every fri / 9/22
  parseTextToItem(text, referenceDate) {
    const _referenceDate = referenceDate || moment();
    const splitedItem = this.splitTextToDateAndText(text);
    const schedule = this.textToSchedule(splitedItem.date, _referenceDate);
    const item = (schedule) ? { schedule: schedule, text: splitedItem.text } : { schedule: schedule, text: text };
    return item;
  }

  splitTextToDateAndText(text) {
    let result;
    let datePart;
    let textPart;
    let item;

    const resultThis = text.match(/^this ([A-Z]{3}|[A-Z]{3,6}day)\s/i);
    const resultNext = text.match(/^next ([A-Z]{3}|[A-Z]{3,6}day)\s/i);
    const resultDate = text.match(/^([0-9]{1,2}\/[0-9]{1,2}|[0-9]{2,4}\/[0-9]{1,2}\/[0-9]{2,4})\s/);
    const resultDay = text.match(/^([A-Z]{3}|[A-Z]{3,6}day)\s/i);

    if (resultThis) {
      result = resultThis;
    } else if (resultNext) {
      result = resultNext;
    } else if (resultDate) {
      result = resultDate;
    } else if (resultDay) {
      result = resultDay;
    } else {
      result = [''];
    }
    datePart = result[0];
    textPart = text.replace(datePart, '').trim();
    item = {
      date: datePart,
      text: textPart,
    };
    return item;
  }

  textToSchedule(dateText, referenceDate) {
    let schedule;
    let _dayNum;
    let _date;
    let date;

    if (dateText) {
      // this
      if (dateText.match(/this/i)) {
        _dayNum = this.getDayNum(dateText);
        if (_dayNum !== -1) date = moment(referenceDate).day(_dayNum);
      // next
      } else if (dateText.match(/next/i)) {
        _dayNum = this.getDayNum(dateText);
        if (_dayNum !== -1) date = moment(referenceDate).day(_dayNum).add(7, 'days');
      // date
      } else if (dateText.match(/\//)) {
        _date = dateText.split('/');
        if (_date.length === 2) _date.unshift(moment(referenceDate).year());
        _date[1] = +_date[1] - 1;
        date = moment(_date);
        if (date.isBefore(referenceDate)) date = moment(_date).add(1, 'years');
      // day
      } else {
        _dayNum = this.getDayNum(dateText);
        if (_dayNum !== -1) date = moment(referenceDate).day(_dayNum);
        if (date && date.isBefore(referenceDate)) date = date.add(7, 'days');
      }
      if (date) schedule = this.getScheduleItem(date);
    } else {
      return schedule;
    }
    return schedule;
  }

  getDay(dateText) {
    const _day = dateText.replace(/(this|next)/i, '').trim();

    return _day;
  }

  getDayNum(dateText) {
    const _day = this.getDay(dateText);

    for (let index = 0; index < this.dayList.length; index++) {
      if (this.dayList[index].toUpperCase().indexOf(_day.toUpperCase()) !== -1) return index;
    }
    return -1;
  }

  getScheduleItem(date) {
    const _year = date.year();
    const _month = date.month();
    const _date = date.date();
    const _hour = date.hour();
    const _day = date.day();
    const _isBefore = date.isBefore();
    const schedule = {
      year: _year,
      month: _month + 1,
      monthName: this.monthList[_month],
      shortMonthName: this.monthShortList[_month],
      date: _date,
      hour: _hour,
      day: _day,
      dayName: this.dayList[_day],
      shortDayName: this.dayShortList[_day],
      completed: _isBefore,
    };
    return schedule;
  }
}

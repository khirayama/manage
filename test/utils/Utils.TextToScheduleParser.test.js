import assert  from 'power-assert';
import moment from 'moment';
import { TextToScheduleParser }  from '../../src/scripts/utils/Utils';

let utils = new TextToScheduleParser();
let createdAt = moment([2015, 8, 23]); // 2015-9-23 Web
let item;
let answerText = 'meets my friend'

describe('TextToScheduleParser', () => {
  describe('parseTextToItem', () => {
    it('meets my friend', () => {
      item = utils.parseTextToItem('meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule === undefined);
    })
    it('mom meets my friend', () => {
      item = utils.parseTextToItem('mom meets my friend', createdAt);
      assert(item.text === 'mom ' + answerText);
      assert(item.schedule === undefined);
    })
    it('mon meets my friend', () => {
      item = utils.parseTextToItem('mon meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 28);
      assert(item.schedule.day === 1);
      assert(item.schedule.completed === false);
    })
    it('monday meets my friend', () => {
      item = utils.parseTextToItem('monday meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 28);
      assert(item.schedule.day === 1);
      assert(item.schedule.completed === false);
    })
    it('fri meets my friend', () => {
      item = utils.parseTextToItem('fri meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 25);
      assert(item.schedule.day === 5);
      assert(item.schedule.completed === false);
    })
    it('friday meets my friend', () => {
      item = utils.parseTextToItem('friday meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 25);
      assert(item.schedule.day === 5);
      assert(item.schedule.completed === false);
    })
    it('this mon meets my friend', () => {
      item = utils.parseTextToItem('this mon meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 21);
      assert(item.schedule.day === 1);
      assert(item.schedule.completed === true);
    })
    it('this monday meets my friend', () => {
      item = utils.parseTextToItem('this monday meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 21);
      assert(item.schedule.day === 1);
      assert(item.schedule.completed === true);
    })
    it('this fri meets my friend', () => {
      item = utils.parseTextToItem('this fri meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 25);
      assert(item.schedule.day === 5);
      assert(item.schedule.completed === false);
    })
    it('this friday meets my friend', () => {
      item = utils.parseTextToItem('this friday meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 25);
      assert(item.schedule.day === 5);
      assert(item.schedule.completed === false);
    })
    it('next mon meets my friend', () => {
      item = utils.parseTextToItem('next mon meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 28);
      assert(item.schedule.day === 1);
      assert(item.schedule.completed === false);
    })
    it('next monday meets my friend', () => {
      item = utils.parseTextToItem('next monday meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 28);
      assert(item.schedule.day === 1);
      assert(item.schedule.completed === false);
    })
    it('next fri meets my friend', () => {
      item = utils.parseTextToItem('next fri meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 10);
      assert(item.schedule.date === 2);
      assert(item.schedule.day === 5);
      assert(item.schedule.completed === false);
    })
    it('next friday meets my friend', () => {
      item = utils.parseTextToItem('next friday meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 10);
      assert(item.schedule.date === 2);
      assert(item.schedule.day === 5);
      assert(item.schedule.completed === false);
    })
    it('9/22 meets my friend', () => {
      item = utils.parseTextToItem('9/22 meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2016);
      assert(item.schedule.month === 9);
      assert(item.schedule.date === 22);
      assert(item.schedule.day === 4);
      assert(item.schedule.completed === false);
    })
    it('10/8 meets my friend', () => {
      item = utils.parseTextToItem('10/8 meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 10);
      assert(item.schedule.date === 8);
      assert(item.schedule.day === 4);
      assert(item.schedule.completed === false);
    })
    it('10/22 meets my friend', () => {
      item = utils.parseTextToItem('10/22 meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 10);
      assert(item.schedule.date === 22);
      assert(item.schedule.day === 4);
      assert(item.schedule.completed === false);
    })
    it('02/06 meets my friend', () => {
      item = utils.parseTextToItem('02/06 meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2016);
      assert(item.schedule.month === 2);
      assert(item.schedule.date === 6);
      assert(item.schedule.day === 6);
      assert(item.schedule.completed === false);
    })
    it('2015/10/22 meets my friend', () => {
      item = utils.parseTextToItem('2015/10/22 meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2015);
      assert(item.schedule.month === 10);
      assert(item.schedule.date === 22);
      assert(item.schedule.day === 4);
      assert(item.schedule.completed === false);
    })
    it('2016/10/22 meets my friend', () => {
      item = utils.parseTextToItem('2016/10/22 meets my friend', createdAt);
      assert(item.text === answerText);
      assert(item.schedule.year === 2016);
      assert(item.schedule.month === 10);
      assert(item.schedule.date === 22);
      assert(item.schedule.day === 6);
      assert(item.schedule.completed === false);
    })
  });
});

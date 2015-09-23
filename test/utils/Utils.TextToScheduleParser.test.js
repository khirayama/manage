import assert  from 'power-assert';
import moment from 'moment';
import { TextToScheduleParser }  from '../../src/scripts/utils/Utils';

let utils = new TextToScheduleParser();
let referenceDate = moment([2015, 8, 23]); // 2015-9-23 Web
let item;
let answerText = 'meets my friend'

describe('TextToScheduleParser', () => {
  describe('parseTextToItem', () => {
    it('meets my friend', () => {
      item = utils.parseTextToItem('meets my friend', referenceDate);
      assert(item.text === answerText);
      assert(item.schedule === undefined);
    })
    it('mom meets my friend', () => {
    })
    it('mon meets my friend', () => {
    })
    it('monday meets my friend', () => {
    })
    it('fri meets my friend', () => {
    })
    it('friday meets my friend', () => {
    })
    it('this mon meets my friend', () => {
    })
    it('this monday meets my friend', () => {
    })
    it('this fri meets my friend', () => {
    })
    it('this friday meets my friend', () => {
    })
    it('next mon meets my friend', () => {
    })
    it('next monday meets my friend', () => {
    })
    it('next fri meets my friend', () => {
    })
    it('next friday meets my friend', () => {
    })
    it('next mon meets my friend', () => {
    })
    it('9/22 meets my friend', () => {
    })
    it('10/8 meets my friend', () => {
    })
    it('10/22 meets my friend', () => {
    })
    it('2015/10/22 meets my friend', () => {
    })
    it('2016/10/22 meets my friend', () => {
    })
  });
});

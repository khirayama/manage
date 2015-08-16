import assert  from 'power-assert';
import SampleUnit  from '../src/scripts/SampleUnit';
 
describe('SampleUnit.sum()', () => {
  it('total', () => {
    const sampleUnit = new SampleUnit();
    const sum = sampleUnit.sum(10, 5);
    assert(sum === 15);
  });
});

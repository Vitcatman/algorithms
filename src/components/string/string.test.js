import { reverseStr } from './utils';
import { ElementStates } from '../../types/element-states';

const arrayEven = [
  { name: 'h', status: ElementStates.Default },
  { name: 'e', status: ElementStates.Default },
  { name: 'l', status: ElementStates.Default },
  { name: 'l', status: ElementStates.Default },
];

const arrayOdd = [
  { name: 'h', status: ElementStates.Default },
  { name: 'e', status: ElementStates.Default },
  { name: 'l', status: ElementStates.Default },
];

const reversedArrayEven = [
  { name: 'l', status: ElementStates.Modified },
  { name: 'l', status: ElementStates.Modified },
  { name: 'e', status: ElementStates.Modified },
  { name: 'h', status: ElementStates.Modified },
];

const reversedArrayOdd = [
  { name: 'l', status: ElementStates.Modified },
  { name: 'e', status: ElementStates.Modified },
  { name: 'h', status: ElementStates.Modified },
];

describe('ReverseString tests', () => {
  it('Revers with an even number of characters', async () => {
    const reverseArr = await reverseStr(arrayEven, ()=>{});
    expect(reverseArr).toEqual(reversedArrayEven);
  });
  it('Revers with an odd number of characters', async () => {
    const reverseArr = await reverseStr(arrayOdd, ()=>{});
    expect(reverseArr).toEqual(reversedArrayOdd);
  });
  it('Revers with one character', async () => {
    const reverseArr = await reverseStr([{ name: 'h', status: ElementStates.Default }], ()=>{});
    expect(reverseArr).toEqual([{ name: 'h', status: ElementStates.Modified }]);
  });
  it('Revers with an empty string', async () => {
    const reverseArr = await reverseStr(['']);
    expect(reverseArr).toEqual(['']);
  });
});

import { Dispatch, SetStateAction } from 'react';
import { ElementStates } from '../../types/element-states';
import { timeout } from '../../utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { ILetter } from './string';

export const reverseStr = async (
  array: ILetter[],
  setReversedArray: Dispatch<SetStateAction<ILetter[]>>
) => {
  console.log(array)
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    if (array[start].status !== undefined) {
      array[start].status = ElementStates.Changing;
      array[end].status = ElementStates.Changing;
      setReversedArray([...array]);
      await timeout(DELAY_IN_MS);
    }

    const tempStart = array[start];
    const tempEnd = array[end];
    array[start] = tempEnd;
    array[end] = tempStart;
    if (array[start].status !== undefined) {
      array[start].status = ElementStates.Modified;
      array[end].status = ElementStates.Modified;
      setReversedArray([...array]);
      await timeout(DELAY_IN_MS);
    }

    start++;
    end--;
  }
  return array;
};

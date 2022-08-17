import { ElementStates } from '../../types/element-states';
import { Dispatch, SetStateAction } from 'react';
import { timeout, swap } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export interface IArrayObj {
  el: number;
  state: ElementStates;
}

export const selectionSort = async (
  arr: IArrayObj[],
  direction: string,
  setRandomArray: Dispatch<SetStateAction<IArrayObj[]>>
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    arr[maxInd].state = ElementStates.Changing;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr.length !== 0 && arr[0].state !== undefined) {
        arr[j].state = ElementStates.Changing;
        setRandomArray([...arr]);
        await timeout(SHORT_DELAY_IN_MS);
      }

      if (
        (direction === 'descending' ? arr[j].el : arr[maxInd].el) >
        (direction === 'descending' ? arr[maxInd].el : arr[j].el)
      ) {
        maxInd = j;
        arr[j].state = ElementStates.Changing;
        arr[maxInd].state =
          i !== maxInd ? ElementStates.Default : ElementStates.Changing;
      }

      if (j !== maxInd) {
        arr[j].state = ElementStates.Default;
      }
      setRandomArray([...arr]);
    }

    swap(arr, i, maxInd);

    arr[maxInd].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    setRandomArray([...arr]);
  }

  if (arr.length !== 0) arr[arr.length - 1].state = ElementStates.Modified;

  return arr;
};

export const bubbleSort = async (
  arr: IArrayObj[],
  direction: string,
  setRandomArray: Dispatch<SetStateAction<IArrayObj[]>>
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;
      setRandomArray([...arr]);
      await timeout(SHORT_DELAY_IN_MS);
      if (
        direction === 'ascending'
          ? arr[j].el > arr[j + 1].el
          : arr[j].el < arr[j + 1].el
      ) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
      if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
      setRandomArray([...arr]);
    }
    if (arr.length !== 0)
      arr[arr.length - i - 1].state = ElementStates.Modified;
    setRandomArray([...arr]);
  }
  return arr;
};

import { selectionSort, bubbleSort } from './utils';
import { ElementStates } from '../../types/element-states';

const array = [
  { el: 5, state: ElementStates.Default },
  { el: 25, state: ElementStates.Default },
  { el: 15, state: ElementStates.Default },
];
const sortedArrayAsc = [
  { el: 5, state: ElementStates.Modified },
  { el: 15, state: ElementStates.Modified },
  { el: 25, state: ElementStates.Modified },
];

const sortedArrayDesc = [
  { el: 25, state: ElementStates.Modified },
  { el: 15, state: ElementStates.Modified },
  { el: 5, state: ElementStates.Modified },
];

describe('Selection sort testing', () => {
  it('SelectionSort, array of multiple elements in ascending direction', async () => {
    const sort = await selectionSort(array, 'ascending', () => {});
    expect(sort).toEqual(sortedArrayAsc);
  });
  it('SelectionSort, array of multiple elements in descending direction', async () => {
    const sort = await selectionSort(array, 'descending', () => {});
    expect(sort).toEqual(sortedArrayDesc);
  });
  it('SelectionSort, array of single item', async () => {
    const sort = await selectionSort(
      [{ el: 25, state: ElementStates.Modified }],
      'ascending',
      () => {}
    );
    expect(sort).toEqual([{ el: 25, state: ElementStates.Modified }]);
  });
  it('SelectionSort, empty array', async () => {
    const sort = await selectionSort([], 'ascending', () => {});
    expect(sort).toEqual([]);
  });
});

describe('Bubble sort testing', () => {
  it('SelectionSort, array of multiple elements in ascending direction', async () => {
    const sort = await bubbleSort(array, 'ascending', () => {});
    expect(sort).toEqual(sortedArrayAsc);
  });
  it('SelectionSort, array of multiple elements in descending direction', async () => {
    const sort = await bubbleSort(array, 'descending', () => {});
    expect(sort).toEqual(sortedArrayDesc);
  });
  it('SelectionSort, array of single item', async () => {
    const sort = await bubbleSort(
      [{ el: 25, state: ElementStates.Modified }],
      'ascending',
      () => {}
    );
    expect(sort).toEqual([{ el: 25, state: ElementStates.Modified }]);
  });
  it('SelectionSort, empty array', async () => {
    const sort = await bubbleSort([], 'ascending', () => {});
    expect(sort).toEqual([]);
  });
});

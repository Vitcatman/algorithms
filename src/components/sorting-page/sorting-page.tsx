import { useState, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import styles from './sorting-page.module.css';
import { timeout, swap } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';

interface IArrayObj {
  el: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [sortingMethod, setSortingMethod] = useState('selection');
  const [randomArray, setRandomArray] = useState<IArrayObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    generateRandomArray(3, 17, 100);
  }, []);

  const generateRandomArray = (
    minLength: number,
    maxLength: number,
    maxNumber: number
  ) => {
    const arrLength = Math.floor(
      Math.random() * (maxLength - minLength) + minLength
    );
    const arr = [...Array(arrLength)].map(() =>
      Math.round(Math.random() * maxNumber)
    );
    const arrColumns = arr.map((el) => ({ el, state: ElementStates.Default }));
    setRandomArray(arrColumns);
  };

  const selectionSort = async (arr: IArrayObj[], direction: string) => {
    setIsLoading(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;

      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setRandomArray([...arr]);
        await timeout(SHORT_DELAY_IN_MS);

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
    arr[arr.length - 1].state = ElementStates.Modified;
    setIsLoading(false);
  };

  const bubbleSort = async (arr: IArrayObj[], direction: string) => {
    setIsLoading(true);
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
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setRandomArray([...arr]);
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.inputsWrapper}>
        <RadioInput
          label='Выбор'
          extraClass='mr-12'
          disabled={isLoading}
          onChange={() => setSortingMethod('selection')}
          checked={sortingMethod === 'selection'}
        />
        <RadioInput
          label='Пузырек'
          extraClass='mr-16'
          disabled={isLoading}
          onChange={() => setSortingMethod('bubble')}
          checked={sortingMethod === 'bubble'}
        />
        <Button
          text='По возрастанию'
          type='button'
          isLoader={isLoading}
          disabled={isLoading}
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={() => {
            sortingMethod === 'selection'
              ? selectionSort(randomArray, 'ascending')
              : bubbleSort(randomArray, 'ascending');
          }}
        />
        <Button
          text='По убыванию'
          type='button'
          isLoader={isLoading}
          disabled={isLoading}
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => {
            sortingMethod === 'selection'
              ? selectionSort(randomArray, 'descending')
              : bubbleSort(randomArray, 'descending');
          }}
        />
        <Button
          text='Новый массив'
          type='button'
          isLoader={isLoading}
          disabled={isLoading}
          extraClass={`ml-40 ${styles.button}`}
          onClick={() => generateRandomArray(3, 17, 100)}
        />
      </div>
      <div className={styles.column}>
        {randomArray &&
          randomArray.map((item, index) => {
            return <Column index={item.el} state={item.state} key={index} />;
          })}
      </div>
    </SolutionLayout>
  );
};

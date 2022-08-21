import { useState, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import styles from './sorting-page.module.css';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';
import { IArrayObj } from './utils';
import { selectionSort, bubbleSort } from './utils';

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

  const sort = async (direction: string, sortingMethod: string) => {
    setIsLoading(true);
    if (sortingMethod === 'selection') {
      await selectionSort(randomArray, direction, setRandomArray);
    } else {
      await bubbleSort(randomArray, direction, setRandomArray);
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
            sort('ascending', sortingMethod);
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
            sort('ascending', sortingMethod);
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

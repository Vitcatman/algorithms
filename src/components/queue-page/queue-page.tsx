import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import styles from './queue-page.module.css';
import { Input } from '../ui/input/input';
import { timeout } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Queue } from '../../utils/queue';

interface IQueueElement {
  name: string;
  state: ElementStates;
  tail: boolean;
  head: boolean;
}

const queue = new Queue(7);

export const QueuePage: React.FC = () => {
  const defaultArray: IQueueElement[] = Array.from({ length: 7 }, () => ({
    name: '',
    state: ElementStates.Default,
    tail: false,
    head: false,
  }));
  const [inputValue, setInputValue] = useState<string>('');
  const [arr, setArr] = useState<IQueueElement[]>(defaultArray);
  const [isLoading, setIsLoading] = useState<string>('');
  const [headIndex, setHeadIndex] = useState<number | null>(null);

  const addElement = async () => {
    setIsLoading('add');

    queue.enqueue(inputValue);
    setInputValue('');
    arr[queue.getHead()].head = true;
    setHeadIndex(queue.getHead());

    if (queue.getTail() > 0) {
      arr[queue.getTail() - 1].tail = false;
    }

    arr[queue.getTail()].name = inputValue;
    arr[queue.getTail()].tail = true;
    arr[queue.getTail()].state = ElementStates.Changing;

    await timeout(SHORT_DELAY_IN_MS);

    arr[queue.getTail()].state = ElementStates.Default;
    setIsLoading('');
  };

  const deleteElement = async () => {
    setIsLoading('delete');

    if (queue.getHead() === queue.getTail()) {
      deleteAll();
    } else {
      queue.dequeue();
      arr[queue.getHead() - 1].state = ElementStates.Changing;

      await timeout(SHORT_DELAY_IN_MS);

      arr[queue.getHead() - 1].state = ElementStates.Default;

      if (queue.getHead() > 0) {
        arr[queue.getHead() - 1].head = false;
        arr[queue.getHead() - 1].name = '';
      }
      arr[queue.getHead()].head = true;
    }
    setIsLoading('');
  };

  const deleteAll = () => {
    setIsLoading('all');

    queue.clearAll();
    setArr([...defaultArray]);
    setInputValue('');
    setHeadIndex(null);
    setIsLoading('');
  };
  return (
    <SolutionLayout title='Очередь'>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
          isLimitText={true}
          maxLength={4}
          extraClass={styles.input}
        />
        <Button
          text='Добавить'
          isLoader={isLoading === 'add'}
          onClick={addElement}
          disabled={inputValue === ''}
        />
        <Button
          text='Удалить'
          isLoader={isLoading === 'delete'}
          extraClass='mr-16'
          onClick={deleteElement}
          disabled={
            headIndex === null || isLoading === 'add' || isLoading === 'all'
          }
        />
        <Button
          text='Очистить'
          isLoader={isLoading === 'all'}
          onClick={() => deleteAll()}
          disabled={
            headIndex === null || isLoading === 'add' || isLoading === 'all'
          }
        />
      </form>
      <div className={styles.circle}>
        {arr &&
          arr.map((item, i) => {
            return (
              <Circle
                key={i}
                letter={item.name}
                index={i}
                head={item.head ? 'head' : ''}
                tail={item.tail ? 'tail' : ''}
                state={item.state}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};

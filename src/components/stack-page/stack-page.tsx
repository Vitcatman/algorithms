import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Stack } from '../../utils/stack';
import styles from './stack.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { timeout } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

interface IStackElement {
  name: string | null;
  status: ElementStates;
}

export const StackPage: React.FC = () => {
  const stack = new Stack<string>();
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arr, setArr] = useState<IStackElement[]>([]);

  const handleInput = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(evt.currentTarget.value);
  };

  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    stack.push(input);
    arr.push({
      name: stack.peak(),
      status: ElementStates.Changing,
    });
    setInput('');
    setArr([...arr]);

    await timeout(SHORT_DELAY_IN_MS);

    arr[arr.length - 1].status = ElementStates.Default;
    setArr([...arr]);
    setIsLoading(false);
  };

  const deleteItem = async () => {
    setIsLoading(true);

    arr[arr.length - 1].status = ElementStates.Changing;
    setArr([...arr]);

    await timeout(SHORT_DELAY_IN_MS);

    stack.pop();
    arr.pop();
    setArr([...arr]);

    setIsLoading(false);
  };

  const clearAll = async () => {
    setIsLoading(true);
    await timeout(SHORT_DELAY_IN_MS);

    stack.clear();
    setArr([]);

    setIsLoading(false);
  };

  return (
    <SolutionLayout title='Стек'>
      <form className={styles.form} onSubmit={addItem}>
        <Input
          onChange={(evt) => handleInput(evt)}
          value={input}
          isLimitText={true}
          maxLength={4}
          extraClass={styles.input}
        />
        <Button
          text='Добавить'
          isLoader={isLoading}
          disabled={isLoading || input === ''}
          type='submit'
        />
        <Button
          text='Удалить'
          isLoader={isLoading}
          extraClass='mr-16'
          onClick={deleteItem}
          disabled={!arr.length}
        />
        <Button
          text='Очистить'
          isLoader={isLoading}
          onClick={() => clearAll()}
          disabled={!arr.length}
        />
      </form>
      <div className={styles.circle}>
        {arr &&
          arr.map((item, i) => {
            return (
              <Circle
                key={i}
                letter={item.name || ''}
                index={i}
                head={arr.length - 1 !== i ? '' : 'top'}
                state={item.status}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};

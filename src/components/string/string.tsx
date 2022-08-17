import { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './string.module.css';
import { reverseStr } from './utils';

import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';

export interface ILetter {
  name: string;
  status: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reversedArray, setReversedArray] = useState<ILetter[]>([]);

  const handleInput = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(evt.currentTarget.value);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const arrayToReverse = input.split('').map((el) => {
      return {
        name: el,
        status: ElementStates.Default,
      };
    });

    await reverseStr(arrayToReverse, setReversedArray);
    setIsLoading(false);
  };

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={(evt) => handleInput(evt)}
        />
        <Button
          isLoader={isLoading}
          text='Развернуть'
          type='submit'
          disabled={isLoading || input === ''}
        />
      </form>
      <div className={styles.circle}>
        {reversedArray.map((item, i) => {
          return <Circle key={i} letter={item.name} state={item.status} />;
        })}
      </div>
    </SolutionLayout>
  );
};

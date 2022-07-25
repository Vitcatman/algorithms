import { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './fibonacci-page.module.css';
import { timeout } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Circle } from '../ui/circle/circle';

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [calculatedArray, setCalculatedArray] = useState<number[]>([]);

  const handleInput = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(parseInt(evt.currentTarget.value));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await getFibonacciSequence(input);
  };

  const getFibonacciSequence = async (number: number) => {
    setIsLoading(true);
    let arr: number[] = [];
    for (let i = 0; i <= number; i++) {
      if (i < 2) {
        arr.push(1);
        await timeout(SHORT_DELAY_IN_MS);
        setCalculatedArray([...arr]);
      } else {
        arr.push(arr[i - 2] + arr[i - 1]);
        await timeout(SHORT_DELAY_IN_MS);
        setCalculatedArray([...arr]);
      }
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          max={19}
          type='number'
          isLimitText={true}
          onChange={(evt) => handleInput(evt)}
        />
        <Button isLoader={isLoading} text='Рассчитать' type='submit' disabled={input > 19 || input < 0 } />
      </form>
      <div className={styles.circle}>
        {calculatedArray.map((item, i) => {
          return <Circle key={i} letter={item + ''} index={i} />;
        })}
      </div>
    </SolutionLayout>
  );
};

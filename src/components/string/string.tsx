import { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './string.module.css';
import { timeout } from '../../utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle'

interface ILetter {
 name: string,
 status: ElementStates
}

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reversedArray, setReversedArray] = useState< ILetter[]>([]);
   
  const handleInput = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(evt.currentTarget.value)
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const arrayToReverse = input.split('').map((el) => {return {
        name: el,
        status: ElementStates.Default
    }});
    
    await reverseStr(arrayToReverse)
  }

  const reverseStr = async (array: ILetter[]) => {
    setIsLoading(true);
    let start = 0;
    let end = array.length - 1;

    while (start <= end) {
        const tempStart = array[start];
        const tempEnd = array [end];
        array[start].status = ElementStates.Changing
        array[end].status = ElementStates.Changing
        setReversedArray([...array])

        await timeout(DELAY_IN_MS);

        array[start] = tempEnd;
        array[end] = tempStart;
        array[start].status = ElementStates.Modified
        array[end].status = ElementStates.Modified
        setReversedArray([...array])

        await timeout(DELAY_IN_MS);

        start++;
        end--;
    }
    setIsLoading(false);
  }

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input maxLength={11} isLimitText={true} onChange={(evt) => handleInput(evt)} />
        <Button isLoader={isLoading} text='Развернуть' type='submit' />
      </form>
      <div className={styles.circle}>
            {reversedArray.map((item, i) => {
               return <Circle key={i} letter={item.name} state={item.status}/>
            })}
        </div>
    </SolutionLayout>
  );
};

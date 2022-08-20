import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { LinkedList } from '../../utils/list';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { timeout } from '../../utils';
import { DELAY_IN_MS } from '../../constants/delays';

interface IListItem {
  name: string;
  status: ElementStates;
  tail?: boolean;
  head?: boolean;
  add?: boolean;
  dell?: boolean;
  miniCircle?: {
    name: string;
  };
}

export const ListPage: React.FC = () => {
  const initialList = ['0', '34', '8', '1'];

  const defaultList: IListItem[] = initialList.map((item) => ({
    name: item,
    status: ElementStates.Default,
  }));

  const linkedList = new LinkedList<string>(initialList);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [arr, setArr] = useState<IListItem[]>(defaultList);
  const [isLoading, setIsLoading] = useState<string>('');

  useEffect(() => {
    arr[0].head = true;
    arr[arr.length - 1].tail = true;
    setArr([...arr]);
  }, []);

  const addHeadItem = async () => {
    setIsLoading('addHead');
    linkedList.prepend(inputValue);
    arr[0] = {
      ...arr[0],
      add: true,
      head: false,
      miniCircle: {
        name: inputValue,
      },
    };
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr[0] = {
      ...arr[0],
      add: false,
      miniCircle: undefined,
      head: false,
    };
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr.unshift({
      name: inputValue,
      status: ElementStates.Modified,
    });
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr[0] = {
      ...arr[0],
      status: ElementStates.Default,
      head: true,
    };
    setArr([...arr]);
    setIsLoading('');
    setInputValue('');
  };

  const addTailItem = async () => {
    setIsLoading('addTail');

    linkedList.append(inputValue);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      tail: false,
      add: true,
      miniCircle: {
        name: inputValue,
      },
    };
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      add: false,
      miniCircle: undefined,
      tail: false,
    };
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr.push({
      name: inputValue,
      status: ElementStates.Modified,
    });
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      status: ElementStates.Default,
      tail: true,
    };
    setArr([...arr]);

    arr[arr.length - 2] = {
      ...arr[arr.length - 2],
      tail: false,
    };
    setArr([...arr]);

    setIsLoading('');
    setInputValue('');
  };

  const deleteHeadItem = async () => {
    setIsLoading('deleteElementHead');
    arr[0] = {
      ...arr[0],
      head: false,
      name: '',
      dell: true,
      miniCircle: { name: arr[0].name },
    };
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr.shift();
    arr[0].status = ElementStates.Modified;
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr[0] = {
      ...arr[0],
      status: ElementStates.Default,
      head: true,
    };
    setArr([...arr]);

    setIsLoading('');
  };

  const deleteTailItem = async () => {
    setIsLoading('deleteElementTail');
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      tail: false,
      name: '',
      dell: true,
      miniCircle: {
        name: arr[arr.length - 1].name,
      },
    };
    setArr([...arr]);
    await timeout(DELAY_IN_MS);
    arr.pop();

    arr[arr.length - 1].status = ElementStates.Modified;
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr[arr.length - 1].status = ElementStates.Default;
    setArr([...arr]);

    arr[arr.length - 1].tail = true;

    setArr([...arr]);
    setIsLoading('');
  };

  const addIndexItem = async () => {
    if (inputIndex < 0 || inputIndex > linkedList.getSize()) {
      console.log('Enter a valid index');
      return;
    }
    setIsLoading('addElementIndex');

    if (inputIndex === 0) {
      arr[0] = {
        ...arr[0],
        add: true,
        head: false,
        miniCircle: {
          name: inputValue,
        },
      };
      setArr([...arr]);

      await timeout(DELAY_IN_MS);

      arr[0] = {
        ...arr[0],
        add: false,
        miniCircle: undefined,
        head: false,
      };
      setArr([...arr]);

      await timeout(DELAY_IN_MS);

      arr.unshift({
        name: inputValue,
        status: ElementStates.Modified,
      });
      setArr([...arr]);

      await timeout(DELAY_IN_MS);

      arr[0] = {
        ...arr[0],
        status: ElementStates.Default,
        head: true,
      };
    } else {
      linkedList.insertAt(inputValue, inputIndex!);
      for (let i = 0; i <= inputIndex; i++) {
        arr[i] = {
          ...arr[i],
          add: true,
          miniCircle: {
            name: linkedList.getNodeByIndex(inputIndex)!,
          },
        };
        if (i > 0) {
          arr[i - 1] = {
            ...arr[i - 1],
            add: false,
            miniCircle: undefined,
            status: ElementStates.Changing,
          };
        }
        setArr([...arr]);
        await timeout(DELAY_IN_MS);
      }
      arr[inputIndex!] = {
        ...arr[inputIndex!],
        add: false,
        miniCircle: undefined,
      };
      arr.splice(inputIndex, 0, {
        name: linkedList.getNodeByIndex(inputIndex)!,
        status: ElementStates.Modified,
      });
      setArr([...arr]);

      await timeout(DELAY_IN_MS);

      arr.forEach((el) => (el.status = ElementStates.Default));
      setArr([...arr]);

      arr[1].head = false;
      arr[0].head = true;
    }
    setArr([...arr]);
    setInputValue('');
    setIsLoading('');
  };

  const deleteIndexItem = async () => {
    setIsLoading('deleteElementIndex');
    for (let i = 0; i <= inputIndex; i++) {
      arr[i].status = ElementStates.Changing;
      if (i === inputIndex) {
      }
      setArr([...arr]);
      await timeout(DELAY_IN_MS);
    }
    arr[inputIndex] = {
      ...arr[inputIndex],
      name: '',
      dell: true,
      miniCircle: {
        name: String(inputIndex),
      },
    };
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr.splice(inputIndex, 1);
    setArr([...arr]);

    await timeout(DELAY_IN_MS);

    arr.forEach((el, i) => (el.status = ElementStates.Default));
    setArr([...arr]);

    arr[arr.length - 1].tail = true;
    arr[0].head = true;
    setArr([...arr]);
    setIsLoading('');
  };

  const isDisabled = (order: string) => {
    return isLoading === order && isLoading === 'none';
  };

  return (
    <SolutionLayout title='Связный список'>
      <form className={styles.form}>
        <div className={styles.value}>
          <Input
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
          />
          <Button
            text='Добавить в head'
            isLoader={isLoading === 'addHead'}
            onClick={addHeadItem}
            disabled={
              inputValue === '' || arr.length >= 8 || isDisabled('addHead')
            }
          />
          <Button
            text='Добавить в tail'
            isLoader={isLoading === 'addTail'}
            onClick={addTailItem}
            disabled={
              inputValue === '' || arr.length >= 8 || isDisabled('addTail')
            }
          />
          <Button
            text='Удалить из head'
            isLoader={isLoading === 'deleteElementHead'}
            onClick={deleteHeadItem}
            disabled={arr.length <= 1 || isDisabled('dellHead')}
          />
          <Button
            text='Удалить из tail'
            isLoader={isLoading === 'deleteElementTail'}
            onClick={deleteTailItem}
            disabled={arr.length <= 1 || isDisabled('dellTail')}
          />
        </div>
        <div className={styles.index}>
          <Input
            onChange={(e) => setInputIndex(Number(e.currentTarget.value))}
            type='number'
            placeholder='Введите индекс'
            value={inputIndex}
            extraClass={styles.input}
          />

          <Button
            text='Добавить по индексу'
            isLoader={isLoading === 'addElementIndex'}
            onClick={addIndexItem}
            disabled={
              inputValue === '' ||
              !inputIndex ||
              arr.length >= 8 ||
              inputIndex > arr.length - 1 ||
              isDisabled('addIndex')
            }
            extraClass={styles.big_input}
          />
          <Button
            text='Удалить по индексу'
            isLoader={isLoading === 'deleteElementIndex'}
            onClick={deleteIndexItem}
            disabled={
              arr.length <= 1 ||
              inputIndex > arr.length - 1 ||
              isDisabled('deleteElementIndex')
            }
            extraClass={styles.big_input}
          />
        </div>
      </form>
      <div className={styles.circle_wrap}>
        {arr &&
          arr.map((item, i) => (
            <div key={i} className={styles.circle}>
              <Circle
                letter={item.name}
                index={i}
                head={item.head ? 'head' : ''}
                tail={item.tail ? 'tail' : ''}
                state={item.status}
              />

              {i !== arr.length - 1 && (
                <ArrowIcon
                  fill={
                    item.status === ElementStates.Changing
                      ? '#d252e1'
                      : '#0032FF'
                  }
                />
              )}

              {item.miniCircle && item.add && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.miniCircle.name}
                  extraClass={styles.after_minicirlce}
                />
              )}

              {item.miniCircle && item.dell && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.miniCircle?.name}
                  extraClass={styles.before_minicirlce}
                />
              )}
            </div>
          ))}
      </div>
    </SolutionLayout>
  );
};

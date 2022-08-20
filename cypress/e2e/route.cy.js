import { baseUrl } from './appAvailable.cy';

describe('route test', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('string page test', () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
    cy.contains('button', 'Развернуть');
  });

  it('Fibonacci page test', () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
    cy.contains('button', 'Рассчитать');
  });
  it('Array Sorting page test', () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
    cy.contains('button', 'Новый массив');
  });
  it('Array Sorting page test', () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
    cy.contains('button', 'Новый массив');
  });
  it('Stack page test', () => {
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
    cy.contains('button', 'Добавить');
  });
  it('Queue page test', () => {
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
    cy.contains('button', 'Добавить');
  });
  it('Linked List page test', () => {
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
    cy.contains('button', 'Добавить в head');
  });
});

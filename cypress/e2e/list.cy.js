import { baseUrl } from './appAvailable.cy';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('list e2e test', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/list`);
  });

  it('buttons are inactive with empty input', () => {
    cy.get('input').eq(0).clear();
    cy.get('input').eq(1).clear();
    cy.contains('button', 'Добавить в head').should('be.disabled');
    cy.contains('button', 'Добавить в tail').should('be.disabled');
    cy.contains('button', 'Добавить по индексу').should('be.disabled');
    cy.contains('button', 'Удалить по индексу').should('be.disabled');
  });

  it('default list is correct', () => {
    cy.get('[class*=circle_circle]').each((el, i) => {
      if (i === 0) expect(el).to.contain('0');
      if (i === 1) expect(el).to.contain('34');
      if (i === 2) expect(el).to.contain('8');
      if (i === 3) expect(el).to.contain('1');
    });
    cy.get('[class*=circle_index]').each((el, i) => {
      cy.wrap(el).contains(i);
    });
    cy.get('[class*=circle_head]').each((el, i) => {
      if (i === 0) expect(el).to.contain('head');
      if (i === 1) expect(el).to.contain('');
      if (i === 2) expect(el).to.contain('');
      if (i === 3) expect(el).to.contain('');
    });
    cy.get('[class*=circle_tail]').each((el, i) => {
      if (i === 0) expect(el).to.contain('');
      if (i === 1) expect(el).to.contain('');
      if (i === 2) expect(el).to.contain('');
      if (i === 3) expect(el).to.contain('tail');
    });
  });

  it('Adding element to head', () => {
    cy.get('input').eq(0).type('123');
    cy.contains('button', 'Добавить в head').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('123');
        }
        if (index === 4) cy.wrap(el).contains('tail');
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_modified]').contains('123');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_content]').each((el, index) => {
      if (index === 0) cy.wrap(el).contains('head');
    });
    cy.get('[class*=circle_default]');
  });

  it('Adding element to tail', () => {
    cy.get('input').eq(0).type('tst');
    cy.contains('button', 'Добавить в tail').click();
    cy.wait(1000);
    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        if (index === length - 1) {
          cy.wrap(el).contains('tst');
        }
        if (index === length - 1) cy.get(el).should('not.have.text', 'tail');
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_modified]');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class*=circle_content]').each((el, index) => {
      if (index === length - 1) cy.wrap(el).contains('tail');
    });
    cy.get('[class*=circle_default]');
  });

  it('Adding element by index', () => {
    cy.get('input').eq(0).type('5');
    cy.get('input').eq(1).type('1');
    cy.contains('button', 'Добавить по индексу').click();
    cy.wait(2000);
    cy.get('[class*=circle_circle]').each((el, index) => {
      if (index === 0) expect(el).to.contain('0');
      if (index === 1) expect(el).to.contain('5');
      if (index === 2) expect(el).to.contain('34');
    });
    cy.get('[class*=circle_head]').each((el, index) => {
      if (index === 0) expect(el).to.contain('head');
      if (index === 1) expect(el).to.contain('');
    });
    cy.get('[class*=circle_tail]').each((el, index) => {
      if (index === 5) expect(el).to.contain('');
      if (index === 6) expect(el).to.contain('tail');
    });
  });

  it('Delete element from head', () => {
    cy.contains('button', 'Удалить из head').click();
    cy.wait(2000);
    cy.get('[class*=circle_circle]').each((el, i) => {
      if (i === 0) expect(el).to.contain('34');
      if (i === 1) expect(el).to.contain('8');
    });
    cy.get('[class*=circle_head]').each((el, i) => {
      if (i === 0) expect(el).to.contain('head');
      if (i === 1) expect(el).to.contain('');
    });
    cy.get('[class*=circle_tail]').each((el, i) => {
      if (i === 4) expect(el).to.contain('');
      if (i === 5) expect(el).to.contain('tail');
    });
  });

  it('Delete element from tail', () => {
    cy.contains('button', 'Удалить из tail').click();
    cy.wait(2000);
    cy.get('[class*=circle_circle]').each((el, i) => {
      if (i === 2) expect(el).to.contain('8');
      if (i === 1) expect(el).to.contain('34');
    });
    cy.get('[class*=circle_head]').each((el, i) => {
      if (i === 0) expect(el).to.contain('head');
      if (i === 1) expect(el).to.contain('');
    });
    cy.get('[class*=circle_tail]').each((el, i) => {
      if (i === 2) expect(el).to.contain('tail');
    });
  });

  it('Delete element by index', () => {
    cy.get('input').eq(1).type('1');
    cy.contains('button', 'Удалить по индексу').click();
    cy.wait(3000);
    cy.get('[class*=circle_circle]').each((el, index) => {
      if (index === 1) expect(el).to.contain('8');
      if (index === 2) expect(el).to.contain('1');
    });
    cy.get('[class*=circle_tail]').each((el, index) => {
      if (index === 2) expect(el).to.contain('tail');
      if (index === 1) expect(el).to.contain('');
    });
  });
});

import { baseUrl } from './appAvailable.cy';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('stack algorithm e2e tests', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/stack`);
  });

  it('add button is inactive with empty input', () => {
    cy.get('input').clear();
    cy.contains('button', 'Добавить').should('be.disabled');
  });

  it('adding elements to stack', () => {
    cy.get('input').type('test');
    cy.contains('button', 'Добавить').click();

    cy.get('[class*=circle_circle]').as('circle');
    cy.get('[class*=circle_head]').as('circleHead');
    cy.get('[class*=circle_index]').as('circleIndex');

    cy.get('@circle')
      .should('have.length', '1')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
      .contains('test');
    cy.get('@circleHead').contains('top');
    cy.get('@circleIndex').contains('0');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

    cy.get('input').type('123');
    cy.contains('button', 'Добавить').click();

    cy.get('@circle')
      .should('have.length', 2)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain('test');
        }
        if (i === 1) {
          expect(el).to.contain('123');
          cy.get(el).should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)'
          );
          cy.wait(SHORT_DELAY_IN_MS);
          cy.get(el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        }
      });

    cy.get('@circleIndex')
      .should('have.length', 2)
      .each((el, i) => expect(el).to.contain(i));
    cy.get('@circleHead')
      .should('have.length', 2)
      .each((el, i) => {
        if (i === 1) {
          expect(el).to.contain('top');
        }
      });
  });

  it('deleting last element from stack', () => {
    cy.get('input').type('test');
    cy.contains('button', 'Добавить').click();
    cy.get('input').type('123');
    cy.contains('button', 'Добавить').click();
    cy.contains('button', 'Удалить').click();

    cy.get('[class*=circle_circle]')
      .should('have.length', '2')
      .each((el, i) => {
        if (i === 1) {
          expect(el).to.contain('123');
          cy.get(el).should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)'
          );
        }
        if (i === 0) {
          expect(el).to.contain('test');
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_head]').contains('top');
    cy.get('[class*=circle_index]').contains('0');
    cy.get('[class*=circle_circle]').should(
      'have.css',
      'border',
      '4px solid rgb(0, 50, 255)'
    );
  });

  it('clear stack', () => {
    cy.get('input').type('test');
    cy.contains('button', 'Добавить').click();
    cy.get('input').type('123');
    cy.contains('button', 'Добавить').click();
    cy.contains('button', 'Очистить').click();

    cy.get('[class*=circle_circle]').should('have.length', '0');
  });
});

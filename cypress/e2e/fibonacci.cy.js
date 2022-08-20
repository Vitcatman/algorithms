import { baseUrl } from './appAvailable.cy';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('fibonacci algorithm e2e test', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/fibonacci`);
  });
  it('button is inactive with empty input', () => {
    cy.get('input').clear();
    cy.contains('button', 'Рассчитать').should('be.disabled');
  });

  it('button is active after entering number into input', () => {
    cy.get('input').type('12');
    cy.contains('button', 'Рассчитать').should('be.enabled');
  });

  it('fibonacci algorhithm works correctly', () => {
    cy.get('input').type('3');
    cy.contains('button', 'Рассчитать').click();

    cy.get('[class*=circle_circle]')
      .should('have.length', 1)
      .each((el, i) => {
        if (i === 0) expect(el).to.contain('1');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_circle]')
      .should('have.length', 2)
      .each((el, i) => {
        if (i === 1) expect(el).to.contain('1');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_circle]')
      .should('have.length', 3)
      .each((el, i) => {
        if (i === 2) expect(el).to.contain('2');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_circle]')
      .should('have.length', 4)
      .each((el, i) => {
        if (i === 3) expect(el).to.contain('3');
      });
  });
});

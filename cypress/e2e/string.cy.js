import { baseUrl } from './appAvailable.cy';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('String reverse tests', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/recursion`);
  });

  it('button is inactive with empty input', () => {
    cy.get('input').clear();
    cy.contains('button', 'Развернуть').should('be.disabled');
  });
  it('string reverse algorithm works correctly', () => {

    cy.get('input').type('123');
    cy.contains('button', 'Развернуть').click();

    cy.get('[class*=circle_circle]').each((el, i) => {
      if (i === 0) expect(el).to.contain('1');
      if (i === 1) expect(el).to.contain('2');
      if (i === 2) expect(el).to.contain('3');

      if (i === 0 || i === 2) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_circle]').each((el, i) => {
      if (i === 0 || i === 2) {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_circle]').each((el, i) => {
        if (i === 0) expect(el).to.contain('3');
        if (i === 2) expect(el).to.contain('1');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_circle]').each((el) => {
        cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      });
  });
});

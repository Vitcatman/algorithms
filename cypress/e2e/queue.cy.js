import { baseUrl } from './appAvailable.cy';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('queue algorithm e2e tests', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/queue`);
  });

  it('add button is inactive with empty input', () => {
    cy.get('input').clear();
    cy.contains('button', 'Добавить').should('be.disabled');
  });

  it('adding elements to queue', () => {
    cy.get('input').type('test');
    cy.contains('button', 'Добавить').click();

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('test');
        expect(el).to.contain('head');
        expect(el).to.contain('tail');

        cy.get(el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      }
    });

    cy.get('input').type('123');
    cy.contains('button', 'Добавить').click();

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 0) {
        expect(el).to.contain('test');
        expect(el).to.contain('head');
      }
      if (i === 1) {
        expect(el).to.contain('123');
        expect(el).to.contain('tail');

        cy.get(el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      }
    });
  });

  it('deleting element from queue', () => {
    cy.get('input').type('test');
    cy.contains('button', 'Добавить').click();
    cy.get('input').type('123');
    cy.contains('button', 'Добавить').click();
    cy.contains('button', 'Удалить').click();

    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 0) {
        cy.get(el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

        cy.get(el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        expect(el).to.contain('');
      }
      if (i === 1) {
        expect(el).to.contain('123');
        expect(el).to.contain('tail');
      }
    });
    cy.get('[class*=circle_content]').each((el, i) => {
      if (i === 1) {
        expect(el).to.contain('head');
      }
    });
  });

  it('clear queue', () => {
    cy.get('input').type('test');
    cy.contains('button', 'Добавить').click();
    cy.get('input').type('123');
    cy.contains('button', 'Добавить').click();
    cy.contains('button', 'Очистить').click();

    cy.get('[class*=circle_content]').each((el) => expect(el).to.contain(''));
  });
});

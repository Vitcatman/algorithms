export const baseUrl = 'http://localhost:3000'

describe('service is available', ()=> {
    it('should be available on baseUrl', () => {
      cy.visit(baseUrl);
    });
  }); 
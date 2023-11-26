describe('Issue details editing', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    })
    
    it('Should delete an issue successfully', () => {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });
            cy.get('[data-testid="modal:confirm"]').should('be.visible').contains('Are you sure you want to delete this issue?');
            cy.contains('Delete issue').click();
            cy.reload();
            cy.get('[data-testid="modal:confirm"]').should('not.exist');  
      });

      

      it.only('Should cancel an issue deltion successfully', ()=>{
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });
            cy.get('[data-testid="modal:confirm"]').should('be.visible').contains('Are you sure you want to delete this issue?');
            cy.contains('Cancel').click();
            cy.get('[data-testid="modal:confirm"]').should('not.exist');
            cy.contains(issueTitle).should('be.visible');

      })
      const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
      const issueTitle = 'This is an issue of type: Task.'
})

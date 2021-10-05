describe('GithubComponent', () => {
  it('Open github component and search for a user and user projects', () => {
    cy.visit('/github-user');
    cy.get('.input-container input').type('oleksiy95');
    cy.get('.button-container button').click();
    cy.get('mat-card-title').should('contain', 'Oleksii Oleksiv');
    cy.get('mat-card-actions button').click();
    cy.get('mat-card').should('have.length', 9);    
  });
});
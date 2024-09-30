describe('QA Application', () => {
  beforeEach(() => {
    cy.visit('https://apex.oracle.com/pls/apex/r/matheuscarmo/qa-application/login')
    cy.get('input[placeholder="Username"]').type(Cypress.env('user_name'))
    cy.get('input[placeholder="Password"]').type(Cypress.env('user_password'), { log: false })
    cy.contains('Sign In').click()
  })
  it('Access table and change the quantity of order 10 to 20', () => {
    cy.intercept('POST', '**pls/apex/wwv_flow.ajax?p_context=qa-application/home/**')
      .as('postSave')
    cy.contains('span', 'Order').click();
    cy.get('input[placeholder="Filter..."]').type(10)
    cy.get('a[data-return-value="10"]').click()
    cy.get('tr[data-id="10"] > .u-tE').dblclick()
    cy.get('tr[data-id="10"] > .u-tE').type(20)
    cy.contains('Save').click()
    cy.wait('@postSave')
    cy.get('tr[data-id="10"] > .u-tE').should('contain', '20')

    //I tried to validate the change in the graph, but I couldn't solve it, so below is my line of reasoning

    //cy.get('circle[role="img"][aria-label="Series: Acme Store; Group: Grapes; Value: 20. Unselected"]').click();
    //cy.get('circle[aria-label="Series: Acme Store; Group: Grapes; Value: 20. Unselected"]').should('exist');
    //cy.get('circle[aria-label="Series: Acme Store; Group: Grapes; Value: 20. Selected"]').should('exist');
    //cy.get('path[aria-label="Series: Deli; Group: Grapes; Value: 42. Unselected"]')

  })
  it('Access table and change the location of order 10 to Deli', () => {
    cy.intercept('POST', '**/pls/apex/wwv_flow.ajax?p_context=qa-application/home/**')
      .as('postLoadSearch')
    cy.contains('span', 'Order').click();
    cy.get('input[placeholder="Filter..."]').type(10)
    cy.get('a[data-return-value="10"]').click()
    cy.get('[data-id="10"] > :nth-child(6)').dblclick()
    cy.get('[data-id="10"] > :nth-child(6)').type('Deli')
    cy.get('button[aria-label="Search"]').click()
    cy.wait('@postLoadSearch')
    cy.get('li[data-id="1"]').contains('Deli').click()
    cy.contains('Save').click()
    cy.get('[data-id="10"] > :nth-child(6)').should('contain', 'Deli')
    
    //I tried to validate the change in the graph, but I couldn't solve it, so below is my line of reasoning
    
    //cy.get('path[aria-label="Series: Deli; Group: Grapes; Value: 42. Unselected""]').should('exist');
    //cy.get('path[aria-label="Series: Deli; Group: Grapes; Value: 42. Unselected""]').click();
    //cy.get('path[aria-label="Series: Deli; Group: Grapes; Value: 42. Selected"]').should('exist');
  })
})
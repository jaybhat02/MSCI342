describe('My First Test', () => {
 
  beforeEach(()=>{
    cy.visit('http://localhost:3000')
  })

  it('allows a user to sign up',() =>{
    cy.get('h1').should('contain.text','Sign in');
    cy.get('#email').type('hello');
    cy.get('#password').type('password');
    cy.get('button').click();
  })
  
})

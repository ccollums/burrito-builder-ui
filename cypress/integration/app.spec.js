describe('main page', () => {
  beforeEach(() => {
    cy.fixture('./orders.json').then((allOrders) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: allOrders
      })
      cy.visit('http://localhost:3000/');
    })
  })

	it('should display an h1 with the title of the app', () => {
		cy.get('h1').contains('Burrito Builder')
	})

	
	it('should display the form and all of the ingredients', () => {
		cy.get('input').should('be.visible')
		cy.get('[name="beans"]').should('be.visible')
		cy.get('[name="steak"]').should('be.visible')
		cy.get('[name="carnitas"]').should('be.visible')
		cy.get('[name="sofritas"]').should('be.visible')
		cy.get('[name="lettuce"]').should('be.visible')
		cy.get('[name="queso fresco"]').should('be.visible')
		cy.get('[name="pico de gallo"]').should('be.visible')
		cy.get('[name="hot sauce"]').should('be.visible')
		cy.get('[name="guacamole"]').should('be.visible')
		cy.get('[name="jalapenos"]').should('be.visible')
		cy.get('[name="cilantro"]').should('be.visible')
		cy.get('[name="sour cream"]').should('be.visible')
		cy.get(':nth-child(15)').should('exist')
		cy.get('p').contains('Order: Nothing selected')
	})

	it('should display the orders on the page', () => {
		cy.get('section > :nth-child(1)').should('exist')
		cy.get('section > :nth-child(2)').should('exist')
		cy.get('section > :nth-child(3)').should('exist')
	})

	it('each order should contain a name and at least one ingredient', () => {
		cy.get(':nth-child(1) > h3').contains('Pat')
		cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').contains('beans')
	})
})
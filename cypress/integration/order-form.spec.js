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

	it('should be able to select the name input and fill them with a corresponding value', () => {
		cy.get('input')
			.type('Carly')
			.should('have.value', 'Carly')
	})

	it('when a ingredient is clicked it updates the order', () => {
		cy.get('[name="beans"]').click()
		cy.get('p').contains('Order: beans')
	})

	it('if a name is not typed then the order will not be submitted', () => {
		cy.get('[name="beans"]').click()
		cy.get('p').contains('Order: beans')
		cy.get(':nth-child(15)').click()
		cy.get('p').contains('Order: Nothing selected')
	})

	it('if a name is typed but an ingredient is not chosen the order will not be submitted', () => {
		cy.get('input')
			.type('Carly')
		cy.get(':nth-child(15)').click()
		cy.get('p').contains('Order: Nothing selected')
	})

	it('if a name is inputted and at least one ingredient chosen, when submit is clicked the order will update on the page', () => {
		cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 201,
        body: {
          id: 4,
          name: "Nora",
          ingredients: ["beans"]
        }
      })
		cy.get('input')
			.type('Nora')
			.should('have.value', 'Nora')
		cy.get('[name="beans"]').click()
		cy.get(':nth-child(15)').click()
		cy.get('section > :nth-child(4)').should('exist')
		cy.get(':nth-child(4) > h3').contains('Nora')
		cy.get(':nth-child(4) > .ingredient-list > li').contains('beans')
	})

})
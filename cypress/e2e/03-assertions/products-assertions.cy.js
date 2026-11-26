/**
 * MODULE 03 — Assertions
 * Skills: should chains, have.length, include.text, visibility, CSS/attr checks
 */

describe('03 Assertions — Products page', () => {
  beforeEach(() => {
    cy.loginUI('standard_user', 'secret_sauce')
    cy.location('pathname').should('match', /products/)

  })

  it('loads a grid of products', () => {
    cy.get('[data-testid="loading"]').should('not.be.visible')
    cy.get('[data-testid="product-grid"]').should('be.visible')
    cy.get('[data-testid="product-grid"] .product-card').should('have.length.at.least', 4)
  })

  it('each product card has name, price, and add button', () => {
    cy.get('.product-card').first().within(() => {
      cy.get('[data-testid="product-name"]').should('not.be.empty')
      cy.get('[data-testid="product-price"]').should('contain', '$')
      cy.get('[data-testid="add-to-cart"]').should('be.enabled')
    })
  })

  it('updates cart badge when an item is added', () => {
    cy.get('[data-testid="cart-badge"]').should('have.text', '0')
    cy.get('[data-product-id="backpack"]')
      .find('[data-testid="add-to-cart"]')
      .click()
    cy.get('[data-testid="cart-badge"]').should('have.text', '1')
  })

  it('sorts products by price low to high', () => {
    cy.get('[data-testid="sort-select"]').select('price-asc')

    cy.get('[data-testid="product-price"]').then(($prices) => {
      const values = [...$prices].map((el) =>
        parseFloat(el.textContent.replace('$', ''))
      )
      const sorted = [...values].sort((a, b) => a - b)
      expect(values).to.deep.equal(sorted)
    })
  })
})

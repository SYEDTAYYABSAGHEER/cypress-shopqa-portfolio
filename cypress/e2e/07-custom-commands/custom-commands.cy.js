/**
 * MODULE 07 — Custom Commands
 * Skills: cy.login, cy.getByTestId, cy.addProductToCart, cy.seedCart
 * See: cypress/support/commands.js
 */

describe('07 Custom Commands', () => {
  it('logs in with cy.login (session-aware) and stays authenticated', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.visit('/products.html')
    cy.getByTestId('products-page').should('be.visible')
    cy.getByTestId('user-greeting').should('contain', 'standard_user')
  })

  it('adds products with a reusable command', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.visit('/products.html')
    cy.addProductToCart('fleece-jacket')
    cy.addProductToCart('red-hoodie')
    cy.getByTestId('cart-badge').should('have.text', '2')
  })

  it('seeds cart via localStorage for faster setup', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.seedCart([
      { id: 'bolt-shirt', name: 'Bolt T-Shirt', price: 15.99, qty: 2 },
    ])
    cy.visit('/cart.html')
    cy.getByTestId('cart-item-bolt-shirt').should('be.visible')
    cy.getByTestId('cart-subtotal').should('contain', '31.98')
  })
})

/**
 * MODULE 09 — Advanced patterns
 * Skills: viewport testing, cy.task, conditional UI, remove-from-cart edge cases
 */

describe('09 Advanced — Viewport, tasks, edge cases', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('keeps cart usable on a mobile viewport', () => {
    cy.viewport('iphone-x')
    cy.seedCart([
      { id: 'onesie', name: 'Onesie', price: 7.99, qty: 1 },
    ])
    cy.visit('/cart.html')
    cy.getByTestId('cart-item-onesie').should('be.visible')
    cy.getByTestId('checkout-button').should('be.visible')
  })

  it('calls a Node task from the browser context', () => {
    cy.task('log', 'ShopQA advanced module is running')
    cy.task('resetStore').should('eq', null)
  })

  it('removes the last cart item and shows empty state', () => {
    cy.seedCart([
      { id: 'bike-light', name: 'Bike Light', price: 9.99, qty: 1 },
    ])
    cy.visit('/cart.html')
    cy.get('[data-testid="cart-item-bike-light"]')
      .find('[data-testid="remove-item"]')
      .click()
    cy.getByTestId('cart-empty').should('be.visible')
    cy.getByTestId('cart-badge').should('have.text', '0')
  })

  it('completes an end-to-end happy path as a smoke test', () => {
    cy.visit('/products.html')
    cy.addProductToCart('backpack')
    cy.addProductToCart('bolt-shirt')
    cy.getByTestId('cart-link').click()
    cy.getByTestId('checkout-button').click()
    cy.getByTestId('first-name').type('Grace')
    cy.getByTestId('last-name').type('Hopper')
    cy.getByTestId('postal-code').type('02139')
    cy.getByTestId('continue-checkout').click()
    cy.getByTestId('order-total').should('contain', '45.98')
    cy.getByTestId('finish-order').click()
    cy.getByTestId('complete-header').should('contain', 'Thank you')
  })
})

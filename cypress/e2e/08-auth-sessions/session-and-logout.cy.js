/**
 * MODULE 08 — Auth sessions & state
 * Skills: cy.session caching, logout, protected routes, localStorage
 */

describe('08 Auth Sessions', () => {
  it('caches login with cy.session so later visits skip the UI login', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.visit('/products.html')
    cy.getByTestId('products-page').should('be.visible')

    // Second visit reuses the cached session (faster in large suites)
    cy.login('standard_user', 'secret_sauce')
    cy.visit('/cart.html')
    cy.getByTestId('cart-page').should('be.visible')
  })

  it('redirects unauthenticated users to login', () => {
    cy.clearAllLocalStorage()
    cy.visit('/products.html')
    cy.getByTestId('login-page').should('be.visible')
    cy.getByTestId('login-form').should('be.visible')
  })


  it('logs out and clears session data', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.visit('/products.html')
    cy.getByTestId('logout-button').click()
    cy.getByTestId('login-page').should('be.visible')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('shopqa_user')).to.be.null
      expect(win.localStorage.getItem('shopqa_cart')).to.be.null
    })
  })
})

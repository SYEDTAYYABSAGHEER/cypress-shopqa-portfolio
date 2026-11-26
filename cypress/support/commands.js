/**
 * Custom Commands — reusable actions used across tests.
 * Interview tip: custom commands keep specs readable and DRY.
 */

Cypress.Commands.add('login', (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/')
      cy.get('[data-testid="username"]').clear().type(username)
      cy.get('[data-testid="password"]').clear().type(password, { log: false })
      cy.get('[data-testid="login-button"]').click()
      cy.location('pathname').should('match', /products/)
      cy.get('[data-testid="products-page"]').should('be.visible')
    },
    {
      validate() {
        cy.getAllLocalStorage().should((storage) => {
          const origin = Cypress.config('baseUrl')
          expect(storage[origin]?.shopqa_user).to.eq(username)
        })
      },
    }
  )
})

Cypress.Commands.add('loginUI', (username, password) => {
  cy.visit('/')
  cy.get('[data-testid="username"]').clear().type(username)
  cy.get('[data-testid="password"]').clear().type(password, { log: false })
  cy.get('[data-testid="login-button"]').click()
})

Cypress.Commands.add('addProductToCart', (productId) => {
  cy.get(`[data-product-id="${productId}"]`)
    .find('[data-testid="add-to-cart"]')
    .click()
})

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`)
})

Cypress.Commands.add('seedCart', (items) => {
  // Ensure we are on the app origin (cy.session ends on a blank page)
  cy.location('href', { log: false }).then((href) => {
    if (!href || href === 'about:blank' || !href.includes('localhost:3000')) {
      cy.visit('/products.html')
    }
  })
  cy.window().then((win) => {
    win.localStorage.setItem('shopqa_cart', JSON.stringify(items))
  })
})

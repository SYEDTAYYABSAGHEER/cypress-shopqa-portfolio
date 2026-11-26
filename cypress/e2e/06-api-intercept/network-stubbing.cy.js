/**
 * MODULE 06 — Network intercept & stubbing
 * Skills: cy.intercept, wait aliases, stubbing product API & order API
 */

describe('06 API Intercept — Network control', () => {
  beforeEach(() => {
    cy.loginUI('standard_user', 'secret_sauce')
  })

  it('waits for the real products API before asserting UI', () => {
    cy.intercept('GET', '**/data/products.json').as('getProducts')
    cy.visit('/products.html')
    // 200 = fresh response, 304 = browser cache — both are successful loads
    cy.wait('@getProducts').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.get('[data-testid="product-grid"] .product-card').should('have.length', 6)
  })

  it('stubs products with fixture data', () => {
    cy.intercept('GET', '**/data/products.json', { fixture: 'products.json' }).as(
      'stubProducts'
    )
    cy.visit('/products.html')
    cy.wait('@stubProducts')
    cy.get('[data-testid="product-grid"] .product-card').should('have.length', 3)
    cy.contains('QA Backpack').should('be.visible')
  })

  it('shows empty state when products API returns []', () => {
    cy.intercept('GET', '**/data/products.json', [])
    cy.visit('/products.html')
    cy.get('[data-testid="empty-state"]').should('be.visible')
  })

  it('stubs the order API and asserts the mocked order id', () => {
    cy.fixture('checkout').then((data) => {
      cy.intercept('POST', '**/api/orders', {
        statusCode: 201,
        body: data.orderResponse,
      }).as('createOrder')

      cy.seedCart([
        {
          id: 'backpack',
          name: 'QA Backpack',
          price: 29.99,
          qty: 1,
        },
      ])
      cy.visit('/checkout.html')

      cy.getByTestId('first-name').type(data.customer.firstName)
      cy.getByTestId('last-name').type(data.customer.lastName)
      cy.getByTestId('postal-code').type(data.customer.postalCode)
      cy.getByTestId('continue-checkout').click()
      cy.getByTestId('finish-order').click()

      cy.wait('@createOrder').its('request.body.total').should('eq', 29.99)
      cy.getByTestId('order-id').should('contain', data.orderResponse.id)
    })
  })
})

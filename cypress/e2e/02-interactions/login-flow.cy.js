/**
 * MODULE 02 — Interactions
 * Skills: type, clear, click, url assertions, negative paths
 */

describe('02 Interactions — Login flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in with valid credentials and lands on products', () => {
    cy.get('[data-testid="username"]').type('standard_user')
    cy.get('[data-testid="password"]').type('secret_sauce')
    cy.get('[data-testid="login-button"]').click()

    cy.location('pathname').should('match', /products/)
    cy.get('[data-testid="products-page"]').should('be.visible')
    cy.get('[data-testid="user-greeting"]').should('contain', 'standard_user')
  })

  it('shows an error when fields are empty', () => {
    cy.get('[data-testid="login-button"]').click()
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'required')
  })

  it('shows an error for invalid credentials', () => {
    cy.get('[data-testid="username"]').type('wrong_user')
    cy.get('[data-testid="password"]').type('wrong_pass')
    cy.get('[data-testid="login-button"]').click()

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'do not match')
    cy.location('pathname').should('not.match', /products/)
  })


  it('blocks locked_out_user', () => {
    cy.get('[data-testid="username"]').type('locked_out_user')
    cy.get('[data-testid="password"]').type('secret_sauce')
    cy.get('[data-testid="login-button"]').click()

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'locked out')
  })
})

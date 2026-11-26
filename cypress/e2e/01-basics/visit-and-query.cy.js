/**
 * MODULE 01 — Basics
 * Skills: cy.visit, cy.get, cy.contains, should, data-testid selectors
 *
 * Goal: Learn how Cypress finds elements and makes simple assertions.
 */

describe('01 Basics — Visit & Query', () => {
  it('opens the login page and shows the ShopQA brand', () => {
    cy.visit('/')
    cy.title().should('include', 'ShopQA')
    cy.contains('Sign in to shop').should('be.visible')
    cy.get('[data-testid="login-page"]').should('exist')
  })

  it('finds form fields with data-testid (best practice selector)', () => {
    cy.visit('/')
    cy.get('[data-testid="username"]').should('be.visible')
    cy.get('[data-testid="password"]').should('be.visible')
    cy.get('[data-testid="login-button"]').should('contain', 'Login')
  })

  it('shows demo account hints', () => {
    cy.visit('/')
    cy.get('[data-testid="login-hint"]').within(() => {
      cy.contains('standard_user')
      cy.contains('secret_sauce')
    })
  })
})

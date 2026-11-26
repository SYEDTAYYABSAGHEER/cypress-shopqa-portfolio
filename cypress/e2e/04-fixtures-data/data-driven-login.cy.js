/**
 * MODULE 04 — Fixtures & Data-driven tests
 * Skills: cy.fixture, Object.entries loops, keeping test data out of specs
 */

describe('04 Fixtures — Data-driven login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads user data from a fixture file', () => {
    cy.fixture('users').then((users) => {
      expect(users.valid.username).to.eq('standard_user')
      cy.get('[data-testid="username"]').type(users.valid.username)
      cy.get('[data-testid="password"]').type(users.valid.password)
      cy.get('[data-testid="login-button"]').click()
      cy.location('pathname').should('match', /products/)

    })
  })

  it('covers negative login cases from fixture data', () => {
    cy.fixture('users').then((users) => {
      const negatives = [
        { ...users.invalid, expect: 'do not match' },
        { ...users.locked, expect: 'locked out' },
      ]

      negatives.forEach((user) => {
        cy.visit('/')
        cy.get('[data-testid="username"]').clear().type(user.username)
        cy.get('[data-testid="password"]').clear().type(user.password)
        cy.get('[data-testid="login-button"]').click()
        cy.get('[data-testid="error-message"]').should('contain', user.expect)
      })
    })
  })
})

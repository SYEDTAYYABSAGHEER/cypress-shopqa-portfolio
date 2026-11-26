/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Session-aware login used across the suite.
     */
    login(username: string, password: string): Chainable<void>

    /**
     * Full UI login without cy.session (useful when testing the login page itself).
     */
    loginUI(username: string, password: string): Chainable<void>

    /**
     * Clicks Add to cart for a product id on the products page.
     */
    addProductToCart(productId: string): Chainable<void>

    /**
     * Shortcut for [data-testid="..."] selectors.
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>

    /**
     * Seeds localStorage cart for faster test setup.
     */
    seedCart(
      items: Array<{ id: string; name: string; price: number; qty: number }>
    ): Chainable<void>
  }
}

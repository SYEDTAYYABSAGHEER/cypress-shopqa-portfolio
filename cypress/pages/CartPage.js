class CartPage {
  visit() {
    cy.visit('/cart.html')
  }

  get items() {
    return cy.getByTestId('cart-items')
  }

  get emptyState() {
    return cy.getByTestId('cart-empty')
  }

  get subtotal() {
    return cy.getByTestId('cart-subtotal')
  }

  get checkoutButton() {
    return cy.getByTestId('checkout-button')
  }

  removeItem(id) {
    cy.get(`[data-testid="cart-item-${id}"]`)
      .find('[data-testid="remove-item"]')
      .click()
  }

  proceedToCheckout() {
    this.checkoutButton.click()
  }
}

export default new CartPage()

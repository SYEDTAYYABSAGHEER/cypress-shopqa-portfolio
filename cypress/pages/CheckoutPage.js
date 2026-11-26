class CheckoutPage {
  visit() {
    cy.visit('/checkout.html')
  }

  fillShipping({ firstName, lastName, postalCode }) {
    cy.getByTestId('first-name').clear().type(firstName)
    cy.getByTestId('last-name').clear().type(lastName)
    cy.getByTestId('postal-code').clear().type(postalCode)
  }

  continue() {
    cy.getByTestId('continue-checkout').click()
  }

  finish() {
    cy.getByTestId('finish-order').click()
  }

  get completeHeader() {
    return cy.getByTestId('complete-header')
  }

  get orderId() {
    return cy.getByTestId('order-id')
  }

  get error() {
    return cy.getByTestId('checkout-error')
  }
}

export default new CheckoutPage()

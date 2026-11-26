/**
 * MODULE 05 — Page Object Model (POM)
 * Skills: encapsulate selectors/actions in page classes; cleaner specs
 */

import LoginPage from '../../pages/LoginPage'
import ProductsPage from '../../pages/ProductsPage'
import CartPage from '../../pages/CartPage'
import CheckoutPage from '../../pages/CheckoutPage'

describe('05 Page Objects — Full purchase flow', () => {
  beforeEach(() => {
    cy.fixture('users').as('users')
    cy.fixture('checkout').as('checkout')
  })

  it('buys a product using Page Objects', function () {
    LoginPage.visit()
    LoginPage.login(this.users.valid.username, this.users.valid.password)

    ProductsPage.title.should('contain', 'Products')
    ProductsPage.addToCart('bike-light')
    ProductsPage.cartBadge.should('have.text', '1')
    ProductsPage.openCart()

    CartPage.items.should('contain', 'Bike Light')
    CartPage.subtotal.should('contain', '9.99')
    CartPage.proceedToCheckout()

    CheckoutPage.fillShipping(this.checkout.customer)
    CheckoutPage.continue()
    cy.getByTestId('order-overview').should('be.visible')
    CheckoutPage.finish()

    CheckoutPage.completeHeader.should('contain', 'Thank you')
    CheckoutPage.orderId.should('contain', 'Order ID:')
  })

  it('shows validation error when checkout fields are empty', function () {
    LoginPage.visit()
    LoginPage.login(this.users.valid.username, this.users.valid.password)
    ProductsPage.addToCart('onesie')
    ProductsPage.openCart()
    CartPage.proceedToCheckout()

    CheckoutPage.continue()
    CheckoutPage.error.should('be.visible').and('contain', 'required')
  })
})

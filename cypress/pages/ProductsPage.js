class ProductsPage {
  visit() {
    cy.visit('/products.html')
  }

  get title() {
    return cy.getByTestId('products-title')
  }

  get grid() {
    return cy.getByTestId('product-grid')
  }

  get sortSelect() {
    return cy.getByTestId('sort-select')
  }

  get cartBadge() {
    return cy.getByTestId('cart-badge')
  }

  productCard(id) {
    return cy.get(`[data-product-id="${id}"]`)
  }

  addToCart(id) {
    this.productCard(id).find('[data-testid="add-to-cart"]').click()
  }

  sortBy(value) {
    this.sortSelect.select(value)
  }

  openCart() {
    cy.getByTestId('cart-link').click()
  }
}

export default new ProductsPage()

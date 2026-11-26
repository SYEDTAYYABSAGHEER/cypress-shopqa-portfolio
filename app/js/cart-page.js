document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return
  Auth.bindChrome()
  Cart.updateBadge()

  const list = document.querySelector('[data-testid="cart-items"]')
  const empty = document.querySelector('[data-testid="cart-empty"]')
  const summary = document.querySelector('[data-testid="cart-summary"]')
  const subtotal = document.querySelector('[data-testid="cart-subtotal"]')

  function render() {
    const items = Cart.get()
    list.innerHTML = ''

    if (!items.length) {
      empty.hidden = false
      summary.hidden = true
      return
    }

    empty.hidden = true
    summary.hidden = false
    subtotal.textContent = Cart.formatMoney(Cart.subtotal())

    items.forEach((item) => {
      const li = document.createElement('li')
      li.className = 'cart-item'
      li.dataset.testid = `cart-item-${item.id}`
      li.innerHTML = `
        <div>
          <strong data-testid="cart-item-name">${item.name}</strong>
          <div data-testid="cart-item-meta">${item.qty} × ${Cart.formatMoney(item.price)}</div>
        </div>
        <button
          type="button"
          class="btn ghost small"
          data-testid="remove-item"
          data-product-id="${item.id}"
        >
          Remove
        </button>
      `
      li.querySelector('[data-testid="remove-item"]').addEventListener('click', () => {
        Cart.remove(item.id)
        render()
        Cart.updateBadge()
      })
      list.appendChild(li)
    })
  }

  render()
})

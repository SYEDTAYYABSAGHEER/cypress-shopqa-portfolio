document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return
  Auth.bindChrome()
  Cart.updateBadge()

  const form = document.querySelector('[data-testid="checkout-form"]')
  const error = document.querySelector('[data-testid="checkout-error"]')
  const overview = document.querySelector('[data-testid="order-overview"]')
  const overviewItems = document.querySelector('[data-testid="overview-items"]')
  const orderTotal = document.querySelector('[data-testid="order-total"]')
  const complete = document.querySelector('[data-testid="order-complete"]')
  const orderId = document.querySelector('[data-testid="order-id"]')
  const finish = document.querySelector('[data-testid="finish-order"]')

  if (!Cart.get().length) {
    window.location.href = 'cart.html'
    return
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const first = document.querySelector('[data-testid="first-name"]').value.trim()
    const last = document.querySelector('[data-testid="last-name"]').value.trim()
    const postal = document.querySelector('[data-testid="postal-code"]').value.trim()

    if (!first || !last || !postal) {
      error.hidden = false
      error.textContent = 'All checkout fields are required'
      return
    }

    error.hidden = true
    form.hidden = true
    overview.hidden = false

    overviewItems.innerHTML = ''
    Cart.get().forEach((item) => {
      const li = document.createElement('li')
      li.textContent = `${item.name} × ${item.qty} — ${Cart.formatMoney(item.price * item.qty)}`
      overviewItems.appendChild(li)
    })
    orderTotal.textContent = Cart.formatMoney(Cart.subtotal())
  })

  finish.addEventListener('click', async () => {
    const payload = {
      user: Auth.currentUser(),
      items: Cart.get(),
      total: Cart.subtotal(),
    }

    // Demo "API" — Cypress can intercept this fetch
    let responseId = `ORD-${Date.now()}`
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.id) responseId = data.id
      }
    } catch {
      // Static host has no API; local fallback is fine
    }

    Cart.clear()
    Cart.updateBadge()
    overview.hidden = true
    complete.hidden = false
    orderId.textContent = `Order ID: ${responseId}`
  })
})

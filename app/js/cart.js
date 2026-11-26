const Cart = {
  key: 'shopqa_cart',

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '[]')
    } catch {
      return []
    }
  },

  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items))
    this.updateBadge()
  },

  add(product) {
    const items = this.get()
    const existing = items.find((i) => i.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      items.push({ ...product, qty: 1 })
    }
    this.save(items)
  },

  remove(id) {
    this.save(this.get().filter((i) => i.id !== id))
  },

  clear() {
    this.save([])
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0)
  },

  subtotal() {
    return this.get().reduce((sum, i) => sum + i.price * i.qty, 0)
  },

  updateBadge() {
    const badge = document.querySelector('[data-testid="cart-badge"]')
    if (badge) badge.textContent = String(this.count())
  },

  formatMoney(n) {
    return `$${n.toFixed(2)}`
  },
}

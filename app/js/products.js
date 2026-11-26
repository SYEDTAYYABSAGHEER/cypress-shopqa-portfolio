document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAuth()) return
  Auth.bindChrome()
  Cart.updateBadge()

  const loading = document.querySelector('[data-testid="loading"]')
  const grid = document.querySelector('[data-testid="product-grid"]')
  const empty = document.querySelector('[data-testid="empty-state"]')
  const sort = document.querySelector('[data-testid="sort-select"]')

  let products = []

  try {
    const res = await fetch('data/products.json')
    if (!res.ok) throw new Error('Failed to load products')
    products = await res.json()
  } catch (err) {
    loading.textContent = 'Could not load products.'
    return
  }

  loading.hidden = true

  function sortProducts(list, mode) {
    const copy = [...list]
    switch (mode) {
      case 'name-desc':
        return copy.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return copy.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return copy.sort((a, b) => b.price - a.price)
      default:
        return copy.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  function render() {
    const sorted = sortProducts(products, sort.value)
    grid.innerHTML = ''

    if (!sorted.length) {
      grid.hidden = true
      empty.hidden = false
      return
    }

    empty.hidden = true
    grid.hidden = false

    sorted.forEach((product) => {
      const card = document.createElement('article')
      card.className = 'product-card'
      card.dataset.testid = `product-${product.id}`
      card.setAttribute('data-product-id', product.id)

      card.innerHTML = `
        <h3 data-testid="product-name">${product.name}</h3>
        <p class="price" data-testid="product-price">${Cart.formatMoney(product.price)}</p>
        <p class="desc" data-testid="product-desc">${product.description}</p>
        <button
          type="button"
          class="btn primary small"
          data-testid="add-to-cart"
          data-product-id="${product.id}"
        >
          Add to cart
        </button>
      `

      card.querySelector('[data-testid="add-to-cart"]').addEventListener('click', () => {
        Cart.add(product)
      })

      grid.appendChild(card)
    })
  }

  sort.addEventListener('change', render)
  render()
})

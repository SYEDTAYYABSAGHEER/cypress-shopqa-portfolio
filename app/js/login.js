document.addEventListener('DOMContentLoaded', () => {
  if (Auth.currentUser()) {
    window.location.href = 'products.html'
    return
  }

  const form = document.querySelector('[data-testid="login-form"]')
  const error = document.querySelector('[data-testid="error-message"]')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = document.querySelector('[data-testid="username"]').value.trim()
    const password = document.querySelector('[data-testid="password"]').value

    if (!username || !password) {
      error.hidden = false
      error.textContent = 'Username and password are required'
      return
    }

    const result = Auth.login(username, password)
    if (!result.ok) {
      error.hidden = false
      error.textContent = result.error
      return
    }

    window.location.href = 'products.html'
  })
})

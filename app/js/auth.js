const Auth = {
  USERS: {
    standard_user: { password: 'secret_sauce', locked: false },
    locked_out_user: { password: 'secret_sauce', locked: true },
    problem_user: { password: 'secret_sauce', locked: false },
  },

  login(username, password) {
    const user = this.USERS[username]
    if (!user || user.password !== password) {
      return { ok: false, error: 'Username and password do not match any user in this service' }
    }
    if (user.locked) {
      return { ok: false, error: 'Sorry, this user has been locked out.' }
    }
    localStorage.setItem('shopqa_user', username)
    return { ok: true }
  },

  logout() {
    localStorage.removeItem('shopqa_user')
    localStorage.removeItem('shopqa_cart')
    window.location.href = 'index.html'
  },

  currentUser() {
    return localStorage.getItem('shopqa_user')
  },

  requireAuth() {
    if (!this.currentUser()) {
      window.location.href = 'index.html'
      return false
    }
    return true
  },

  bindChrome() {
    const greeting = document.querySelector('[data-testid="user-greeting"]')
    const logout = document.querySelector('[data-testid="logout-button"]')
    const user = this.currentUser()
    if (greeting && user) {
      greeting.textContent = `Hi, ${user}`
    }
    if (logout) {
      logout.addEventListener('click', () => this.logout())
    }
  },
}

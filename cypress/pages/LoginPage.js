class LoginPage {
  visit() {
    cy.visit('/')
  }

  get username() {
    return cy.getByTestId('username')
  }

  get password() {
    return cy.getByTestId('password')
  }

  get loginButton() {
    return cy.getByTestId('login-button')
  }

  get errorMessage() {
    return cy.getByTestId('error-message')
  }

  login(username, password) {
    this.username.clear().type(username)
    this.password.clear().type(password, { log: false })
    this.loginButton.click()
  }

  assertError(text) {
    this.errorMessage.should('be.visible').and('contain', text)
  }
}

export default new LoginPage()

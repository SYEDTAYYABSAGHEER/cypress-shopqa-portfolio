const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // Node event hooks live here (advanced: tasks, plugins)
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        resetStore() {
          // Placeholder for advanced DB reset patterns
          return null
        },
      })
      return config
    },
  },
  env: {
    validUser: 'standard_user',
    validPassword: 'secret_sauce',
    lockedUser: 'locked_out_user',
  },
})

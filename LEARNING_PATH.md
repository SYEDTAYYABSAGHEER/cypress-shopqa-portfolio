# Cypress Learning Path (ShopQA)

Work through the modules in order. Each folder under `cypress/e2e/` teaches one skill set.

| Module | Folder | What you learn | Practice prompt |
|--------|--------|----------------|-----------------|
| 01 | `01-basics` | `cy.visit`, `cy.get`, `cy.contains`, assertions | Add a test that checks the Login button text |
| 02 | `02-interactions` | `type`, `click`, happy + negative login | Add a test for missing password only |
| 03 | `03-assertions` | chains, length, sorting checks | Assert sort Z–A by product name |
| 04 | `04-fixtures-data` | `cy.fixture`, data-driven tests | Add a third fixture user and cover it |
| 05 | `05-page-objects` | Page Object Model | Create a `Header` page object for logout |
| 06 | `06-api-intercept` | `cy.intercept`, stubs, `cy.wait` | Stub products with a 500 and assert UI error |
| 07 | `07-custom-commands` | reusable commands + `cy.session` | Add `cy.logout()` custom command |
| 08 | `08-auth-sessions` | sessions, protected routes, logout | Assert cart badge resets after logout |
| 09 | `09-advanced` | viewports, `cy.task`, smoke E2E | Add a tablet viewport cart test |

## How to practice each day

1. Read the file header comments in that module.
2. Run only that module:
   ```bash
   npx start-server-and-test start http://localhost:3000 \
     "cypress run --spec 'cypress/e2e/01-basics/**/*.cy.js'"
   ```
   Or open the interactive runner: `npm run test:open`
3. Break a selector on purpose, watch Cypress fail, then fix it.
4. Complete the **Practice prompt** before moving on.

## Concepts recruiters look for

- Stable selectors (`data-testid`) instead of brittle CSS/XPath
- Page Object Model or app actions
- Network stubbing with `cy.intercept`
- Fixtures / data-driven tests
- Custom commands and `cy.session`
- CI pipeline (see `.github/workflows/cypress.yml`)
- Clear README and green GitHub Actions badge

## Stretch goals (after module 09)

1. Add API tests with `cy.request` against a public API (JSONPlaceholder).
2. Add accessibility checks with [`cypress-axe`](https://github.com/component-driven/cypress-axe).
3. Split smoke vs regression tags using `grep` plugin.
4. Convert one suite to TypeScript.
5. Add a second environment via `cypress.env.json` (staging vs local).

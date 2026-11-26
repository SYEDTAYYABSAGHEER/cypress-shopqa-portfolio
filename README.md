# ShopQA — Cypress E2E Portfolio Project

Hands-on Cypress training project (basic → advanced) built around a demo e-commerce app. Designed to learn automation **by writing real tests** and to showcase QA skills on GitHub.

![Cypress](https://img.shields.io/badge/Cypress-E2E-17202C?logo=cypress&logoColor=white)
![Node](https://img.shields.io/badge/Node-20+-339933?logo=node.js&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

## What this repo demonstrates

| Skill | Where |
|-------|--------|
| Core Cypress commands & assertions | `cypress/e2e/01–03` |
| Fixtures & data-driven tests | `cypress/e2e/04-fixtures-data` |
| Page Object Model | `cypress/pages` + `e2e/05` |
| Network intercept / API stubbing | `cypress/e2e/06-api-intercept` |
| Custom commands & `cy.session` | `cypress/support/commands.js` |
| Auth, logout, protected routes | `cypress/e2e/08-auth-sessions` |
| Viewport + `cy.task` + smoke E2E | `cypress/e2e/09-advanced` |
| CI pipeline | `.github/workflows/cypress.yml` |

App under test: **ShopQA** (`/app`) — login, product catalog, cart, checkout.

## Quick start

```bash
# 1. Install
npm install

# 2. Interactive learning (recommended)
npm run test:open

# 3. Headless run (CI-style)
npm test
```

`npm test` starts the ShopQA app on [http://localhost:3000](http://localhost:3000) and runs the full Cypress suite.

### Demo logins

| Username | Password | Behavior |
|----------|----------|----------|
| `standard_user` | `secret_sauce` | Happy path |
| `locked_out_user` | `secret_sauce` | Locked-out error |
| `problem_user` | `secret_sauce` | Valid login |

## Learning path

Follow modules in order — details and practice prompts live in [LEARNING_PATH.md](./LEARNING_PATH.md).

```
01 Basics → 02 Interactions → 03 Assertions → 04 Fixtures
→ 05 Page Objects → 06 Intercepts → 07 Custom Commands
→ 08 Sessions → 09 Advanced
```

Run a single module:

```bash
npx start-server-and-test start http://localhost:3000 \
  "cypress run --spec 'cypress/e2e/02-interactions/**/*.cy.js'"
```

## Project structure

```
app/                      # Demo store (HTML/CSS/JS)
cypress/
  e2e/                    # Progressive test modules 01–09
  fixtures/               # Test data (users, products, checkout)
  pages/                  # Page Object Model
  support/                # Commands + global hooks
cypress.config.js
.github/workflows/        # CI
```

## Why this helps with QA interviews

- Real shopping flows (login → cart → checkout), not toy `cy.visit` demos
- Patterns employers ask about: POM, intercepts, fixtures, custom commands, sessions
- CI-ready with artifacts (screenshots/videos on failure)
- Stable `data-testid` selectors — a best practice you can discuss in interviews

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial ShopQA Cypress portfolio project"
git branch -M main
git remote add origin https://github.com/<your-username>/cypress-shopqa-portfolio.git
git push -u origin main
```

After the first push, GitHub Actions will run Cypress on every push/PR. Add the workflow badge to this README once CI is green.

## Interview talking points

1. **Selector strategy** — prefer `data-testid` over CSS/XPath for stability.
2. **POM vs custom commands** — pages hold UI structure; commands hold reusable workflows.
3. **Network control** — stub APIs to test edge cases (empty list, mocked order id) without a backend.
4. **`cy.session`** — cache auth to keep large suites fast.
5. **CI** — headless Chrome/Electron, upload failure artifacts, fail the PR if tests fail.

## License

MIT — use this repo freely in your portfolio and interviews.

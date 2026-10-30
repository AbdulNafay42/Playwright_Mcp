# Playwright MCP – Abdul Nafay Portfolio Tests

End-to-end tests for the homepage of <https://abdulnafay.vercel.app/>, planned and generated with Playwright's AI agents (planner, generator, healer) over the Playwright MCP server.

## Structure

| Path | Purpose |
| --- | --- |
| `specs/abdulnafay-homepage.plan.md` | Test plan: scenarios, steps, expected results and target spec file names |
| `tests/homepage/*.spec.ts` | One spec per plan item (load, hero, about, skills, projects, blog, navigation, responsive, a11y, ...) |
| `seed.spec.ts` | Seed test the generator agent starts from |
| `.claude/agents/` | Planner, generator and healer agent definitions |
| `.mcp.json` | Playwright MCP server configuration |
| `playwright.config.ts` | Playwright configuration |

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
# everything
npx playwright test tests/homepage

# a single file
npx playwright test tests/homepage/blog.spec.ts

# fewer parallel workers (the tests hit a live site, so 2 is more stable)
npx playwright test tests/homepage --workers=2

# list tests without running
npx playwright test tests/homepage --list
```

### Reports

```bash
npx playwright test tests/homepage --reporter=html
npx playwright show-report
```

Failure details are written to `test-results/`.

## Workflow

1. **Plan** – the planner agent explores the live site and writes `specs/*.plan.md`.
2. **Generate** – the generator agent turns each scenario into a spec under `tests/`.
3. **Heal** – the healer agent runs failing tests and fixes selectors or timing.

## Manual testing with the Playwright MCP server (SauceDemo example)

Done with the prompt in `.github/prompts/playwright-manual-test-report.md`.

1. **Explore and test manually** – give the prompt a URL and scenario (e.g. "Navigate to saucedemo.com and test the most critical user workflows"). The agent drives a real browser through the Playwright MCP server, takes snapshots and screenshots, and closes the browser when done.
   - Note: the MCP server must be set up first (`planner_setup_page`) before it will navigate.
2. **Report** – findings go to `manual-tests/saucedemo-critical-workflows.md`, with screenshots in `manual-tests/screenshots/`.
3. **Test cases** – the report is turned into natural-language test cases in `manual-tests/saucedemo-test-cases.md` (✅ executed, ⬜ proposed), with test data and traceability back to the report.
4. **Test plan and automation (next)** – feed the test cases to the planner agent to create `specs/*.plan.md`, then to the generator agent to create specs under `tests/`, and use the healer agent for failures (see Workflow above).

`.playwright-mcp/` (raw snapshots and console logs) is git-ignored.

## Notes

- Tests run against the live production site, so occasional timeouts can happen under heavy parallelism.
- The cross-browser test needs Firefox and WebKit (`npx playwright install firefox webkit`).
- Zoom and slow-network tests are approximations (narrow viewport / CDP throttling).

---
name: git-workflow
description: Version control standards, Git workflows, Conventional Commits, and Pull Request guidelines for Mauricio's projects.
---

# Git Workflow & Version Control Guidelines

This document outlines the standard Git workflow, branch management, and code review processes. **AI Agents MUST strictly adhere to these rules when committing code, creating branches, or opening Pull Requests.**

## 0. Initial Project Bootstrap (First Time Setup)

When starting a new project for Mauricio that does not yet exist locally or on GitHub:

1. **Step 1: Workspace Check**: Confirm if the project directory already exists.
2. **Step 2: Repository Creation**: If starting from scratch, the AI Agent must ask for the repository name and use the GitHub MCP server to create it on Mauricio's account.
3. **Step 3: Default Initialization**: Initialize the repo with a single `README.md` containing: `# [Project Name] - Tracked by Antigravity`.
4. **Step 4: Local Setup**: Ask if the repo should be cloned into `c:\Users\maual\Downloads` (User's preference). Execute `git clone` to start the local development.

## 1. Branch Management

Branches must be named descriptively, following a consistent prefix standard based on the work being done.

- **`main` or `master`**: The production branch. Direct commits are forbidden. All code must enter via Pull Requests.
- **`develop`** (Optional): The pre-production integration branch (if using GitFlow).

**Branch Name Formats:**
- `feat/some-new-feature` - For new components, pages, or entire features.
- `fix/login-button-crash` - For bug fixes and patches.
- `refactor/header-components` - For structural code changes.
- `docs/update-readme` - For documentation-only changes.
- `test/unit-tests-user-service` - For adding or correcting tests.
- `chore/update-deps` - For routine tasks or dependency bumps.

**Monorepo Scopes (Recommended):**
- `feat(frontend): ...`
- `fix(backend): ...`
- `chore(root): ...`
- `feat(api): ...`
- `style(ui): ...`

## 2. Conventional Commits

All commit messages MUST follow the **Conventional Commits** specification. **STRICT RULE**: All commit types, scopes, and descriptions MUST be in English. This allows for automated changelog generation and easier semantic versioning understanding.

**Format:**
`<type>[optional scope]: <description>`

**Types:**
- `feat:` A new feature.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `perf:` A code change that improves performance.
- `test:` Adding missing tests or correcting existing tests.
- `build:` Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- `ci:` Changes to CI configuration files and scripts.
- `chore:` Other changes that don't modify src or test files.

**Example Commits:**
> `feat(auth): add google oauth provider integration`
> `fix(ui): resolve overflow issue on mobile navbar`
> `refactor: extract validation logic to shared hook`

## 3. Pull Request Guidelines

When an AI Agent or Developer opens a Pull Request to merge into the main/integration branch, they must ensure the following:

**STRICT RULE**: All Pull Request titles and descriptions MUST be in English.

### PR Golden Rules:
1. **Scope Limit**: A PR should ideally do ONE thing perfectly. Do not mix refactoring changes with new feature additions in the same PR.
2. **Self-Review**: The author (or Agent) must run all tests (`npm run test`) and linters (`npm run lint`) before opening the PR.
3. **Draft Mode**: Open PRs in Draft state if the work is incomplete or still undergoing CI validation.
4. **Squash and Merge Strategy**: To keep the `main` timeline clean and readable, always use "Squash and Merge" when merging a PR. This condenses all WIP (Work In Progress) commits of the feature branch into a single semantic commit on the main branch.
5. **VQA (Visual Quality Assurance)**: For any UI/Frontend change, the agent MUST attach a screenshot or recording demonstrating the feature in a working state within the PR body.
6. **PR Consolidation**: If a PR is merged while the agent still has pending local changes (e.g., bug fixes discovered during late testing), the agent MUST create a new specific branch (e.g., `fix/follow-up-name`), consolidate ALL local modified files into it, and open a new PR immediately.

### Recommended PR Template format:
When writing the description of a Pull Request, use the following structure:

```markdown
## 🎯 Description
A clear and concise description of what the PR does. 

## 🔄 Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change additions)
- [ ] Breaking change (fix or feature affecting existing functionality)
- [ ] Refactor/Chore

## ✅ Validation / Testing Done
- [ ] Unit/Integration tests added or updated
- [ ] Passed `npm run test`
- [ ] Passed `npm run lint`

## 📷 Screenshots (if UI change)
[Add screenshots here]
```

## 4. AI Agent Automated Workflow for Commits and PRs

When the user requests to "commit", "save changes", or "open a PR", the AI agent MUST execute the following fully automated sequence:

1. **Pre-flight Check**: Run `git status` to ensure the working directory is what you expect. If in a **Monorepo**, identify if changes are in `frontend/`, `backend/`, or both to use the correct scope.
2. **Sync**: Run `git pull --rebase origin main` (or the target branch). If a conflict occurs, **STOP** and ask the user for resolution.
3. **Self-Check**: Locate the nearest `package.json` (root or subfolder) and run `npm run lint` and `npm run test` before staging.
4. **Branch Check**: If on `main`/`master`, automatically create a new branch: `git checkout -b type/context-name`.
5. **Stage & Commit**: Group related files and use Conventional Commits.
6. **Push**: Run `git push -u origin <current-branch>` to set the upstream.
7. **PR Creation**: Open the PR using the GitHub MCP tool with the template from Section 3. Use Relative paths or GH-friendly embeds for screenshots.

*Note: The agent is authorized to handle this entire pipeline autonomously upon receiving the initial commit request.*

## 5. CI/CD Pipeline & Automated Quality Gates

To ensure code does not break the `main` or `develop` branches, the project MUST utilize a CI/CD pipeline (e.g., **GitHub Actions**).

When setting up or interacting with the repository, ensure the following Quality Gates are enforced via automation on every Pull Request:
1. **Linting & Formatting**: The pipeline must run `npm run lint` and `npm run format` to prevent stylistic or syntax errors.
2. **Type Checking**: The pipeline must confirm TypeScript validity by running `npm run type-check` (or `tsc --noEmit`).
3. **Automated Testing**: The pipeline must run the full test suite (`npm run test`). If any Unit or Integration test fails, the PR must be automatically blocked from merging.
4. **Branch Protection**: The `main` branch must be protected in GitHub repository settings. It must require:
    - At least 1 approving review.
    - Status checks (Lint, Type Check, and Tests) to pass before merging.
5. **No Bypassing**: AI Agents must respect the CI/CD pipeline results. If an automated test fails on a PR, the Agent must read the log, fix the issue in the branch, and push the new commit to re-trigger the pipeline.

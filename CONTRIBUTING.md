# Contributing Guidelines – upcoders-website

---

## 🧭 Branching Strategy

We use a simplified Git Flow model:

- `main` – production-ready, stable code
- `dev` – active development branch
- `feature/*` – individual features and tasks

### Branching Rules

- Do **not** commit directly to `main` or `dev`.
- Every new feature or fix should be implemented in a separate branch based on `dev`, named `feature/your-feature-name`.
- Pull Requests (PRs) must target the `dev` branch.
- Only maintainers are allowed to merge `dev` into `main` for releases.

---

## 🛠️ Workflow

1. **Create a feature branch**
   ```
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```
Keep commits clean and descriptive [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

`npm install` – install dependencies

`npm run dev` – start local dev server

`npm run build` – build for production

`npm run lint` – run linter


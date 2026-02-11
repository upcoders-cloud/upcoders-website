# Contributing

Thanks for contributing to `upcoders-website`.

## Source of truth

- Project setup, environment variables, routing, SEO and deployment notes are maintained in `README.md`.
- This file focuses only on contribution workflow and quality gates.

## Branching model

We use:
- `main` - production-ready releases
- `dev` - integration branch for ongoing work
- `feature/*`, `fix/*`, `chore/*` - working branches

Rules:
- Do not commit directly to `main` or `dev`.
- Create your branch from `dev`.
- Open PRs into `dev`.
- Merge `dev` -> `main` only for release.

## Suggested branch naming

- `feature/language-routes`
- `fix/contact-form-validation`
- `chore/update-readme`

## Commit style

Use clear commit messages.
Conventional Commits are recommended, e.g.:
- `feat: add language-aware router redirects`
- `fix: handle missing web3forms key`
- `docs: update deployment section`

## Pull request checklist

Before opening a PR:

1. Rebase or merge latest `dev` into your branch.
2. Run checks locally:

```bash
npm run lint
npm run build
```

3. Verify key user paths manually:
- `/en`
- `/pl`
- `/en/projects`
- `/pl/projects`
- contact form submit flow

4. If you touched routing/SEO, confirm:
- canonical/hreflang tags are correct,
- sitemap output is still valid.

5. If you touched env/config docs, update `README.md`.

## Security and secrets

- Never commit secrets to git.
- Keep real values in `.env` only.
- Keep placeholders only in `.env.example`.
- If a secret was leaked, rotate it immediately.

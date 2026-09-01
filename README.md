# upcoders-website

Marketing website for Upcoders built with React + Vite.
The app currently supports:
- language routes (`/en`, `/pl`),
- projects routes (`/:lang/projects`, `/:lang/projects/:slug`),
- per-route, per-language title, description, canonical, hreflang and Open Graph tags,
- static prerendering of every public route at build time,
- sitemap generation for language-specific URLs.

## Tech stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Router DOM 6
- React Hook Form
- ESLint + Prettier

## Requirements

- Node.js 20+
- npm 10+

## Quick start

1. Clone repository:

```bash
git clone https://github.com/upcoders-cloud/upcoders-website.git
cd upcoders-website
```

2. Install dependencies:

```bash
npm install
```

3. Create local env file from template:

```bash
cp .env.example .env
```

4. Set your Web3Forms key in `.env`:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_real_web3forms_key
```

5. Run dev server:

```bash
npm run dev
```

## Environment variables

### Why `.env.example` uses a placeholder

`.env.example` is a template file and is committed to git.
It must never contain real credentials.

Use it only to document required variables, for example:

```bash
VITE_WEB3FORMS_ACCESS_KEY=replace_with_your_web3forms_access_key
```

### Where real values go

Real values go to `.env` (local file, ignored by git).

Important notes:
- Do not commit `.env`.
- Do not put real keys in `.env.example`.
- If a key was ever committed or pushed, rotate/revoke it in provider settings.

## Web3Forms verification checklist

After setting `.env`:

1. Restart dev server (Vite loads env on startup):

```bash
npm run dev
```

2. Open contact section:
- `http://localhost:5173/en#contact`
- `http://localhost:5173/pl#contact`

3. Submit the form with valid data.

Expected result:
- success toast in UI,
- `POST https://api.web3forms.com/submit` in browser Network tab,
- response JSON with `success: true`.

Negative test:
- Remove `VITE_WEB3FORMS_ACCESS_KEY` from `.env`, restart server, submit form.
- App should show configuration error toast.

## Routing and i18n

Main routes:
- `/:lang` where `lang` is `en` or `pl`
- `/:lang/projects`
- `/:lang/projects/:slug`

Legacy redirects handled in app:
- `/` -> preferred language route (`/en` or `/pl`)
- `/projects` -> `/:lang/projects`
- `/projects/:slug` -> `/:lang/projects/:slug`

Language switcher:
- switches between `/en/...` and `/pl/...` on the same page,
- stores selected language in `localStorage`.

## SEO

Implemented:
- per-route title and meta description in both languages (`seo` key in the translation files),
- canonical URL and `hreflang` links (`en`, `pl`, `x-default`) per route,
- Open Graph and Twitter Cards per route,
- static prerendering of all public routes (`scripts/prerender.mjs`), so crawlers that do not run JavaScript get full HTML,
- sitemap generation for language routes.

`npm run build` = `vite build` + prerender. The prerender step needs the Chromium that ships with the `puppeteer` dev dependency.

Current sitemap URLs:
- `https://upcoders.cloud/en`
- `https://upcoders.cloud/pl`
- `https://upcoders.cloud/en/projects`
- `https://upcoders.cloud/pl/projects`

When adding new public routes, update sitemap config in `vite.config.js`.

## Deployment (SPA rewrites)

Because this app uses `BrowserRouter`, your hosting must rewrite unknown paths to `index.html`.
Without rewrite, direct open of `/en/projects` may return 404.

Examples:

### Vercel (`vercel.json`)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify (`_redirects`)

```txt
/* /index.html 200
```

### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Available scripts

- `npm run dev` - run local dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## High-level structure

- `src/router` - routing setup and language redirects
- `src/layouts` - shared app layout
- `src/pages` - route-level pages
- `src/i18n` - translations, i18n provider, routing helpers
- `src/seo` - per-route head tags (`Seo.jsx`)
- `scripts/prerender.mjs` - build-time prerendering of public routes
- `public/.htaccess` - production Apache config (redirects, prerender lookup, 404s)
- `src/components` - UI sections and reusable components

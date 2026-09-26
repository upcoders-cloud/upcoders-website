/**
 * Prerendering statyczny dla dist/.
 *
 * Po `vite build` serwer zwracał dla każdego adresu tę samą powłokę SPA:
 * pusty <div id="root"> i tytuł strony głównej. Roboty, które nie wykonują
 * JavaScriptu (Bing, LinkedIn, Slack, Messenger, większość narzędzi SEO),
 * nie widziały ani treści, ani prawidłowego canonical.
 *
 * Ten skrypt podnosi statyczny serwer na dist/, otwiera każdą trasę
 * w przeglądarce i zapisuje wyrenderowany DOM jako dist/<trasa>/index.html.
 *
 * Dlaczego przeglądarka, a nie renderowanie po stronie serwera:
 * aplikacja jest pełna kodu działającego wyłącznie w przeglądarce (animacje
 * na canvasie, pomiary przez ResizeObserver), a React 19
 * wynosi znaczniki head dopiero w trakcie renderu. Zrzut z prawdziwej
 * przeglądarki daje dokładnie ten DOM, który widzi użytkownik, bez
 * przebudowywania routingu pod SSR.
 */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')
const PORT = 4178

// Musi się zgadzać z SITEMAP_STATIC_ROUTES w vite.config.js.
const ROUTES = [
  '/en',
  '/pl',
  '/en/offer',
  '/pl/offer',
  '/en/projects',
  '/pl/projects',
  '/en/privacy',
  '/pl/privacy',
  '/en/projects/kaizen',
  '/pl/projects/kaizen',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
}

function createServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0])
    const candidate = path.join(DIST, path.normalize(urlPath))

    // Poza dist/ nie wychodzimy.
    const inside = candidate.startsWith(DIST)
    const isFile = inside && fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    const file = isFile ? candidate : path.join(DIST, 'index.html')

    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    res.end(fs.readFileSync(file))
  })
}

/** Przewija stronę do końca i z powrotem, żeby zwolnić animacje whileInView.
 *  Bez tego zrzut zawiera sekcje z inline style="opacity:0", czyli treść,
 *  której robot bez JavaScriptu w ogóle nie zobaczy. */
async function revealAll(page) {
  await page.evaluate(async () => {
    // Płynne przewijanie z index.css rozjechałoby się z czekaniem poniżej.
    const previousBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'

    const step = Math.round(window.innerHeight * 0.75)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 150))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 500))
    window.scrollTo(0, 0)
    await new Promise((resolve) => setTimeout(resolve, 300))

    document.documentElement.style.scrollBehavior = previousBehavior
  })
}

/** Czeka na zakończenie animacji elementów w głównej treści. */
async function waitForContentVisible(page) {
  await page.waitForFunction(() => window.__ucHiddenContent().length === 0, {
    timeout: 15000,
    polling: 250,
  })
}

/** Treść w <main>, która po animacjach nadal ma inline opacity < 1. Pomija
 *  elementy celowo ukryte (zamknięty akordeon, druga strona karty zespołu),
 *  czyli wszystko wewnątrz [inert], [aria-hidden] lub [hidden], oraz elementy
 *  bez tekstu, np. dekoracyjne piksele. */
function defineHiddenContentProbe() {
  window.__ucHiddenContent = () =>
    [...document.querySelectorAll('main [style*="opacity"]')].filter((node) => {
      if (node.style.opacity === '') return false
      const opacity = Number(node.style.opacity)
      if (!Number.isFinite(opacity) || opacity >= 0.999) return false
      if (node.closest('[inert], [aria-hidden="true"], [hidden]')) return false
      return node.textContent.trim().length > 0
    })
}

/** Czeka, aż animacja maszyny do pisania w hero dojedzie do ostatniego słowa. */
async function waitForHeadline(page) {
  await page.waitForFunction(
    () => {
      const heading = document.querySelector('h1')
      if (!heading) return false
      const full = heading.querySelector('.sr-only')?.textContent?.trim() ?? ''
      if (!full) return true
      const visible = heading
        .querySelector('[aria-hidden="true"]')
        ?.textContent?.replace(/\u00a0/g, ' ')
        .trim()
      const lastWord = full.split(' ').pop()
      return Boolean(visible && lastWord && visible.endsWith(lastWord))
    },
    { timeout: 20000 }
  )
}

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('Brak dist/index.html. Najpierw uruchom `vite build`.')
    process.exit(1)
  }

  const server = createServer()
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve))

  const bundledChrome = puppeteer.executablePath()
  const systemChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ??
    (!fs.existsSync(bundledChrome) && process.platform === 'darwin' ? systemChrome : bundledChrome)
  const browser = await puppeteer.launch({
    executablePath,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  })
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(defineHiddenContentProbe)
  await page.setViewport({ width: 1366, height: 900 })

  const rendered = new Map()

  try {
    for (const route of ROUTES) {
      process.stdout.write(`prerender ${route} ... `)
      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle0' })
      await waitForHeadline(page)
      await revealAll(page)
      await waitForContentVisible(page)

      // Fallbackowy <title> z index.html zostaje obok tego wstawionego
      // przez React, więc usuwamy go ze zrzutu.
      await page.evaluate(() => {
        const head = document.head
        if (head.querySelectorAll('title').length > 1) {
          head.querySelector('#uc-fallback-title')?.remove()
        }

        // Znaczniki wygenerowane przez React zostają w zrzucie dla robotów,
        // które nie wykonują JavaScriptu. Oznaczamy je, żeby main.jsx mógł je
        // usunąć przed startem aplikacji - inaczej po hydratacji w head byłyby
        // dwa canonicale i dwa opisy, a przy sprzecznych canonicalach Google
        // ignoruje oba.
        const managed = [
          'title',
          'meta[name="description"]',
          'meta[name="robots"]',
          'link[rel="canonical"]',
          'link[rel="alternate"]',
          'meta[property^="og:"]',
          'meta[name^="twitter:"]',
        ].join(',')

        head.querySelectorAll(managed).forEach((element) => {
          element.setAttribute('data-prerendered', '')
        })
      })

      const check = await page.evaluate(() => ({
        title: document.title,
        canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((link) => link.href),
        lang: document.documentElement.lang,
        h1Count: document.querySelectorAll('h1').length,
        hiddenMainCount: window.__ucHiddenContent().length,
        words: document.body.innerText.trim().split(/\s+/).length,
      }))

      const expectedLang = route.split('/')[1]
      if (
        !check.title.trim() ||
        check.canonical.length !== 1 ||
        check.lang !== expectedLang ||
        check.h1Count !== 1 ||
        check.hiddenMainCount !== 0
      ) {
        throw new Error(`nieprawidłowy zrzut ${route}: ${JSON.stringify(check)}`)
      }

      const html = await page.content()
      rendered.set(route, html)
      console.log(`ok (${check.lang}, ${check.words} słów, ${check.canonical[0]})`)
    }
  } finally {
    await browser.close()
    server.close()
  }

  for (const [route, html] of rendered) {
    const outDir = path.join(DIST, route.replace(/^\//, ''))
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')
  }

  console.log(`\nZapisano ${rendered.size} stron. dist/index.html zostaje jako fallback SPA.`)
}

main().catch((error) => {
  console.error('Prerendering nie powiódł się:', error.message)
  process.exit(1)
})

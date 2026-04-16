import { createRequire } from 'module'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const require = createRequire(import.meta.url)
const puppeteer = require('C:/Users/kajet/AppData/Roaming/npm/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, 'temporary screenshots')
mkdirSync(dir, { recursive: true })

const b = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})
const pg = await b.newPage()
await pg.setViewport({ width: 1440, height: 900 })
await pg.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
await pg.screenshot({ path: path.join(dir, 'screenshot-1.png') })
await pg.setViewport({ width: 390, height: 844 })
await pg.screenshot({ path: path.join(dir, 'screenshot-mobile-1.png') })
await b.close()
console.log('done')

import puppeteer from 'C:/Users/kajet/AppData/Roaming/npm/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, 'temporary screenshots')
mkdirSync(dir, { recursive: true })

const b = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const pg = await b.newPage()
await pg.setViewport({ width: 1440, height: 900 })
await pg.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
await pg.screenshot({ path: path.join(dir, 'screenshot-1.png') })
await pg.setViewport({ width: 390, height: 844 })
await pg.screenshot({ path: path.join(dir, 'screenshot-mobile-1.png') })
await b.close()
console.log('Screenshots saved.')

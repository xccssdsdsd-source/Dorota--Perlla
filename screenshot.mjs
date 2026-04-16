import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const url = process.argv[2] || 'http://localhost:3000'
const dir = path.join(__dirname, 'temporary screenshots')
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-')).length
const out = path.join(dir, `screenshot-${existing + 1}.png`)

execSync(`npx --yes puppeteer-core@21 screenshot --url "${url}" --output "${out}" --viewport 1440x900 2>/dev/null || node -e "
const p=require('puppeteer');(async()=>{const b=await p.launch({args:['--no-sandbox']});const pg=await b.newPage();await pg.setViewport({width:1440,height:900});await pg.goto('${url}',{waitUntil:'networkidle0'});await pg.screenshot({path:'${out.replace(/\\/g,'/')}',fullPage:false});await b.close();})()
"`, { stdio: 'inherit' })

console.log(out)

// Preview of the Shiny Dex hero (events / release countdown) for the scheduled Serebii check:
// screenshots of every slide and a short video, desktop and phone, in local mode (no sign-in).
// Usage: node scripts/preview-hero.cjs <repoDir> <outDir> [YYYY-MM-DD clock date]
const { chromium } = require('playwright'); const http = require('http'); const fs = require('fs'); const path = require('path');
const [repo, out, date] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/json' };
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/firebase-config.js') { r.setHeader('content-type', 'text/javascript'); return r.end('export const firebaseConfig = null, googleClientId = null, appCheckSiteKey = null, vapidKey = null;'); }
  let f = path.join(repo, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(repo, 'index.html'); r.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(r); }).listen(5199);
(async () => { const b = await chromium.launch();
  for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: name === 'phone' ? 2 : 1, colorScheme: 'dark', serviceWorkers: 'block', recordVideo: { dir: path.join(out, 'raw-' + name), size: vp } });
    const p = await ctx.newPage(); if (date) await p.clock.install({ time: new Date(date + 'T12:00:00Z') });
    await p.goto('http://localhost:5199/'); await p.evaluate(() => localStorage.setItem('shinycheck-v3-seen-update', UPDATES[0].id)); await p.reload(); await p.waitForTimeout(1500);
    await p.evaluate(() => { document.getElementById('gate').hidden = true; document.body.classList.remove('gated', 'locked'); document.querySelector('#regions [data-gen="0"]')?.click(); });
    await p.mouse.move(2, vp.height - 2); await p.waitForTimeout(1200);
    const hero = await p.$('#homeView .hero'); const n = Math.max(1, await p.$$eval('.ev-dots button', d => d.length));
    for (let i = 1; i <= n; i++) { if (n > 1) await p.click(`.ev-dots button:nth-child(${i})`); await p.waitForTimeout(1500); await hero.screenshot({ path: path.join(out, `${name}-${i}.png`) }); }
    if (n > 1) { await p.click('.ev-dots button:nth-child(1)'); await p.mouse.move(2, vp.height - 2); }
    await p.waitForTimeout(n > 1 ? 7200 * n + 800 : 4000); await ctx.close();
  }
  await b.close(); srv.close();
  for (const name of ['desktop', 'phone']) { const raw = fs.readdirSync(path.join(out, 'raw-' + name))[0];
    require('child_process').execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', '3.2', '-i', path.join(out, 'raw-' + name, raw), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '23', '-movflags', '+faststart', path.join(out, name + '.mp4')]); }
  console.log(fs.readdirSync(out).join(' ')); })();

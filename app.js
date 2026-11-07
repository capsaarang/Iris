'use strict';
/* Iris: a personal, ad-free news reader. Everything stays on this phone. */
const VERSION = '1.0.0';
const DEFAULT_RELAY = 'https://isai-relay.saarangharrypotter.workers.dev';

/* ---------- sources ---------- */
// region: world | india | usa | uk. topic: general (region news) or one of TOPICS. pw: paywalled site.
const SRC = [
  ['bbc-world', 'BBC World', 'world', 'general', 'https://feeds.bbci.co.uk/news/world/rss.xml'],
  ['aljazeera', 'Al Jazeera', 'world', 'general', 'https://www.aljazeera.com/xml/rss/all.xml'],
  ['guardian-world', 'The Guardian', 'world', 'general', 'https://www.theguardian.com/world/rss'],
  ['npr-world', 'NPR World', 'world', 'general', 'https://feeds.npr.org/1004/rss.xml'],
  ['dw', 'DW', 'world', 'general', 'https://rss.dw.com/rdf/rss-en-all'],
  ['france24', 'France 24', 'world', 'general', 'https://www.france24.com/en/rss'],
  ['npr', 'NPR', 'usa', 'general', 'https://feeds.npr.org/1001/rss.xml'],
  ['cbs', 'CBS News', 'usa', 'general', 'https://www.cbsnews.com/latest/rss/main'],
  ['abc', 'ABC News', 'usa', 'general', 'https://feeds.abcnews.com/abcnews/topstories'],
  ['pbs', 'PBS NewsHour', 'usa', 'general', 'https://www.pbs.org/newshour/feeds/rss/headlines'],
  ['nyt', 'New York Times', 'usa', 'general', 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', 1],
  ['hindu', 'The Hindu', 'india', 'general', 'https://www.thehindu.com/news/national/feeder/default.rss'],
  ['ie', 'Indian Express', 'india', 'general', 'https://indianexpress.com/section/india/feed/'],
  ['ht', 'Hindustan Times', 'india', 'general', 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml'],
  ['ndtv', 'NDTV', 'india', 'general', 'https://feeds.feedburner.com/ndtvnews-top-stories'],
  ['toi', 'Times of India', 'india', 'general', 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms'],
  ['bbc-uk', 'BBC UK', 'uk', 'general', 'https://feeds.bbci.co.uk/news/uk/rss.xml'],
  ['guardian-uk', 'Guardian UK', 'uk', 'general', 'https://www.theguardian.com/uk-news/rss'],
  ['sky', 'Sky News', 'uk', 'general', 'https://feeds.skynews.com/feeds/rss/uk.xml'],
  ['standard', 'Evening Standard', 'uk', 'general', 'https://www.standard.co.uk/news/london/rss'],
  ['independent', 'The Independent', 'uk', 'general', 'https://www.independent.co.uk/news/uk/rss'],

  ['cnbc', 'CNBC', 'usa', 'finance', 'https://www.cnbc.com/id/100003114/device/rss/rss.html'],
  ['cnbc-markets', 'CNBC Markets', 'usa', 'finance', 'https://www.cnbc.com/id/15839069/device/rss/rss.html'],
  ['marketwatch', 'MarketWatch', 'usa', 'finance', 'https://feeds.content.dowjones.io/public/rss/mw_topstories'],
  ['ft', 'Financial Times', 'world', 'finance', 'https://www.ft.com/rss/home', 1],
  ['et-markets', 'ET Markets', 'india', 'finance', 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms'],
  ['mint-markets', 'Mint Markets', 'india', 'finance', 'https://www.livemint.com/rss/markets'],
  ['guardian-biz', 'Guardian Business', 'uk', 'finance', 'https://www.theguardian.com/uk/business/rss'],

  ['pymnts', 'PYMNTS', 'usa', 'banking', 'https://www.pymnts.com/feed/'],
  ['finextra', 'Finextra', 'world', 'banking', 'https://www.finextra.com/rss/headlines.aspx'],
  ['fed', 'Federal Reserve', 'usa', 'banking', 'https://www.federalreserve.gov/feeds/press_all.xml'],
  ['et-bfsi', 'ET BFSI', 'india', 'banking', 'https://bfsi.economictimes.indiatimes.com/rss/topstories'],
  ['rbi', 'RBI', 'india', 'banking', 'https://www.rbi.org.in/pressreleases_rss.xml'],
  ['boe', 'Bank of England', 'uk', 'banking', 'https://www.bankofengland.co.uk/rss/news'],

  ['cnbc-econ', 'CNBC Economy', 'usa', 'economy', 'https://www.cnbc.com/id/20910258/device/rss/rss.html'],
  ['economist', 'The Economist', 'world', 'economy', 'https://www.economist.com/finance-and-economics/rss.xml', 1],
  ['mint-econ', 'Mint Economy', 'india', 'economy', 'https://www.livemint.com/rss/economy'],

  ['cnbc-biz', 'CNBC Business', 'usa', 'business', 'https://www.cnbc.com/id/10001147/device/rss/rss.html'],
  ['npr-biz', 'NPR Business', 'usa', 'business', 'https://feeds.npr.org/1006/rss.xml'],
  ['et', 'Economic Times', 'india', 'business', 'https://economictimes.indiatimes.com/rssfeedstopstories.cms'],
  ['bs', 'Business Standard', 'india', 'business', 'https://www.business-standard.com/rss/home_page_top_stories.rss'],
  ['bbc-biz', 'BBC Business', 'uk', 'business', 'https://feeds.bbci.co.uk/news/business/rss.xml'],

  ['tc-startups', 'TechCrunch Startups', 'usa', 'startups', 'https://techcrunch.com/category/startups/feed/'],
  ['sifted', 'Sifted', 'world', 'startups', 'https://sifted.eu/feed'],
  ['inc42', 'Inc42', 'india', 'startups', 'https://inc42.com/feed/'],
  ['yourstory', 'YourStory', 'india', 'startups', 'https://yourstory.com/feed'],

  ['cnbc-makeit', 'CNBC Make It', 'usa', 'careers', 'https://www.cnbc.com/id/44877279/device/rss/rss.html'],
  ['et-hr', 'ET HRWorld', 'india', 'careers', 'https://hr.economictimes.indiatimes.com/rss/topstories'],

  ['lenny', "Lenny's Newsletter", 'world', 'pm', 'https://www.lennysnewsletter.com/feed'],
  ['svpg', 'SVPG', 'world', 'pm', 'https://www.svpg.com/feed/'],
  ['producttalk', 'Product Talk', 'world', 'pm', 'https://www.producttalk.org/feed/'],

  ['atl', 'Above the Law', 'usa', 'law', 'https://abovethelaw.com/feed/'],
  ['scotusblog', 'SCOTUSblog', 'usa', 'law', 'https://www.scotusblog.com/feed/'],
  ['jurist', 'JURIST', 'world', 'law', 'https://www.jurist.org/news/feed/'],
  ['livelaw', 'LiveLaw', 'india', 'law', 'https://www.livelaw.in/category/top-stories/google_feeds.xml'],
  ['barbench', 'Bar & Bench', 'india', 'law', 'https://www.barandbench.com/feed'],

  ['verge', 'The Verge', 'usa', 'tech', 'https://www.theverge.com/rss/index.xml'],
  ['ars', 'Ars Technica', 'usa', 'tech', 'https://feeds.arstechnica.com/arstechnica/index'],
  ['techcrunch', 'TechCrunch', 'usa', 'tech', 'https://techcrunch.com/feed/'],
  ['wired', 'Wired', 'usa', 'tech', 'https://www.wired.com/feed/rss'],
  ['medianama', 'MediaNama', 'india', 'tech', 'https://www.medianama.com/feed/'],
  ['bbc-tech', 'BBC Tech', 'uk', 'tech', 'https://feeds.bbci.co.uk/news/technology/rss.xml'],

  ['tc-ai', 'TechCrunch AI', 'usa', 'ai', 'https://techcrunch.com/category/artificial-intelligence/feed/'],
  ['verge-ai', 'The Verge AI', 'usa', 'ai', 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'],
  ['mittr-ai', 'MIT Technology Review', 'usa', 'ai', 'https://www.technologyreview.com/topic/artificial-intelligence/feed'],
  ['openai', 'OpenAI News', 'world', 'ai', 'https://openai.com/news/rss.xml'],
  ['google-ai', 'Google AI', 'world', 'ai', 'https://blog.google/technology/ai/rss/'],

  ['nasa', 'NASA', 'usa', 'science', 'https://www.nasa.gov/news-release/feed/'],
  ['space', 'Space.com', 'usa', 'science', 'https://www.space.com/feeds/all'],
  ['sciencedaily', 'ScienceDaily', 'world', 'science', 'https://www.sciencedaily.com/rss/top/science.xml'],
  ['hindu-sci', 'The Hindu Sci-Tech', 'india', 'science', 'https://www.thehindu.com/sci-tech/feeder/default.rss'],
  ['bbc-sci', 'BBC Science', 'uk', 'science', 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'],

  ['politico', 'Politico', 'usa', 'politics', 'https://rss.politico.com/politics-news.xml'],
  ['thehill', 'The Hill', 'usa', 'politics', 'https://thehill.com/feed/'],
  ['npr-pol', 'NPR Politics', 'usa', 'politics', 'https://feeds.npr.org/1014/rss.xml'],
  ['ie-pol', 'Indian Express Politics', 'india', 'politics', 'https://indianexpress.com/section/political-pulse/feed/'],
  ['print-pol', 'ThePrint Politics', 'india', 'politics', 'https://theprint.in/category/politics/feed/'],
  ['bbc-pol', 'BBC Politics', 'uk', 'politics', 'https://feeds.bbci.co.uk/news/politics/rss.xml'],
  ['guardian-pol', 'Guardian Politics', 'uk', 'politics', 'https://www.theguardian.com/politics/rss'],

  ['defensenews', 'Defense News', 'usa', 'military', 'https://www.defensenews.com/arc/outboundfeeds/rss/'],
  ['breakingdefense', 'Breaking Defense', 'usa', 'military', 'https://breakingdefense.com/feed/'],
  ['militarytimes', 'Military Times', 'usa', 'military', 'https://www.militarytimes.com/arc/outboundfeeds/rss/'],
  ['warzone', 'The War Zone', 'usa', 'military', 'https://www.twz.com/feed'],
  ['print-def', 'ThePrint Defence', 'india', 'military', 'https://theprint.in/category/defence/feed/'],
  ['ukdj', 'UK Defence Journal', 'uk', 'military', 'https://ukdefencejournal.org.uk/feed/'],

  ['espn', 'ESPN', 'usa', 'sports', 'https://www.espn.com/espn/rss/news'],
  ['cricinfo', 'ESPNcricinfo', 'world', 'sports', 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml'],
  ['f1', 'Formula 1', 'world', 'sports', 'https://www.formula1.com/en/latest/all.xml'],
  ['sportstar', 'Sportstar', 'india', 'sports', 'https://sportstar.thehindu.com/feeder/default.rss'],
  ['bbc-sport', 'BBC Sport', 'uk', 'sports', 'https://feeds.bbci.co.uk/sport/rss.xml'],

  ['variety', 'Variety', 'usa', 'cinema', 'https://variety.com/feed/'],
  ['deadline', 'Deadline', 'usa', 'cinema', 'https://deadline.com/feed/'],
  ['hindu-movies', 'The Hindu Movies', 'india', 'cinema', 'https://www.thehindu.com/entertainment/movies/feeder/default.rss'],
  ['ie-tamil', 'Indian Express Tamil Cinema', 'india', 'cinema', 'https://indianexpress.com/section/entertainment/tamil/feed/'],
].map(([id, name, region, topic, url, pw]) => ({ id, name, region, topic, url, pw: !!pw }));
const SRC_BY_ID = Object.fromEntries(SRC.map(s => [s.id, s]));
const REGIONS = [['world', 'World'], ['india', 'India'], ['usa', 'USA'], ['uk', 'UK']];
const TOPICS = [['all', 'All'], ['finance', 'Finance'], ['banking', 'Banking & Fintech'], ['economy', 'Economy'], ['business', 'Business'], ['startups', 'Startups'], ['careers', 'Careers'], ['pm', 'Product management'], ['law', 'Law'], ['tech', 'Tech'], ['ai', 'AI'], ['science', 'Science & Space'], ['politics', 'Politics'], ['military', 'Military'], ['sports', 'Sports'], ['cinema', 'Cinema']];
const TOPIC_NAME = Object.fromEntries(TOPICS);

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (n, cls = '') => `<svg class="icon ${cls}"><use href="#i-${n}"/></svg>`;
const LS = {
  get(k, d) { try { const v = localStorage.getItem('iris-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('iris-' + k, JSON.stringify(v)); } catch { } },
};
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
function ago(t) {
  const m = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (m < 1) return 'Just now'; if (m < 60) return m + ' min ago';
  const h = Math.round(m / 60); if (h < 24) return h + ' hr ago';
  const d = Math.round(h / 24); return d === 1 ? 'Yesterday' : d + ' days ago';
}
let toastT;
function toast(msg, ms = 2400) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), ms); }

/* ---------- storage for stories (IndexedDB) ---------- */
const DB = {
  db: null,
  open() {
    return this.db || (this.db = new Promise((res, rej) => {
      const r = indexedDB.open('iris', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    }));
  },
  async get(k) { const d = await this.open(); return new Promise((res, rej) => { const r = d.transaction('kv').objectStore('kv').get(k); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
  async set(k, v) { const d = await this.open(); return new Promise((res, rej) => { const tx = d.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); },
};

/* ---------- state ---------- */
const S = {
  items: [], fetchedAt: 0, loading: false, done: 0, total: 0, failed: [],
  tab: 'home', region: LS.get('region', 'world'), topic: LS.get('topic', 'all'),
  off: new Set(LS.get('off', [])), muted: LS.get('muted', []), words: LS.get('words', []),
  saved: LS.get('saved', []), read: new Set(LS.get('read', [])),
  fs: LS.get('fs', 1), markets: LS.get('markets', true), relay: LS.get('relay', DEFAULT_RELAY),
  shown: 30, mk: null,
};
const saveRead = () => LS.set('read', [...S.read].slice(-1500));

/* ---------- fetching and reading feeds ---------- */
const MAX_PER_SOURCE = 40, KEEP_DAYS = 4;
async function fetchText(url) {
  const relay = (S.relay || DEFAULT_RELAY).replace(/\/+$/, '');
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
  try {
    const r = await fetch(relay + '/?url=' + encodeURIComponent(url), { signal: ctl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.text();
  } finally { clearTimeout(t); }
}
const htmlText = (() => { const d = document.implementation.createHTMLDocument(''); return h => { const el = d.createElement('div'); el.innerHTML = String(h || '').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ''); return (el.textContent || '').replace(/\s+/g, ' ').trim(); }; })();
function firstImg(h) { const m = String(h || '').match(/<img[^>]+src=["']([^"']+)["']/i); return m ? m[1] : ''; }
function kid(el, ...names) {
  for (const c of el.children) { const n = c.nodeName.toLowerCase(); if (names.includes(n) || names.includes(c.localName)) return c; }
  return null;
}
function kids(el, ...names) { return [...el.children].filter(c => names.includes(c.nodeName.toLowerCase())); }
function parseFeed(xml, src) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror') && !doc.querySelector('item,entry')) throw new Error('Not a feed');
  const nodes = [...doc.getElementsByTagName('item'), ...doc.getElementsByTagName('entry')].slice(0, MAX_PER_SOURCE);
  const now = Date.now(), out = [];
  for (const it of nodes) {
    const title = htmlText(kid(it, 'title')?.textContent);
    let link = '';
    const linkEls = kids(it, 'link');
    for (const l of linkEls) { const href = l.getAttribute('href'); if (href && (!l.getAttribute('rel') || l.getAttribute('rel') === 'alternate')) { link = href; break; } if (!href && l.textContent.trim()) { link = l.textContent.trim(); break; } }
    if (!link) { const g = kid(it, 'guid', 'id'); if (g && /^https?:/.test(g.textContent.trim())) link = g.textContent.trim(); }
    if (!title || !link) continue;
    const rawDesc = kid(it, 'description', 'summary', 'media:description')?.textContent || '';
    const full = kid(it, 'content:encoded', 'content')?.textContent || '';
    let desc = htmlText(rawDesc || full).replace(/The post .* appeared first on .*$/i, '').replace(/\s*Continue reading\.*\s*$/i, '').trim();
    if (desc.toLowerCase() === title.toLowerCase()) desc = '';
    if (desc.length > 420) desc = desc.slice(0, 400).replace(/\s+\S*$/, '') + '…';
    let img = '';
    for (const c of it.children) {
      const n = c.nodeName.toLowerCase();
      if ((n === 'media:content' || n === 'media:thumbnail') && c.getAttribute('url') && !/video|audio/.test(c.getAttribute('type') || c.getAttribute('medium') || '')) { img = c.getAttribute('url'); if (n === 'media:content') break; }
      if (n === 'enclosure' && /image/.test(c.getAttribute('type') || '') && c.getAttribute('url')) { img = img || c.getAttribute('url'); }
      if (n === 'media:group') { const m = c.querySelector('*'); if (m && m.getAttribute('url')) img = img || m.getAttribute('url'); }
    }
    if (!img) img = firstImg(full) || firstImg(rawDesc);
    if (img && img.startsWith('//')) img = 'https:' + img;
    const dEl = kid(it, 'pubdate', 'pubDate', 'published', 'updated', 'dc:date');
    let t = dEl ? Date.parse(dEl.textContent.trim()) : NaN;
    if (isNaN(t) || t > now + 3 * 3600e3) t = now - out.length * 60e3;
    const words = full ? htmlText(full).split(' ').length : 0;
    out.push({ id: hash(link), title, link, desc, img, t, src: src.id, mins: words >= 150 ? Math.max(1, Math.round(words / 230)) : 0 });
  }
  return out;
}
async function refresh(manual = false) {
  if (S.loading) return;
  if (!navigator.onLine) { if (manual) toast("You're offline. Showing stories saved on this phone."); return; }
  S.loading = true; S.done = 0; S.failed = [];
  const list = SRC.filter(s => !S.off.has(s.id)); S.total = list.length;
  renderSub();
  const fresh = []; let i = 0;
  const work = async () => {
    while (i < list.length) {
      const s = list[i++];
      try { fresh.push(...parseFeed(await fetchText(s.url), s)); } catch { S.failed.push(s.id); }
      S.done++; if (S.done % 8 === 0) renderSub();
    }
  };
  await Promise.all(Array.from({ length: 8 }, work));
  const cut = Date.now() - KEEP_DAYS * 864e5, byId = new Map();
  for (const it of S.items) if (it.t > cut) byId.set(it.id, it);
  for (const it of fresh) { const old = byId.get(it.id); byId.set(it.id, old ? Object.assign(old, it, { t: Math.min(old.t, it.t) }) : it); }
  S.items = [...byId.values()].sort((a, b) => b.t - a.t).slice(0, 4000);
  S.fetchedAt = Date.now(); S.loading = false;
  await DB.set('items', { items: S.items, at: S.fetchedAt }).catch(() => { });
  if (S.failed.length === list.length) toast("Couldn't reach the news sources. Check your internet, or the relay in Settings.", 4000);
  render(true);
}

/* ---------- filtering and grouping ---------- */
const STOP = new Set('the a an and or of to in on for at by with from as is are was were be been it its this that these those after before over under into about amid says say said new news live updates update latest how why what who when will would could can may might has have had not no yes than then more most just also up out off his her their them they he she we you our your i us vs via report reports'.split(' '));
const toks = s => [...new Set(String(s).toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)))];
function isMuted(it) {
  if (!S.muted.length) return false;
  const txt = (it.title + ' ' + it.desc).toLowerCase();
  return S.muted.some(w => wordRe(w).test(txt));
}
const reCache = new Map();
function wordRe(w) { if (!reCache.has(w)) reCache.set(w, new RegExp('(^|[^\\p{L}\\p{N}])' + w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^\\p{L}\\p{N}])', 'iu')); return reCache.get(w); }
function visible(region = S.region, topic = S.topic) {
  return S.items.filter(it => {
    const s = SRC_BY_ID[it.src]; if (!s || S.off.has(s.id)) return false;
    if (region !== 'world' && s.region !== region) return false;
    if (topic !== 'all' && s.topic !== topic) return false;
    return !isMuted(it);
  });
}
// Same story from several outlets: group by shared headline words, within 36 hours.
function group(items) {
  const groups = [], index = new Map();
  for (const it of items) {
    const tk = toks(it.title); if (!tk.length) { groups.push({ lead: it, also: [] }); continue; }
    const cand = new Map();
    for (const w of tk) for (const g of index.get(w) || []) cand.set(g, (cand.get(g) || 0) + 1);
    let best = null, bestScore = 0;
    for (const [g, shared] of cand) {
      if (shared < 3 || Math.abs(g.lead.t - it.t) > 36 * 3600e3) continue;
      if (g.lead.src === it.src || g.also.some(a => a.src === it.src)) continue;
      const score = shared / (g.tk.length + tk.length - shared);
      if (score >= 0.4 && score > bestScore) { best = g; bestScore = score; }
    }
    if (best) { best.also.push(it); if (!best.lead.img && it.img) best.img = it.img; continue; }
    const g = { lead: it, also: [], tk, img: it.img };
    groups.push(g); for (const w of tk) { if (!index.has(w)) index.set(w, []); index.get(w).push(g); }
  }
  return groups;
}

/* ---------- rendering ---------- */
const srcLine = (it, extra = '') => { const s = SRC_BY_ID[it.src] || { name: it.srcName || '' }; return `<div class="src"><b>${esc(s.name)}</b>${s.pw ? icon('lock', 'lk') : ''}<span class="dot"></span>${esc(ago(it.t))}${it.mins ? `<span class="dot"></span>${it.mins} min read` : ''}${extra}</div>`; };
const imgTag = u => u ? `<img src="${esc(u)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('hidden')">` : '';
function alsoLine(g) { if (!g.also.length) return ''; const names = [...new Set(g.also.map(a => SRC_BY_ID[a.src]?.name).filter(Boolean))]; return `<div class="also">Also covered by ${esc(names.slice(0, 3).join(', '))}${names.length > 3 ? ` and ${names.length - 3} more` : ''}</div>`; }
function tagsFor(it) {
  const s = SRC_BY_ID[it.src]; if (!s) return '';
  const t = []; if (S.topic === 'all' && s.topic !== 'general') t.push(TOPIC_NAME[s.topic]);
  if (S.region === 'world' && s.region !== 'world') t.push(REGIONS.find(r => r[0] === s.region)[1]);
  return t.length ? `<div class="tags">${t.map(x => `<span class="tag">${esc(x)}</span>`).join('')}</div>` : '';
}
function rowHTML(g, i, opts = {}) {
  const it = g.lead, img = g.img || it.img;
  return `<button class="row ${S.read.has(it.id) ? 'read' : ''}" data-a="open" data-i="${i}">
    <div class="t">${srcLine(it)}<div class="h">${esc(it.title)}</div>${opts.desc && it.desc ? `<div class="d">${esc(it.desc)}</div>` : ''}${alsoLine(g)}${opts.notags ? '' : tagsFor(it)}</div>
    ${img ? `<div class="thumb">${imgTag(img)}</div>` : ''}</button>`;
}
function leadHTML(g, i) {
  const it = g.lead;
  return `<button class="lead ${S.read.has(it.id) ? 'read' : ''}" data-a="open" data-i="${i}"><div class="img">${imgTag(g.img || it.img)}</div>
    <div class="body">${srcLine(it)}<div class="h">${esc(it.title)}</div>${alsoLine(g)}</div></button>`;
}
let current = []; // groups on screen, for taps and Listen
function renderSub() {
  const el = $('#subline'); if (!el) return;
  const d = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  el.innerHTML = S.loading ? `${esc(d)}<span class="dot"></span><span class="spin"></span> Updating ${S.done} of ${S.total}`
    : `${esc(d)}<span class="dot"></span><button data-a="refresh">${S.fetchedAt ? 'Updated ' + esc(ago(S.fetchedAt).toLowerCase()) : 'Tap to load'}</button>`;
}
function topHTML() {
  const dark = document.documentElement.dataset.theme !== 'light';
  return `<div class="top"><div class="logo"></div><div class="brand">Iris</div>
    <button class="iconbtn" data-a="search" aria-label="Search">${icon('search')}</button>
    <button class="iconbtn" data-a="theme" aria-label="${dark ? 'Switch to light' : 'Switch to dark'}">${icon(dark ? 'sun' : 'moon')}</button>
    <button class="iconbtn" data-a="settings" aria-label="Settings">${icon('gear')}</button></div>
    <div class="sub" id="subline"></div>`;
}
function marketsHTML() {
  if (!S.markets || !S.mk || !S.mk.length) return '';
  return `<div class="markets">${S.mk.map(m => `<div class="mk"><span class="n">${esc(m.name)}</span><b>${esc(m.price)}</b><span class="${m.chg >= 0 ? 'up' : 'down'}">${m.chg >= 0 ? '▲' : '▼'} ${Math.abs(m.chg).toFixed(2)}%</span></div>`).join('')}</div>`;
}
const Views = {};
Views.home = () => {
  let h = topHTML();
  h += `<div class="regions">${REGIONS.map(([k, l]) => `<button class="${S.region === k ? 'on' : ''}" data-a="region" data-k="${k}">${l}</button>`).join('')}</div>`;
  h += `<div class="chips" id="topics">${TOPICS.map(([k, l]) => `<button class="chip ${S.topic === k ? 'on' : ''}" data-a="topic" data-k="${k}">${esc(l)}</button>`).join('')}</div>`;
  h += marketsHTML();
  const items = visible();
  current = group(items);
  if (!S.items.length) return h + `<div class="feed">${S.loading || !S.fetchedAt ? '<div class="skel"></div>'.repeat(6) : `<div class="empty">${icon('news')}<h3>No stories yet</h3><p>Check your internet and try again.</p><br><button class="btn p" data-a="refresh">${icon('refresh', 'sm')} Try again</button></div>`}</div>`;
  if (!current.length) return h + `<div class="empty">${icon('news')}<h3>Nothing here right now</h3><p>No recent stories for ${esc(TOPIC_NAME[S.topic])} in ${esc(REGIONS.find(r => r[0] === S.region)[1])}. Try World or another topic.</p></div>`;
  const leadIdx = current.slice(0, 6).findIndex(g => g.img || g.lead.img);
  const order = leadIdx > 0 ? [current[leadIdx], ...current.slice(0, leadIdx), ...current.slice(leadIdx + 1)] : current;
  current = order;
  h += `<div class="feed" id="feed">${current.slice(0, S.shown).map((g, i) => i === 0 && (g.img || g.lead.img) ? leadHTML(g, i) : rowHTML(g, i)).join('')}</div>`;
  h += current.length > S.shown ? '<div class="more-sentinel" id="more"></div>' : `<div class="end">You're all caught up</div>`;
  h += `<button class="fab" data-a="listen-feed">${icon('play')}Listen</button>`;
  return h;
};
Views.following = () => {
  let h = `<div class="title">Following</div><div class="set"><div class="field"><input id="addword" placeholder="Add a word, like a company or person" autocomplete="off" enterkeyhint="done"><button class="btn p" data-a="add-word">${icon('plus', 'sm')}</button></div></div>`;
  if (!S.words.length) return h + `<div class="empty">${icon('follow')}<h3>Follow what matters to you</h3><p>Add a company, person or topic. Every story that mentions it shows up here.</p></div>`;
  const day = Date.now() - 864e5;
  const per = S.words.map(w => { const re = wordRe(w); const list = S.items.filter(it => !S.off.has(it.src) && !isMuted(it) && re.test(it.title + ' ' + it.desc)); return { w, list, n: list.filter(x => x.t > day).length }; });
  h += `<div class="set"><div class="pills">${per.map(p => `<span class="pill">${esc(p.w)}${p.n ? `<span class="n">${p.n}</span>` : ''}<button class="x" data-a="del-word" data-w="${esc(p.w)}" aria-label="Stop following ${esc(p.w)}">${icon('x')}</button></span>`).join('')}</div></div>`;
  current = [];
  for (const p of per) {
    h += `<div class="fhead"><h2>${esc(p.w)}</h2>${p.list.length > 5 ? `<button data-a="word-all" data-w="${esc(p.w)}">See all ${p.list.length}</button>` : ''}</div><div class="feed">`;
    if (!p.list.length) h += `<p class="hint">No stories mention "${esc(p.w)}" yet. They'll show up here when they do.</p>`;
    for (const g of group(p.list).slice(0, 5)) { current.push(g); h += rowHTML(g, current.length - 1, { notags: true }); }
    h += '</div>';
  }
  return h;
};
Views.saved = () => {
  let h = `<div class="title">Saved</div>`;
  if (!S.saved.length) return h + `<div class="empty">${icon('bookmark')}<h3>Nothing saved yet</h3><p>Tap the bookmark on any story to keep it here, even offline.</p></div>`;
  current = S.saved.map(it => ({ lead: it, also: [], img: it.img }));
  return h + `<div class="feed">${current.map((g, i) => rowHTML(g, i, { desc: true, notags: true })).join('')}</div>`;
};
let moreObs = null;
function render(keep = false) {
  const v = $('#view'), y = window.scrollY;
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === S.tab));
  if (!keep) S.shown = 30;
  v.innerHTML = Views[S.tab]();
  renderSub();
  if (keep) window.scrollTo(0, y);
  const chip = document.querySelector('#topics .chip.on'); if (chip && !keep) chip.scrollIntoView({ inline: 'center', block: 'nearest' });
  if (moreObs) moreObs.disconnect();
  const m = $('#more');
  if (m) { moreObs = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { S.shown += 30; render(true); } }, { rootMargin: '600px' }); moreObs.observe(m); }
}

/* ---------- layers: story, search, settings ---------- */
let layerOpen = null;
function openLayer(kind, html) {
  const l = $('#layer'); l.innerHTML = html; l.classList.remove('hidden'); l.scrollTop = 0;
  if (!layerOpen) history.pushState({ layer: kind }, '');
  layerOpen = kind; document.body.style.overflow = 'hidden';
}
function closeLayer(fromPop = false) {
  if (!layerOpen) return;
  $('#layer').classList.add('hidden'); $('#layer').innerHTML = ''; layerOpen = null; document.body.style.overflow = '';
  if (!fromPop) history.back();
  render(true);
}
window.addEventListener('popstate', () => { if (layerOpen) closeLayer(true); });
let storyGroup = null;
function openStory(g) {
  storyGroup = g; const it = g.lead, s = SRC_BY_ID[it.src];
  S.read.add(it.id); saveRead();
  const saved = S.saved.some(x => x.id === it.id), img = g.img || it.img;
  openLayer('story', `<div class="lbar"><button class="iconbtn" data-a="close" aria-label="Back">${icon('back')}</button><span class="lt"></span>
      <button class="iconbtn" data-a="share" aria-label="Share">${icon('share')}</button>
      <button class="iconbtn" data-a="save" aria-label="${saved ? 'Remove from saved' : 'Save for later'}" style="color:${saved ? 'var(--acc)' : ''}">${icon(saved ? 'bookmark-f' : 'bookmark')}</button></div>
    ${img ? `<div class="story-hero">${imgTag(img)}</div>` : ''}
    <div class="story-in">${srcLine(it)}<h1>${esc(it.title)}</h1>
      ${it.desc ? `<p class="sum">${esc(it.desc)}</p>` : ''}
      <p class="note">${s && s.pw ? 'This site may ask you to subscribe to read the full story.' : 'The full story opens on the news site.'}</p>
      <div class="actions"><button class="btn p" data-a="listen-story">${icon('play', 'sm')} Listen</button><a class="btn" href="${esc(it.link)}" target="_blank" rel="noopener">${icon('open', 'sm')} Full story</a></div>
      ${g.also.length ? `<div class="cov"><div class="k">Also covered by</div>${g.also.map(a => `<a href="${esc(a.link)}" target="_blank" rel="noopener" data-read="${a.id}"><b>${esc(SRC_BY_ID[a.src]?.name || '')}</b>${esc(a.title)}</a>`).join('')}</div>` : ''}
      ${s ? `<button class="linkbtn" data-a="hide-source" data-s="${s.id}">${icon('eye-off', 'sm')} Hide stories from ${esc(s.name)}</button>` : ''}
    </div>`);
}
function openSearch(q = '') {
  openLayer('search', `<div class="lbar"><button class="iconbtn" data-a="close" aria-label="Back">${icon('back')}</button>
    <div class="searchbox">${icon('search', 'sm')}<input id="q" type="search" placeholder="Search stories" value="${esc(q)}" autocomplete="off" enterkeyhint="search"></div></div><div class="feed" id="sres"></div>`);
  const inp = $('#q'); inp.focus();
  const run = () => {
    const v = inp.value.trim(), box = $('#sres');
    if (v.length < 2) { box.innerHTML = '<p class="hint" style="padding:10px 0">Search the stories loaded on this phone from the last few days.</p>'; return; }
    const re = wordRe(v), words = v.toLowerCase().split(/\s+/);
    const res = S.items.filter(it => !S.off.has(it.src) && (re.test(it.title + ' ' + it.desc) || words.every(w => (it.title + ' ' + it.desc).toLowerCase().includes(w)))).slice(0, 80);
    current = group(res);
    box.innerHTML = current.length ? current.map((g, i) => rowHTML(g, i, { desc: true })).join('') : `<p class="hint" style="padding:10px 0">No stories found for "${esc(v)}".</p>`;
  };
  inp.addEventListener('input', run); run();
}
function openWordAll(w) {
  const re = wordRe(w);
  current = group(S.items.filter(it => !S.off.has(it.src) && !isMuted(it) && re.test(it.title + ' ' + it.desc)));
  openLayer('word', `<div class="lbar"><button class="iconbtn" data-a="close" aria-label="Back">${icon('back')}</button><span class="lt">${esc(w)}</span></div><div class="feed">${current.map((g, i) => rowHTML(g, i)).join('')}</div>`);
}
function settingsHTML() {
  const fsOpts = [[0.9, 'S'], [1, 'M'], [1.1, 'L'], [1.22, 'XL']];
  let h = `<div class="lbar"><button class="iconbtn" data-a="close" aria-label="Back">${icon('back')}</button><span class="lt">Settings</span></div>`;
  h += `<div class="sec">Reading</div><div class="set">
    <div class="setrow"><div class="l">Text size</div><div class="seg">${fsOpts.map(([v, l]) => `<button class="${S.fs === v ? 'on' : ''}" data-a="fs" data-v="${v}">${l}</button>`).join('')}</div></div>
    <div class="setrow"><div class="l">Market strip<small>S&amp;P 500, Nifty 50, FTSE 100 and USD/INR on Home. Prices may be delayed.</small></div><button class="toggle ${S.markets ? 'on' : ''}" data-a="markets" aria-label="Market strip"></button></div></div>`;
  h += `<div class="sec">Muted words</div><div class="set"><p class="hint">Stories that mention these words are hidden everywhere.</p>
    <div class="field"><input id="addmute" placeholder="Add a word to hide" autocomplete="off" enterkeyhint="done"><button class="btn" data-a="add-mute">${icon('plus', 'sm')}</button></div>
    <div class="pills">${S.muted.map(w => `<span class="pill">${esc(w)}<button class="x" data-a="del-mute" data-w="${esc(w)}" aria-label="Unmute ${esc(w)}">${icon('x')}</button></span>`).join('')}</div></div>`;
  h += `<div class="sec">Sources</div><div class="set"><p class="hint">Turn off any source you don't want. ${icon('lock', 'sm').replace('class="icon', 'style="width:13px;height:13px;vertical-align:-2px" class="icon')} means the site may ask you to subscribe for full stories.</p>`;
  const groups = [['general', 'Top news'], ...TOPICS.slice(1)];
  for (const [k, l] of groups) {
    h += `<div class="sec" style="padding-left:0">${esc(l)}</div>`;
    for (const s of SRC.filter(x => x.topic === k)) {
      h += `<div class="setrow"><div class="l">${esc(s.name)}${s.pw ? ' ' + icon('lock', 'sm').replace('class="icon', 'style="width:13px;height:13px;vertical-align:-2px;color:var(--dim)" class="icon') : ''}<small>${esc(REGIONS.find(r => r[0] === s.region)[1])}${S.failed.includes(s.id) ? " · Didn't load last time" : ''}</small></div><button class="toggle ${S.off.has(s.id) ? '' : 'on'}" data-a="src" data-s="${s.id}" aria-label="${esc(s.name)}"></button></div>`;
    }
  }
  h += `</div><div class="sec">Relay</div><div class="set"><p class="hint">Most news sites block apps from reading their feeds directly, so Iris asks your Cloudflare relay for them.</p>
    <div class="field"><input id="relay" value="${esc(S.relay)}" inputmode="url" autocomplete="off" spellcheck="false"><button class="btn" data-a="save-relay">Save</button></div></div>
    <div class="sec">About</div><div class="set"><p class="hint">Iris ${VERSION}. No ads, no account, no tracking. Your saved stories, followed words and settings stay on this phone.</p></div><div style="height:60px"></div>`;
  return h;
}
const openSettings = () => openLayer('settings', settingsHTML());
const reSettings = () => { const l = $('#layer'), y = l.scrollTop; l.innerHTML = settingsHTML(); l.scrollTop = y; };

/* ---------- Listen (read aloud with the phone's own voice) ---------- */
const Speak = {
  queue: [], idx: 0, on: false, paused: false,
  supported() { return 'speechSynthesis' in window; },
  start(items) {
    if (!this.supported()) { toast("This phone can't read aloud"); return; }
    speechSynthesis.cancel(); this.queue = items; this.idx = 0; this.on = true; this.paused = false; document.body.classList.add('speaking'); this.say();
  },
  say() {
    const it = this.queue[this.idx];
    if (!it) { this.stop(); return; }
    $('#speak').classList.remove('hidden'); $('#sp-title').textContent = it.title;
    $('#speak [data-a="sp-toggle"]').innerHTML = icon('pause');
    const s = SRC_BY_ID[it.src];
    const u = new SpeechSynthesisUtterance(`${s ? 'From ' + s.name + '. ' : ''}${it.title}. ${it.desc || ''}`);
    u.lang = navigator.language || 'en-US'; u.rate = 1;
    const my = this.idx;
    u.onend = () => { if (this.on && !this.paused && this.idx === my) { this.idx++; setTimeout(() => this.say(), 350); } };
    speechSynthesis.speak(u);
  },
  toggle() {
    if (!this.on) return;
    if (this.paused) { speechSynthesis.resume(); this.paused = false; if (!speechSynthesis.speaking) this.say(); }
    else { speechSynthesis.pause(); this.paused = true; }
    $('#speak [data-a="sp-toggle"]').innerHTML = icon(this.paused ? 'play' : 'pause');
  },
  next() { if (!this.on) return; this.idx++; this.paused = false; speechSynthesis.cancel(); setTimeout(() => this.say(), 120); },
  stop() { this.on = false; speechSynthesis.cancel(); $('#speak').classList.add('hidden'); document.body.classList.remove('speaking'); },
};

/* ---------- market strip ---------- */
const MARKETS = [['^GSPC', 'S&P 500'], ['^NSEI', 'Nifty 50'], ['^FTSE', 'FTSE 100'], ['INR=X', 'USD/INR']];
async function loadMarkets() {
  if (!S.markets || !navigator.onLine) return;
  const out = await Promise.all(MARKETS.map(async ([sym, name]) => {
    try {
      const j = JSON.parse(await fetchText(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=1d&interval=1d`));
      const m = j.chart.result[0].meta, p = m.regularMarketPrice, prev = m.chartPreviousClose || m.previousClose;
      return { name, price: p.toLocaleString(undefined, { maximumFractionDigits: sym === 'INR=X' ? 2 : 0, minimumFractionDigits: sym === 'INR=X' ? 2 : 0 }), chg: prev ? (p - prev) / prev * 100 : 0 };
    } catch { return null; }
  }));
  const ok = out.filter(Boolean);
  if (ok.length) { S.mk = ok; LS.set('mk', ok); if (S.tab === 'home' && !layerOpen) render(true); }
}

/* ---------- taps ---------- */
const A = {
  region: d => { S.region = d.k; LS.set('region', d.k); window.scrollTo(0, 0); render(); },
  topic: d => { S.topic = d.k; LS.set('topic', d.k); window.scrollTo(0, 0); render(); },
  refresh: () => refresh(true),
  open: d => { const g = current[+d.i]; if (g) openStory(g); },
  close: () => closeLayer(),
  search: () => openSearch(),
  settings: () => openSettings(),
  theme: () => { const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'; document.documentElement.dataset.theme = t; LS.set('theme', t); try { localStorage.setItem('iris-theme', t); } catch { } setThemeColor(); render(true); },
  save: () => {
    const it = storyGroup.lead, i = S.saved.findIndex(x => x.id === it.id);
    if (i >= 0) { S.saved.splice(i, 1); toast('Removed from saved'); }
    else { S.saved.unshift(Object.assign({}, it, { img: storyGroup.img || it.img, savedAt: Date.now() })); toast('Saved for later'); }
    LS.set('saved', S.saved);
    const b = document.querySelector('#layer [data-a="save"]'); const on = i < 0;
    b.innerHTML = icon(on ? 'bookmark-f' : 'bookmark'); b.style.color = on ? 'var(--acc)' : '';
  },
  share: async () => { const it = storyGroup.lead; try { if (navigator.share) await navigator.share({ title: it.title, url: it.link }); else { await navigator.clipboard.writeText(it.link); toast('Link copied'); } } catch { } },
  'listen-story': () => Speak.start([storyGroup.lead]),
  'listen-feed': () => Speak.start(current.slice(0, 40).map(g => g.lead)),
  'sp-toggle': () => Speak.toggle(), 'sp-next': () => Speak.next(), 'sp-stop': () => Speak.stop(),
  'hide-source': d => { S.off.add(d.s); LS.set('off', [...S.off]); toast(`Stories from ${SRC_BY_ID[d.s].name} are hidden. Turn it back on in Settings.`, 3500); closeLayer(); },
  'add-word': () => { const v = $('#addword').value.trim(); if (!v) return; if (!S.words.some(w => w.toLowerCase() === v.toLowerCase())) { S.words.push(v); LS.set('words', S.words); } render(); },
  'del-word': d => { S.words = S.words.filter(w => w !== d.w); LS.set('words', S.words); render(true); },
  'word-all': d => openWordAll(d.w),
  'add-mute': () => { const v = $('#addmute').value.trim(); if (!v) return; if (!S.muted.some(w => w.toLowerCase() === v.toLowerCase())) { S.muted.push(v); LS.set('muted', S.muted); } reSettings(); },
  'del-mute': d => { S.muted = S.muted.filter(w => w !== d.w); LS.set('muted', S.muted); reSettings(); },
  fs: d => { S.fs = +d.v; LS.set('fs', S.fs); applyFs(); reSettings(); },
  markets: () => { S.markets = !S.markets; LS.set('markets', S.markets); reSettings(); if (S.markets) loadMarkets(); },
  src: d => { if (S.off.has(d.s)) S.off.delete(d.s); else S.off.add(d.s); LS.set('off', [...S.off]); reSettings(); },
  'save-relay': () => { S.relay = $('#relay').value.trim() || DEFAULT_RELAY; LS.set('relay', S.relay); toast('Relay saved'); refresh(true); },
};
document.addEventListener('click', e => {
  const r = e.target.closest('[data-read]'); if (r) { S.read.add(r.dataset.read); saveRead(); }
  const b = e.target.closest('[data-a]'); if (b && A[b.dataset.a]) { e.preventDefault(); A[b.dataset.a](b.dataset); return; }
  const t = e.target.closest('#nav [data-tab]');
  if (t) { if (S.tab === t.dataset.tab) window.scrollTo({ top: 0, behavior: 'smooth' }); else { S.tab = t.dataset.tab; window.scrollTo(0, 0); render(); } }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (e.target.id === 'addword') A['add-word'](); else if (e.target.id === 'addmute') A['add-mute'](); else if (e.target.id === 'relay') A['save-relay']();
  else if (e.target.id === 'q') e.target.blur();
});
function applyFs() { document.documentElement.style.setProperty('--fs', S.fs); }
function setThemeColor() { const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = document.documentElement.dataset.theme === 'light' ? '#f6f3ec' : '#0e0d14'; }

/* ---------- start ---------- */
(async function boot() {
  applyFs(); setThemeColor();
  S.mk = LS.get('mk', null);
  try { const c = await DB.get('items'); if (c) { S.items = c.items || []; S.fetchedAt = c.at || 0; } } catch { }
  render();
  if (Date.now() - S.fetchedAt > 10 * 60e3) refresh();
  loadMarkets();
  setInterval(() => { if (!document.hidden) loadMarkets(); }, 5 * 60e3);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - S.fetchedAt > 10 * 60e3) refresh(); });
  window.addEventListener('online', () => refresh());
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => { });
    let reloaded = false; const had = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloaded || !had) return; reloaded = true; if (!layerOpen && !Speak.on) location.reload(); });
  }
})();

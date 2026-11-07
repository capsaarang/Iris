# Iris

A personal, ad-free news reader. No account, no tracking, no subscription. Everything stays on the phone.

**Open the app:** https://capsaarang.github.io/Iris/

## What it does

- **Regions:** World (everything), India, USA, UK.
- **Topics:** Finance, Banking & Fintech, Economy, Business, Startups, Careers, Product management, Law, Tech, AI, Science & Space, Politics, Military, Sports, Cinema.
- **Same story, shown once:** when several outlets report the same thing, Iris shows it once with "Also covered by".
- **Listen:** reads headlines and summaries aloud with the phone's own voice.
- **Following:** add any word (a company, person or topic) to see every story that mentions it.
- **Saved, search, mute words, text size, light and dark themes, market strip, works offline.**
- Turn any source on or off in Settings. A lock means the site may ask you to subscribe for the full story.

## How it gets the news

Iris reads the public RSS feeds that news sites publish. Most sites block web apps from reading those directly, so Iris asks a small Cloudflare Worker relay (the same one Isai uses for podcasts) to fetch them. The relay only accepts requests from `capsaarang.github.io`.

The market strip uses Yahoo Finance's public chart data, which is unofficial and may stop working at any time. It can be turned off in Settings.

## Install on Android

1. Open https://capsaarang.github.io/Iris/ in Chrome.
2. Tap the three-dot menu, then **Add to Home screen** (or **Install app**).

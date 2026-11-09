# Fixes log

## 2026-11-08 (nightly check)
- Problem: Iris's service worker deleted every offline cache on capsaarang.github.io, including Isai's, so Isai could fail to open offline after an Iris update.
  Fix: only delete Iris's own old caches.
- Version: 1.0.4 (cache iris-v1.0.4). Commit: 52f8929
- Also checked: RSS, Atom and RDF feeds, regions, topics, same-story grouping, story page, search, Following, Saved, Settings, theme switch, Listen. All fine.

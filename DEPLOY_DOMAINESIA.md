# Deploy / Update live site (arifinjayadiningrat.com on Domainesia)

The live site is **static**: Domainesia only serves the files you upload. Nothing auto-deploys. To reflect any code change, you must build and re-upload.

## One-time: fix images (unoptimized)

Already done in this repo: `next.config.js` has `images: { unoptimized: true }`. You only need to **rebuild and re-upload** once so the live site uses direct image paths (`/logo.png`, etc.) instead of `/_next/image?...`.

## Every time you want to update the live site

1. **Build static export**
   ```bash
   npm run build:static
   ```
   If that fails (e.g. API routes), use:
   ```bash
   mv src/app/api api_routes_backup && npm run build && mv api_routes_backup src/app/api
   ```

2. **Create ZIP**
   ```bash
   cd out && zip -r ../site.zip . -x "*.DS_Store" && cd ..
   ```

3. **Upload to Domainesia**
   - Go to **my.domainesia.com** → your hosting → **File Manager**.
   - Open **public_html** (or the folder for arifinjayadiningrat.com).
   - Upload **site.zip**, then **Extract** it there (replace old files).
   - Delete **site.zip** on the server after extraction.

4. **Check**
   - Open https://www.arifinjayadiningrat.com/ (hard refresh or incognito if needed).

## Summary

| Action                    | Effect on live site                          |
|---------------------------|----------------------------------------------|
| Push/merge to Git         | **No effect** – Domainesia does not use Git. |
| Change code locally       | **No effect** until you build + upload.       |
| Build + upload new `out`   | **Live site updates** to the new version.     |

So: **code change → build (build:static) → zip `out` → upload + extract on Domainesia** = updated live site.

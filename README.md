# Valentine's Love Letter Website

A standalone, deploy-ready romantic website built with plain HTML, CSS and JavaScript.

## Deploy
Upload the contents of this folder to any static host:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any ordinary web server

No build step or package manager is required.

## How it works
Open `index.html`. Click **Edit Website** to customize the page. Content is stored in the browser with LocalStorage. Use **Export Valentine's Page** to make a JSON backup.

## Important storage note
This version intentionally runs entirely client-side. Uploaded photos and local audio are stored in browser storage/data URLs, so extremely large collections can exceed browser storage limits. The image uploader automatically resizes/compresses images.

## Love Mode
Use **Preview Love Mode** from the editor to hide the editing UI and experience the page as the recipient.

## Files
- `index.html` — page structure
- `styles.css` — responsive visual design and animations
- `app.js` — editor, persistence, gallery, lightbox, counter, import/export, audio, accessibility behavior

## Music
A local audio file can be selected in Edit Website. External links are offered as a fallback instead of pretending unsupported music services can be embedded.

## Privacy
There is no backend and no analytics in this project. Data entered into the page stays in the browser unless the user exports or otherwise shares it.

# Valentine's Love Letter — GitHub-only edition

A standalone romantic website for GitHub Pages. No Firebase, database, login, build step, or backend.

## Publish / update the website

1. Open `site-data.js` in your GitHub repository.
2. Edit the text, dates, reasons, colors, and media paths.
3. Put photos/audio inside `assets/`.
4. Commit your changes to GitHub.
5. GitHub Pages serves the updated version to everyone.

### Using the built-in editor

The **Edit Website** panel is now a preview editor. It does not pretend to write to GitHub. Click **Save for GitHub** to download a new `site-data.js`, then upload/replace that file in GitHub and commit it.

For media, upload the actual files to `assets/` in GitHub and use paths such as `assets/hero.jpg` or `assets/background.mp3`.

## Important limitation

A GitHub Pages website cannot securely commit files back into your GitHub repository from the browser without giving the public site a GitHub credential. This version deliberately avoids that security risk.

## Files
- `index.html` — page structure
- `styles.css` — design and animations
- `app.js` — editor, gallery, lightbox, counter, audio, accessibility behavior
- `site-data.js` — **the main publishing file**
- `assets/` — published photos and audio

## Music

Use local files in `assets/` for public music. Browsers may block autoplay until the visitor interacts with the page.

## Privacy

There is no backend or analytics in this project. Published content is served publicly by GitHub Pages.

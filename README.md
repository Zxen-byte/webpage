# Our Love Letter — GitHub-only page-by-page edition

This is the GitHub Pages version of the Valentine website. It uses no Firebase, database, login, or backend.

## Page-by-page flow

1. Home / Hello
2. Time Since We Met
3. Our Memories
4. My Message
5. Our Story
6. Things I Love
7. Our Song
8. Secret Message
9. Forever

The **Next** and **Back** buttons move through the pages. The top navigation can jump directly to a page.

## Publish changes

The published source of truth is `site-data.js`.

1. Open **Edit Website**.
2. Change your content.
3. Click **Save for GitHub ♥**.
4. Your browser downloads `site-data.js`.
5. Upload/replace `site-data.js` in your GitHub repository.
6. Commit the change.
7. GitHub Pages publishes the update for everyone.

## Photos and music

Upload files into the repository's `assets/` folder, for example:

- `assets/hero.jpg`
- `assets/memory-1.jpg`
- `assets/song.mp3`
- `assets/background.mp3`

Then use those relative paths in `site-data.js`.

Background music can be enabled with:

`backgroundMusicEnabled: true`

Browsers can block autoplay until the visitor interacts with the page.

## Files

- `index.html` — structure
- `styles.css` — design and page transitions
- `app.js` — editor, page navigation, gallery, counter, lightbox and audio
- `site-data.js` — published content
- `assets/` — your media

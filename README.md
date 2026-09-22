# Edunova

Edunova is a small, static quantum-learning website built with plain HTML, CSS, and JavaScript.

## Pages

- `index.html` - public landing page
- `learn.html` - ten-topic course roadmap
- `tutor.html` - topic-aware AI Tutor demo
- `voice.html` - browser speech assistant demo
- `playground.html` - circuit concept demo
- `profile.html` - profile, theme, language, and logout settings
- `lesson-*.html` - standalone lessons
- `login.html` - demo login using `users.json`

## Run

Open `index.html` in a browser for the public page. Login data is loaded from `users.json`; browsers may block that request from `file://`, so use a simple local static server when testing login.

This is a frontend demo. The credentials in `users.json` are intentionally sample data and are not suitable for production authentication.

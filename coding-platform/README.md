# Coding Practice Platform

A small HackerRank/LeetCode-style practice website built with **only HTML, CSS and vanilla JavaScript**.

> **This is a frontend-only educational project.** Code is **not** compiled or executed. "Run Code" and "Submit" are a *simulation*. Real multi-language execution (C, C++, Python...) needs a backend/compiler service.

## Features
- Dashboard: total/solved/unsolved, progress bar, streak, recent problems, quick links
- 30 problems (Basics, Loops, Arrays, Strings, Searching & Sorting) with difficulty + topic
- Filters (difficulty and topic) and title search
- Problem page with description, examples, line-numbered editor, language selector (C, C++, Python, JavaScript), Run / Submit / Reset and an output console
- Bookmarks page, Daily Challenge (same problem all day), demo leaderboard (fictional users)
- Profile with editable display name
- Dark / light mode, responsive layout (sidebar on desktop, bottom bar on mobile)
- Works fully offline (no external files, fonts or APIs)

## Technologies
HTML5, CSS3, vanilla JavaScript, LocalStorage.

## Screenshots
_Add screenshots here: `docs/dashboard.png`, `docs/problem.png`_

## Project structure
```
coding-platform/
├── index.html        Dashboard (+ daily challenge, leaderboard)
├── problems.html     Problem list, filters, search
├── problem.html      Problem solving page (problem.html?id=1)
├── bookmarks.html    Bookmarked problems
├── profile.html      Profile and display name
├── css/
│   ├── style.css         Main styles + dark/light colours
│   └── responsive.css    Tablet / phone layout
├── js/
│   ├── storage.js    All LocalStorage code
│   ├── utils.js      Small helper functions
│   ├── data.js       The 30 problems
│   ├── app.js        Sidebar, theme, bookmark buttons (every page)
│   ├── dashboard.js / problems.js / problem.js / bookmarks.js / profile.js   (one per page)
└── README.md
```
Script order matters: `storage.js` -> `utils.js` -> `data.js` -> `app.js` -> the page's own script.

## How to run (VS Code)
1. Unzip the folder and open it: **File -> Open Folder -> coding-platform**.
2. Easiest: right-click `index.html` in the Explorer and choose **Reveal in File Explorer**, then double-click it to open in your browser.
3. Or install the **Live Server** extension, right-click `index.html` -> **Open with Live Server** (auto-reloads when you edit).
4. Press **F12 -> Console** to check for errors while you experiment.

## How LocalStorage works
LocalStorage is a small key-value store in your browser. It only stores text, so we convert with `JSON.stringify()` (save) and `JSON.parse()` (load).

| Key | Stores |
|---|---|
| `cp_solved`, `cp_attempted`, `cp_bookmarks` | arrays of problem ids |
| `cp_recent` | last 5 attempted ids |
| `cp_attempts` | total Run/Submit clicks |
| `cp_streak` | `{ count, last }` (last solved date) |
| `cp_username`, `cp_theme`, `cp_language` | profile and preferences |
| `cp_code_<id>_<lang>` | your saved code per problem/language |

To inspect: DevTools -> Application -> Local Storage. Clearing browser data (or "Reset progress" on the Profile page) removes your progress. Data never leaves your browser.

## How the simulated checker works
Every problem has a `keywords` list (in `js/data.js`). **Submit** marks a problem solved if your code is non-empty, differs from the starter template, and contains at least one keyword (for example `%` for Even/Odd). This is only a learning demo, not real judging.

## JavaScript concepts used (study guide)
- **Arrays and objects**: `PROBLEMS` is an array of objects (`js/data.js`).
- **Array methods**: `filter` (filters/search), `map` (build HTML), `find` (get by id), `some` (keyword check), `includes`, `sort`.
- **DOM manipulation**: `getElementById`, `innerHTML`, `textContent`, `classList.toggle`, `setAttribute`.
- **Event listeners**: `click`, `input`, `submit`, `change`, `scroll`. `app.js` uses *event delegation* (one listener catches every bookmark button).
- **LocalStorage + JSON**: `storage.js`, wrapped in `try/catch` so bad data never crashes the page.
- **URL parameters**: `URLSearchParams` reads `?id=5` on the problem page.
- **Dates**: `new Date()` powers the daily challenge (date number % 30) and the streak.
- **Template strings and string methods**: `padStart`, `repeat`, `split`, `trim`.
- **Custom events**: `bookmarkchange` refreshes lists after a bookmark changes.
- **Escaping**: `escapeHtml()` stops text from being treated as HTML.

## Limitations
- No real compiler or judge; results are simulated
- Data lives in one browser only (no accounts, no sync)
- Leaderboard users are fictional
- The checker can be fooled (for example by comments containing keywords)

## Future improvements
Real code execution via a secure backend, user authentication, online leaderboard, more languages, more problems, PostgreSQL/MongoDB database, admin panel, AI-powered hints, code explanation, submission history.

// storage.js - everything that talks to LocalStorage lives here.
// Every function is wrapped in try/catch so missing or broken data never crashes the app.

const KEYS = {
  solved: "cp_solved",         // array of solved problem ids
  attempted: "cp_attempted",   // array of attempted problem ids
  bookmarks: "cp_bookmarks",   // array of bookmarked problem ids
  language: "cp_language",     // last selected language
  theme: "cp_theme",           // "light" or "dark"
  username: "cp_username",     // display name
  streak: "cp_streak",         // { count: 3, last: "2025-01-31" }
  attempts: "cp_attempts",     // total number of Run/Submit clicks
  recent: "cp_recent"          // last attempted problem ids (newest first)
};

// Read a value. If anything goes wrong, return the fallback instead.
function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

// Save a value. Returns true if it worked.
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

// Read a list (always returns an array, even if stored data is damaged)
function getList(key) {
  const value = loadData(key, []);
  return Array.isArray(value) ? value : [];
}

function addToList(key, id) {
  const list = getList(key);
  if (!list.includes(id)) {
    list.push(id);
    saveData(key, list);
  }
}

// ----- Solved / attempted -----
function isSolved(id) { return getList(KEYS.solved).includes(id); }
function getSolvedCount() { return getList(KEYS.solved).length; }
function getTotalAttempts() { return Number(loadData(KEYS.attempts, 0)) || 0; }

// Called every time the user clicks Run or Submit
function markAttempted(id) {
  addToList(KEYS.attempted, id);
  saveData(KEYS.attempts, getTotalAttempts() + 1);
  // keep the 5 most recent problems, newest first
  let recent = getList(KEYS.recent).filter(function (x) { return x !== id; });
  recent.unshift(id);
  saveData(KEYS.recent, recent.slice(0, 5));
}

function markSolved(id) {
  addToList(KEYS.solved, id);
  updateStreak();
}

// ----- Bookmarks -----
function isBookmarked(id) { return getList(KEYS.bookmarks).includes(id); }

// Adds or removes a bookmark. Returns true if the problem is now bookmarked.
function toggleBookmark(id) {
  let list = getList(KEYS.bookmarks);
  if (list.includes(id)) {
    list = list.filter(function (x) { return x !== id; });
    saveData(KEYS.bookmarks, list);
    return false;
  }
  list.push(id);
  saveData(KEYS.bookmarks, list);
  return true;
}

// ----- Streak -----
// Streak = number of days in a row on which the user solved a problem.
function updateStreak() {
  const streak = loadData(KEYS.streak, { count: 0, last: "" });
  const today = todayString();
  if (streak.last === today) return;                       // already counted today
  streak.count = (streak.last === yesterdayString()) ? streak.count + 1 : 1;
  streak.last = today;
  saveData(KEYS.streak, streak);
}

// If the user skipped a day, the streak is shown as 0
function getStreak() {
  const streak = loadData(KEYS.streak, { count: 0, last: "" });
  if (streak.last === todayString() || streak.last === yesterdayString()) {
    return Number(streak.count) || 0;
  }
  return 0;
}

// ----- Name, theme, language -----
function getUsername() {
  const name = loadData(KEYS.username, "");
  return (typeof name === "string" && name.trim() !== "") ? name : "Coder";
}
function getTheme() { return loadData(KEYS.theme, "light") === "dark" ? "dark" : "light"; }
function getLanguage() {
  const lang = loadData(KEYS.language, "python");
  return ["c", "cpp", "python", "javascript"].includes(lang) ? lang : "python";
}

// ----- Saved code (one slot per problem + language) -----
function getSavedCode(id, lang) { return loadData("cp_code_" + id + "_" + lang, null); }
function saveCode(id, lang, code) { saveData("cp_code_" + id + "_" + lang, code); }

// ----- Reset everything -----
function resetAllProgress() {
  try {
    Object.keys(localStorage).forEach(function (k) {
      if (k.indexOf("cp_") === 0 && k !== KEYS.theme && k !== KEYS.username) localStorage.removeItem(k);
    });
  } catch (e) { /* ignore */ }
}

// utils.js - small helper functions used on many pages.

// Stops user text from being treated as HTML (prevents broken layout / XSS)
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Date as "YYYY-MM-DD" in the user's local time
function formatDate(date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + m + "-" + d;
}
function todayString() { return formatDate(new Date()); }
function yesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDate(d);
}

// Read ?id=5 from the page URL
function getParam(name) { return new URLSearchParams(window.location.search).get(name); }

function getProblemById(id) {
  return PROBLEMS.find(function (p) { return p.id === id; }) || null;
}

// Same problem all day: the date (e.g. 20250131) decides the index
function getDailyProblem() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return PROBLEMS[seed % PROBLEMS.length];
}

function difficultyBadge(level) {
  return '<span class="badge ' + level.toLowerCase() + '">' + level + '</span>';
}

function progressPercent() {
  return PROBLEMS.length === 0 ? 0 : Math.round((getSolvedCount() / PROBLEMS.length) * 100);
}

// Text progress bar:  ████████░░░░░░░░ 50%
function textBar(percent) {
  const filled = Math.round((percent / 100) * 16);
  return "█".repeat(filled) + "░".repeat(16 - filled) + " " + percent + "%";
}

// Small popup message. type = "success" | "error" | "info"
function showToast(message, type) {
  let box = document.getElementById("toast");
  if (!box) { box = document.createElement("div"); box.id = "toast"; document.body.appendChild(box); }
  box.textContent = message;
  box.className = "show " + (type || "info");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function () { box.className = ""; }, 2500);
}

// app.js - runs on EVERY page: theme, sidebar, bookmark buttons, shared problem rows.

// 1. Apply the saved theme (light/dark)
document.documentElement.setAttribute("data-theme", getTheme());

// 2. Build the sidebar (written once here instead of copied into every HTML file)
const NAV_ITEMS = [
  { href: "index.html",          label: "🏠 Dashboard",       page: "dashboard" },
  { href: "problems.html",       label: "💻 Problems",        page: "problems" },
  { href: "index.html#daily",    label: "🔥 Daily Challenge", page: "daily" },
  { href: "bookmarks.html",      label: "🔖 Bookmarks",       page: "bookmarks" },
  { href: "profile.html",        label: "👤 Profile",         page: "profile" }
];

function buildSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  const current = document.body.getAttribute("data-page");
  let html = '<div class="brand">&lt;/&gt; CodePractice</div><nav class="nav">';
  NAV_ITEMS.forEach(function (item) {
    html += '<a href="' + item.href + '" class="' + (item.page === current ? "active" : "") + '">' + item.label + "</a>";
  });
  html += '</nav><button id="themeBtn" class="btn ghost theme-btn"></button>';
  sidebar.innerHTML = html;

  const btn = document.getElementById("themeBtn");
  function refreshLabel() { btn.textContent = getTheme() === "dark" ? "☀️ Light mode" : "🌙 Dark mode"; }
  refreshLabel();
  btn.addEventListener("click", function () {
    const next = getTheme() === "dark" ? "light" : "dark";
    saveData(KEYS.theme, next);
    document.documentElement.setAttribute("data-theme", next);
    refreshLabel();
  });
}

// 3. One row in a problem list (used by Dashboard, Problems and Bookmarks)
function problemRowHtml(p) {
  const solved = isSolved(p.id);
  const marked = isBookmarked(p.id);
  return '<div class="problem-row">' +
    '<span class="num">#' + p.id + '</span>' +
    '<a class="title" href="problem.html?id=' + p.id + '">' + escapeHtml(p.title) + '</a>' +
    '<span class="tag">' + p.topic + '</span>' + difficultyBadge(p.difficulty) +
    '<span class="status ' + (solved ? "solved" : "") + '">' + (solved ? "✔ Solved" : "○ Unsolved") + '</span>' +
    '<button class="icon-btn bookmark-btn ' + (marked ? "active" : "") + '" data-id="' + p.id + '" title="Bookmark">' + (marked ? "★" : "☆") + '</button>' +
    '</div>';
}

// 4. One click listener for ALL bookmark buttons on the page ("event delegation")
document.addEventListener("click", function (event) {
  const button = event.target.closest(".bookmark-btn");
  if (!button) return;
  const id = Number(button.getAttribute("data-id"));
  const nowMarked = toggleBookmark(id);
  button.classList.toggle("active", nowMarked);
  button.textContent = nowMarked ? "★" : "☆";
  showToast(nowMarked ? "Bookmark added" : "Bookmark removed", "info");
  document.dispatchEvent(new Event("bookmarkchange")); // lets pages refresh themselves
});

buildSidebar();

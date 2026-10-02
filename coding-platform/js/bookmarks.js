// bookmarks.js - lists bookmarked problems

function renderBookmarks() {
  const list = document.getElementById("bookmarkList");
  const problems = getList(KEYS.bookmarks).map(getProblemById).filter(Boolean);
  if (problems.length === 0) {
    list.innerHTML = '<div class="empty">No bookmarked problems yet.<br>Click ☆ next to a problem to save it here.<br><a class="btn primary" href="problems.html">Browse problems</a></div>';
    return;
  }
  list.innerHTML = problems.map(problemRowHtml).join("");
}

// A removed bookmark should disappear from this page right away
document.addEventListener("bookmarkchange", renderBookmarks);
renderBookmarks();

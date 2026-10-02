// dashboard.js - fills in the Dashboard page (index.html)

function renderDashboard() {
  const total = PROBLEMS.length;
  const solved = getSolvedCount();
  const percent = progressPercent();

  document.getElementById("welcome").textContent = "Welcome back, " + getUsername() + " 👋";
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statSolved").textContent = solved;
  document.getElementById("statUnsolved").textContent = total - solved;
  document.getElementById("statStreak").textContent = getStreak() + " 🔥";
  document.getElementById("progressText").textContent = "Problems Solved: " + solved + " / " + total;
  document.getElementById("progressAscii").textContent = textBar(percent);
  document.getElementById("progressFill").style.width = percent + "%";

  renderRecent();
  renderDaily();
  renderLeaderboard();
}

function renderRecent() {
  const box = document.getElementById("recentList");
  const problems = getList(KEYS.recent).map(getProblemById).filter(Boolean);
  if (problems.length === 0) {
    box.innerHTML = '<div class="empty">You haven\'t tried any problem yet.<br><a class="btn primary" href="problems.html">Start practicing</a></div>';
    return;
  }
  box.innerHTML = problems.map(problemRowHtml).join("");
}

function renderDaily() {
  const p = getDailyProblem();
  document.getElementById("dailyBox").innerHTML =
    '<h3>' + escapeHtml(p.title) + '</h3>' +
    '<p>' + difficultyBadge(p.difficulty) + ' <span class="tag">' + p.topic + '</span></p>' +
    '<p class="muted">A new challenge appears every day. Today: ' + todayString() + '</p>' +
    '<a class="btn primary" href="problem.html?id=' + p.id + '">Start Practicing</a>';
}

// DEMO data only - these are made-up users, not real people
function renderLeaderboard() {
  const rows = [
    { name: "ByteBuddy", score: 290 }, { name: "LoopMaster", score: 240 },
    { name: "NullPointer", score: 180 }, { name: "ArrayAce", score: 120 },
    { name: "BugHunter", score: 60 },
    { name: getUsername() + " (you)", score: getSolvedCount() * 10, you: true }
  ];
  rows.sort(function (a, b) { return b.score - a.score; });
  document.getElementById("leaderboard").innerHTML = rows.map(function (r, i) {
    return '<div class="lb-row ' + (r.you ? "you" : "") + '"><span>' + (i + 1) + '. ' + escapeHtml(r.name) + '</span><strong>' + r.score + ' pts</strong></div>';
  }).join("");
}

renderDashboard();

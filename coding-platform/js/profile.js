// profile.js - profile page

function renderProfile() {
  const name = getUsername();
  document.getElementById("avatar").textContent = name.charAt(0).toUpperCase();
  document.getElementById("profileName").textContent = name;
  document.getElementById("pSolved").textContent = getSolvedCount() + " / " + PROBLEMS.length;
  document.getElementById("pAttempts").textContent = getTotalAttempts();
  document.getElementById("pBookmarks").textContent = getList(KEYS.bookmarks).length;
  document.getElementById("pStreak").textContent = getStreak() + " days";
  document.getElementById("pProgress").textContent = textBar(progressPercent());
  document.getElementById("nameInput").value = name;
}

document.getElementById("nameForm").addEventListener("submit", function (event) {
  event.preventDefault();                       // stop the page from reloading
  const name = document.getElementById("nameInput").value.trim();
  if (name === "") { showToast("Please enter a display name.", "error"); return; }
  if (name.length > 20) { showToast("Name must be 20 characters or fewer.", "error"); return; }
  saveData(KEYS.username, name);
  renderProfile();
  showToast("Name saved!", "success");
});

document.getElementById("resetBtn").addEventListener("click", function () {
  if (confirm("Delete all solved problems, bookmarks and streak?")) {
    resetAllProgress();
    renderProfile();
    showToast("Progress reset.", "info");
  }
});

renderProfile();

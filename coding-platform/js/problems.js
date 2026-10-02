// problems.js - Problems list page: filters + search

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const TOPICS = ["Arrays", "Strings", "Searching", "Sorting", "Loops", "Functions", "Basic Mathematics"];
const filters = { difficulty: "All", topic: "All", search: "" };

// Make the filter buttons
function renderFilterButtons() {
  function chips(list, group) {
    return ["All"].concat(list).map(function (name) {
      const active = filters[group] === name ? "active" : "";
      return '<button class="chip ' + active + '" data-group="' + group + '" data-value="' + name + '">' + name + '</button>';
    }).join("");
  }
  document.getElementById("difficultyChips").innerHTML = chips(DIFFICULTIES, "difficulty");
  document.getElementById("topicChips").innerHTML = chips(TOPICS, "topic");
}

// Show the problems that match every filter
function renderProblems() {
  const text = filters.search.toLowerCase();
  const result = PROBLEMS.filter(function (p) {
    return (filters.difficulty === "All" || p.difficulty === filters.difficulty) &&
           (filters.topic === "All" || p.topic === filters.topic) &&
           p.title.toLowerCase().includes(text);
  });
  document.getElementById("count").textContent = "Showing " + result.length + " of " + PROBLEMS.length + " problems";
  const list = document.getElementById("problemList");
  if (result.length === 0) {
    list.innerHTML = '<div class="empty">No matching problems. Try a different filter or search word.</div>';
  } else {
    list.innerHTML = result.map(problemRowHtml).join("");
  }
}

// Click on a filter button
document.addEventListener("click", function (event) {
  const chip = event.target.closest(".chip");
  if (!chip) return;
  filters[chip.getAttribute("data-group")] = chip.getAttribute("data-value");
  renderFilterButtons();
  renderProblems();
});

// Typing in the search bar
document.getElementById("searchInput").addEventListener("input", function (event) {
  const value = event.target.value.trim();
  const message = document.getElementById("searchMessage");
  if (/[<>{}\\\/]/.test(value)) {
    message.textContent = "Invalid search: please use letters and numbers only.";
    return;
  }
  message.textContent = "";
  filters.search = value;
  renderProblems();
});

document.addEventListener("bookmarkchange", renderProblems);
renderFilterButtons();
renderProblems();

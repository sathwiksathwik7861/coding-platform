// problem.js - the problem solving page (problem.html?id=3)
// IMPORTANT: Run/Submit are a FRONTEND SIMULATION. Code is never compiled or executed.

const LANG_NAMES = { c: "C", cpp: "C++", python: "Python", javascript: "JavaScript" };
const id = parseInt(getParam("id"), 10);       // text from URL -> number
const problem = getProblemById(id);
let language = getLanguage();

// Starter code is built from the problem hint + a template for each language
function buildStarter(p, lang) {
  const hint = "Task: " + p.starter;
  if (lang === "c")  return "#include <stdio.h>\n\nint main() {\n    // " + hint + "\n\n    return 0;\n}\n";
  if (lang === "cpp") return "#include <iostream>\nusing namespace std;\n\nint main() {\n    // " + hint + "\n\n    return 0;\n}\n";
  if (lang === "python") return "# " + hint + "\n\n";
  return "// " + hint + "\n// Use console.log() to print.\n\n";
}

function showInvalid() {
  document.getElementById("problemPage").innerHTML =
    '<div class="empty">⚠️ Invalid problem ID. That problem does not exist.<br><a class="btn primary" href="problems.html">Back to problems</a></div>';
}

function renderProblem() {
  const ex = problem.examples[0];
  document.getElementById("problemPanel").innerHTML =
    '<div class="problem-head"><h2>#' + problem.id + ' ' + escapeHtml(problem.title) + '</h2>' +
    '<button class="icon-btn bookmark-btn ' + (isBookmarked(id) ? "active" : "") + '" data-id="' + id + '" title="Bookmark">' + (isBookmarked(id) ? "★" : "☆") + '</button></div>' +
    '<p>' + difficultyBadge(problem.difficulty) + ' <span class="tag">' + problem.topic + '</span> <span id="solvedTag" class="status ' + (isSolved(id) ? "solved" : "") + '">' + (isSolved(id) ? "✔ Solved" : "○ Unsolved") + '</span></p>' +
    '<h4>Description</h4><p>' + escapeHtml(problem.description) + '</p>' +
    '<h4>Input Format</h4><p>' + escapeHtml(problem.input) + '</p>' +
    '<h4>Output Format</h4><p>' + escapeHtml(problem.output) + '</p>' +
    '<h4>Constraints</h4><p>' + escapeHtml(problem.constraints) + '</p>' +
    '<h4>Example</h4><div class="example"><strong>Input</strong><pre>' + escapeHtml(ex.input) + '</pre><strong>Output</strong><pre>' + escapeHtml(ex.output) + '</pre></div>' +
    '<h4>Explanation</h4><p>' + escapeHtml(problem.explanation) + '</p>';
}

// ----- Editor -----
const editor = document.getElementById("codeEditor");
const lineNumbers = document.getElementById("lineNumbers");
const consoleBox = document.getElementById("consoleBox");

function updateLineNumbers() {
  const count = editor.value.split("\n").length;
  let text = "";
  for (let i = 1; i <= count; i++) text += i + "\n";
  lineNumbers.textContent = text;
}

function loadEditor() {
  const saved = getSavedCode(id, language);
  editor.value = (typeof saved === "string") ? saved : buildStarter(problem, language);
  updateLineNumbers();
}

// print a message in the console area. kind = "ok" | "bad" | "info"
function print(lines, kind) {
  consoleBox.className = "console " + (kind || "");
  consoleBox.innerHTML = lines.map(escapeHtml).join("<br>");
}

const SIM_NOTE = "[Frontend simulation - your code is NOT compiled or executed]";

function runCode() {
  const code = editor.value.trim();
  if (code === "") { print(["Error: your code is empty. Write some code first."], "bad"); return; }
  markAttempted(id);
  const ex = problem.examples[0];
  print([SIM_NOTE, "Language: " + LANG_NAMES[language], "Sample input:", ex.input,
         "Expected output:", ex.output, "", "Tip: press Submit to check your code."], "info");
}

function submitCode() {
  const code = editor.value.trim();
  if (code === "") { print(["Error: empty submission. Write some code first."], "bad"); showToast("Empty code", "error"); return; }
  markAttempted(id);
  if (code === buildStarter(problem, language).trim()) {
    print([SIM_NOTE, "You have not changed the starter code yet."], "bad"); return;
  }
  // Simulated check: does the code contain at least one expected keyword?
  const lower = code.toLowerCase();
  const passed = problem.keywords.some(function (k) { return lower.includes(k.toLowerCase()); });
  if (passed) {
    markSolved(id);
    print([SIM_NOTE, "✔ Accepted (simulated). Nice work!", "Expected output for the sample: " + problem.examples[0].output], "ok");
    showToast("Problem solved! 🎉", "success");
    const tag = document.getElementById("solvedTag");
    if (tag) { tag.textContent = "✔ Solved"; tag.classList.add("solved"); }
  } else {
    print([SIM_NOTE, "✘ Wrong answer (simulated).", "Your code is missing something this problem needs.",
           "Hint: try using one of these: " + problem.keywords.join("  ")], "bad");
    showToast("Not accepted yet", "error");
  }
}

function init() {
  if (!problem) { showInvalid(); return; }
  renderProblem();
  const select = document.getElementById("languageSelect");
  select.value = language;
  loadEditor();

  select.addEventListener("change", function () {
    saveCode(id, language, editor.value);       // keep what they typed
    language = select.value;
    saveData(KEYS.language, language);
    loadEditor();
  });
  editor.addEventListener("input", function () { updateLineNumbers(); saveCode(id, language, editor.value); });
  editor.addEventListener("scroll", function () { lineNumbers.scrollTop = editor.scrollTop; });
  document.getElementById("runBtn").addEventListener("click", runCode);
  document.getElementById("submitBtn").addEventListener("click", submitCode);
  document.getElementById("resetBtn").addEventListener("click", function () {
    editor.value = buildStarter(problem, language);
    saveCode(id, language, editor.value);
    updateLineNumbers();
    print(["Code reset to the starter template."], "info");
  });
}
init();

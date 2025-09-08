// codeql-test.js
// This file is ONLY for testing CodeQL alerts.

const { exec } = require("child_process");
const http = require("http");
const fs = require("fs");

// ---- Example 1: Command injection (CodeQL should flag) ----
function runCommand(userInput) {
  // BAD: never pass raw user input to exec!
  exec("ls " + userInput, (err, stdout, stderr) => {
    if (err) console.error("Error:", err);
    else console.log("Output:", stdout);
  });
}

// ---- Example 2: Path traversal (CodeQL should flag) ----
function readFile(userInput) {
  // BAD: using user input directly in file path
  const data = fs.readFileSync("/etc/" + userInput, "utf8");
  console.log(data);
}

// ---- Example 3: XSS via innerHTML (CodeQL should flag) ----
function render(userInput) {
  const div = document.createElement("div");
  // BAD: unsafe write to innerHTML
  div.innerHTML = userInput;
  document.body.appendChild(div);
}

// Simulate “user inputs”
runCommand("dummy.txt");
readFile("passwd");
render("<img src=x onerror=alert('CodeQL')>");
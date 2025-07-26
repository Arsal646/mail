const fs = require("fs");
const path = require("path");

// Set paths
const sourceDir = "dist/temp-mail/browser/en";
const targetDir = "dist/temp-mail/browser";

// Copy all files from /en to browser/
fs.readdirSync(sourceDir).forEach(file => {
  const src = path.join(sourceDir, file);
  const dest = path.join(targetDir, file);
  fs.copyFileSync(src, dest);
});

// Remove the /en folder
fs.rmSync(sourceDir, { recursive: true, force: true });

console.log("Moved English files out of /en folder.");

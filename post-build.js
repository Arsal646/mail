// post-build.js
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const sourceDir = path.join(__dirname, 'dist/temp-mail/browser/en');
const destDir = path.join(__dirname, 'dist/temp-mail/browser');

if (fs.existsSync(sourceDir)) {
  fse.copySync(sourceDir, destDir, { overwrite: true });
  fse.removeSync(sourceDir);
  console.log('Moved files from /en to root and deleted /en folder');
} else {
  console.log('No /en folder found, skipping post-build step.');
}

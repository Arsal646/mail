#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Build script for Opera extension
console.log('🚀 Building Opera Extension...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy all files to dist directory
const sourceDir = __dirname;
const filesToCopy = [
    'manifest.json',
    'popup.html',
    'popup.css',
    'popup.js',
    'background.js',
    'content.js',
    'package.json',
    'README.md',
    'OPERA_INSTALLATION.md',
    'persona.ini',
    'icon128.png'
];

// Copy files
filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(distDir, file);
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied ${file}`);
    } else {
        console.log(`⚠️  Warning: ${file} not found`);
    }
});

// Copy icons directory
const iconsSourceDir = path.join(sourceDir, 'icons');
const iconsDestDir = path.join(distDir, 'icons');

if (fs.existsSync(iconsSourceDir)) {
    if (!fs.existsSync(iconsDestDir)) {
        fs.mkdirSync(iconsDestDir, { recursive: true });
    }
    
    const iconFiles = fs.readdirSync(iconsSourceDir);
    iconFiles.forEach(file => {
        const sourcePath = path.join(iconsSourceDir, file);
        const destPath = path.join(iconsDestDir, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied icons/${file}`);
    });
} else {
    console.log('⚠️  Warning: icons directory not found');
}

// Create zip file for distribution
const output = fs.createWriteStream(path.join(distDir, 'temporary-email-opera-extension.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', () => {
    console.log('✅ Opera extension built successfully!');
    console.log(`📦 Extension packaged: ${path.join(distDir, 'temporary-email-opera-extension.zip')}`);
    console.log('📁 Files ready in: dist/');
    console.log('');
    console.log('📋 Installation Instructions:');
    console.log('1. Open Opera browser');
    console.log('2. Go to opera://extensions/');
    console.log('3. Enable Developer mode');
    console.log('4. Click "Load unpacked"');
    console.log('5. Select the dist/ folder');
    console.log('');
    console.log('🎉 Extension ready for Opera!');
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

// Add all files to zip
archive.directory(distDir, false);

archive.finalize(); 
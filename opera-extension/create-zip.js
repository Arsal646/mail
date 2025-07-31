#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('📦 Creating Opera Extension ZIP...');

// Create output stream
const output = fs.createWriteStream(path.join(__dirname, '../temporary-email-opera-extension.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', () => {
    console.log('✅ ZIP file created successfully!');
    console.log(`📁 File: ${path.join(__dirname, '../temporary-email-opera-extension.zip')}`);
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Go to https://addons.opera.com/developer/');
    console.log('2. Sign in with your Opera account');
    console.log('3. Click "Upload Extension"');
    console.log('4. Select the temporary-email-opera-extension.zip file');
    console.log('5. Wait for processing and check for any errors');
    console.log('');
    console.log('🎉 Extension ready for Opera upload!');
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

// Add all files from opera-extension directory to ZIP root
archive.directory(__dirname, false);

archive.finalize(); 
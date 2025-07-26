#!/usr/bin/env node

/**
 * Build script for Temporary Email Service Chrome Extension
 * This script helps with development and packaging
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    sourceDir: './',
    outputDir: './dist',
    files: [
        'manifest.json',
        'popup.html',
        'popup.css',
        'popup.js',
        'background.js',
        'content.js',
        'README.md'
    ],
    iconSizes: [16, 32, 48, 128]
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
    log(`❌ ${message}`, 'red');
}

function success(message) {
    log(`✅ ${message}`, 'green');
}

function info(message) {
    log(`ℹ️  ${message}`, 'blue');
}

function warning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

// Check if file exists
function fileExists(filePath) {
    return fs.existsSync(path.join(config.sourceDir, filePath));
}

// Create directory if it doesn't exist
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Copy file
function copyFile(source, destination) {
    try {
        fs.copyFileSync(source, destination);
        return true;
    } catch (err) {
        error(`Failed to copy ${source}: ${err.message}`);
        return false;
    }
}

// Validate manifest.json
function validateManifest() {
    try {
        const manifestPath = path.join(config.sourceDir, 'manifest.json');
        const manifestContent = fs.readFileSync(manifestPath, 'utf8');
        const manifest = JSON.parse(manifestContent);
        
        // Basic validation
        const requiredFields = ['manifest_version', 'name', 'version', 'description'];
        for (const field of requiredFields) {
            if (!manifest[field]) {
                error(`Missing required field in manifest.json: ${field}`);
                return false;
            }
        }
        
        success('Manifest validation passed');
        return true;
    } catch (err) {
        error(`Manifest validation failed: ${err.message}`);
        return false;
    }
}

// Check for icon files
function checkIcons() {
    const missingIcons = [];
    
    for (const size of config.iconSizes) {
        const iconPath = `icons/icon${size}.png`;
        if (!fileExists(iconPath)) {
            missingIcons.push(iconPath);
        }
    }
    
    if (missingIcons.length > 0) {
        warning(`Missing icon files: ${missingIcons.join(', ')}`);
        warning('Please create the missing icon files or replace the placeholder files');
        return false;
    }
    
    success('All icon files found');
    return true;
}

// Build extension
function build() {
    log('🚀 Building Chrome Extension...', 'bright');
    
    // Validate manifest
    if (!validateManifest()) {
        process.exit(1);
    }
    
    // Check icons
    checkIcons();
    
    // Create output directory
    ensureDir(config.outputDir);
    ensureDir(path.join(config.outputDir, 'icons'));
    
    // Copy files
    let copiedFiles = 0;
    for (const file of config.files) {
        const sourcePath = path.join(config.sourceDir, file);
        const destPath = path.join(config.outputDir, file);
        
        if (fileExists(file)) {
            if (copyFile(sourcePath, destPath)) {
                copiedFiles++;
            }
        } else {
            warning(`File not found: ${file}`);
        }
    }
    
    // Copy icons
    for (const size of config.iconSizes) {
        const iconFile = `icons/icon${size}.png`;
        if (fileExists(iconFile)) {
            const sourcePath = path.join(config.sourceDir, iconFile);
            const destPath = path.join(config.outputDir, iconFile);
            if (copyFile(sourcePath, destPath)) {
                copiedFiles++;
            }
        }
    }
    
    success(`Built extension successfully! Copied ${copiedFiles} files to ${config.outputDir}`);
    info(`To load in Chrome: chrome://extensions/ → Load unpacked → Select ${config.outputDir}`);
}

// Clean build directory
function clean() {
    try {
        if (fs.existsSync(config.outputDir)) {
            fs.rmSync(config.outputDir, { recursive: true, force: true });
            success(`Cleaned ${config.outputDir}`);
        } else {
            info('No build directory to clean');
        }
    } catch (err) {
        error(`Failed to clean: ${err.message}`);
    }
}

// Watch for changes
function watch() {
    log('👀 Watching for changes...', 'bright');
    
    fs.watch(config.sourceDir, { recursive: true }, (eventType, filename) => {
        if (filename && config.files.includes(filename)) {
            log(`📝 File changed: ${filename}`, 'yellow');
            build();
        }
    });
}

// Show help
function showHelp() {
    log('Temporary Email Service Chrome Extension Build Tool', 'bright');
    log('');
    log('Usage: node build.js [command]', 'bright');
    log('');
    log('Commands:');
    log('  build    Build the extension (default)');
    log('  clean    Clean the build directory');
    log('  watch    Watch for changes and rebuild');
    log('  help     Show this help message');
    log('');
    log('Examples:');
    log('  node build.js build');
    log('  node build.js clean');
    log('  node build.js watch');
}

// Main execution
const command = process.argv[2] || 'build';

switch (command) {
    case 'build':
        build();
        break;
    case 'clean':
        clean();
        break;
    case 'watch':
        watch();
        break;
    case 'help':
        showHelp();
        break;
    default:
        error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
} 
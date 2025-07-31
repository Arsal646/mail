#!/usr/bin/env node

/**
 * Chrome Extension Test Script
 * Validates extension files and provides testing feedback
 */

const fs = require('fs');
const path = require('path');

// Configuration
const EXTENSION_DIR = __dirname;
const REQUIRED_FILES = [
    'manifest.json',
    'popup.html',
    'popup.css',
    'popup.js',
    'background.js',
    'content.js'
];

const REQUIRED_ICONS = [
    'icons/icon16.png',
    'icons/icon32.png',
    'icons/icon48.png',
    'icons/icon128.png'
];

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

// Test functions
function testFileExists(filePath) {
    const fullPath = path.join(EXTENSION_DIR, filePath);
    return fs.existsSync(fullPath);
}

function testManifestJson() {
    try {
        const manifestPath = path.join(EXTENSION_DIR, 'manifest.json');
        const manifestContent = fs.readFileSync(manifestPath, 'utf8');
        const manifest = JSON.parse(manifestContent);
        
        // Basic validation
        const requiredFields = ['name', 'version', 'manifest_version', 'permissions'];
        const missingFields = requiredFields.filter(field => !manifest[field]);
        
        if (missingFields.length > 0) {
            logError(`Manifest missing required fields: ${missingFields.join(', ')}`);
            return false;
        }
        
        logSuccess('Manifest.json is valid');
        return true;
    } catch (error) {
        logError(`Manifest.json validation failed: ${error.message}`);
        return false;
    }
}

function testPopupHtml() {
    try {
        const popupPath = path.join(EXTENSION_DIR, 'popup.html');
        const popupContent = fs.readFileSync(popupPath, 'utf8');
        
        // Check for required elements
        const requiredElements = [
            'popup.js',
            'popup.css',
            'currentEmail',
            'newEmailBtn',
            'copyBtn'
        ];
        
        const missingElements = requiredElements.filter(element => !popupContent.includes(element));
        
        if (missingElements.length > 0) {
            logWarning(`Popup.html missing elements: ${missingElements.join(', ')}`);
            return false;
        }
        
        logSuccess('Popup.html is valid');
        return true;
    } catch (error) {
        logError(`Popup.html validation failed: ${error.message}`);
        return false;
    }
}

function testJavaScriptFiles() {
    const jsFiles = ['popup.js', 'background.js', 'content.js'];
    let allValid = true;
    
    jsFiles.forEach(file => {
        const filePath = path.join(EXTENSION_DIR, file);
        if (fs.existsSync(filePath)) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                // Basic syntax check (very basic)
                if (content.includes('chrome.') || content.includes('document.') || content.includes('window.')) {
                    logSuccess(`${file} is valid`);
                } else {
                    logWarning(`${file} may have issues`);
                    allValid = false;
                }
            } catch (error) {
                logError(`${file} validation failed: ${error.message}`);
                allValid = false;
            }
        } else {
            logError(`${file} not found`);
            allValid = false;
        }
    });
    
    return allValid;
}

function testIcons() {
    let allValid = true;
    
    REQUIRED_ICONS.forEach(icon => {
        if (testFileExists(icon)) {
            logSuccess(`${icon} exists`);
        } else {
            logWarning(`${icon} is missing (placeholder file)`);
            allValid = false;
        }
    });
    
    return allValid;
}

function runAllTests() {
    log('🔍 Starting Chrome Extension Tests...', 'bold');
    log('');
    
    let passedTests = 0;
    let totalTests = 0;
    
    // Test required files
    log('📁 Testing Required Files:', 'bold');
    REQUIRED_FILES.forEach(file => {
        totalTests++;
        if (testFileExists(file)) {
            logSuccess(`${file} exists`);
            passedTests++;
        } else {
            logError(`${file} missing`);
        }
    });
    
    log('');
    
    // Test manifest
    log('📋 Testing Manifest:', 'bold');
    totalTests++;
    if (testManifestJson()) {
        passedTests++;
    }
    
    log('');
    
    // Test popup HTML
    log('🌐 Testing Popup HTML:', 'bold');
    totalTests++;
    if (testPopupHtml()) {
        passedTests++;
    }
    
    log('');
    
    // Test JavaScript files
    log('⚡ Testing JavaScript Files:', 'bold');
    totalTests++;
    if (testJavaScriptFiles()) {
        passedTests++;
    }
    
    log('');
    
    // Test icons
    log('🎨 Testing Icons:', 'bold');
    totalTests++;
    if (testIcons()) {
        passedTests++;
    }
    
    log('');
    
    // Summary
    log('📊 Test Summary:', 'bold');
    log(`Passed: ${passedTests}/${totalTests} tests`);
    
    if (passedTests === totalTests) {
        logSuccess('🎉 All tests passed! Extension is ready for loading.');
        log('');
        logInfo('Next steps:');
        logInfo('1. Open Chrome and go to chrome://extensions/');
        logInfo('2. Enable Developer Mode');
        logInfo('3. Click "Load unpacked" and select this folder');
        logInfo('4. Test the extension using the TESTING_GUIDE.md');
    } else {
        logError('Some tests failed. Please fix the issues before loading the extension.');
    }
    
    log('');
    log('📖 For detailed testing instructions, see TESTING_GUIDE.md', 'blue');
}

// Run tests if this script is executed directly
if (require.main === module) {
    runAllTests();
}

module.exports = {
    runAllTests,
    testFileExists,
    testManifestJson,
    testPopupHtml,
    testJavaScriptFiles,
    testIcons
}; 
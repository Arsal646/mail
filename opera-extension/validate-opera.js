#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Opera Extension...');

// Required files for Opera extension
const requiredFiles = [
    'manifest.json',
    'popup.html',
    'popup.css',
    'popup.js',
    'background.js',
    'content.js',
    'persona.ini',
    'icon16.png',
    'icon32.png',
    'icon48.png',
    'icon128.png',
    'logo.png'
];

// Required icon sizes (now in root directory)
const requiredIconSizes = [
    'icon16.png',
    'icon32.png',
    'icon48.png',
    'icon128.png'
];

let allValid = true;

// Check required files
console.log('\n📁 Checking required files...');
requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allValid = false;
    }
});

// Check manifest.json
console.log('\n📋 Validating manifest.json...');
const manifestPath = path.join(__dirname, 'manifest.json');
if (fs.existsSync(manifestPath)) {
    try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        
        // Check required manifest fields
        const requiredFields = ['manifest_version', 'name', 'version', 'description'];
        requiredFields.forEach(field => {
            if (manifest[field]) {
                console.log(`✅ ${field}: ${manifest[field]}`);
            } else {
                console.log(`❌ ${field} - MISSING`);
                allValid = false;
            }
        });
        
        // Check for Opera-specific name
        if (manifest.name && manifest.name.includes('Opera')) {
            console.log('✅ Extension name includes "Opera"');
        } else {
            console.log('⚠️  Extension name should include "Opera" for clarity');
        }
        
        // Check permissions
        if (manifest.permissions && Array.isArray(manifest.permissions)) {
            console.log(`✅ Permissions: ${manifest.permissions.join(', ')}`);
        } else {
            console.log('❌ Permissions missing or invalid');
            allValid = false;
        }
        
    } catch (error) {
        console.log(`❌ manifest.json is invalid JSON: ${error.message}`);
        allValid = false;
    }
} else {
    console.log('❌ manifest.json not found');
    allValid = false;
}

// Check icons in root directory
console.log('\n🎨 Checking icons in root directory...');
const requiredIcons = ['icon16.png', 'icon32.png', 'icon48.png', 'icon128.png', 'logo.png'];
requiredIcons.forEach(icon => {
    const iconPath = path.join(__dirname, icon);
    if (fs.existsSync(iconPath)) {
        console.log(`✅ ${icon}`);
    } else {
        console.log(`❌ ${icon} - MISSING`);
        allValid = false;
    }
});

// Check package.json
console.log('\n📦 Checking package.json...');
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
    try {
        const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (package.name && package.name.includes('opera')) {
            console.log('✅ Package name includes "opera"');
        } else {
            console.log('⚠️  Package name should include "opera" for clarity');
        }
        
        if (package.description && package.description.includes('Opera')) {
            console.log('✅ Package description mentions Opera');
        } else {
            console.log('⚠️  Package description should mention Opera');
        }
    } catch (error) {
        console.log(`❌ package.json is invalid JSON: ${error.message}`);
        allValid = false;
    }
} else {
    console.log('❌ package.json not found');
    allValid = false;
}

// Check persona.ini
console.log('\n🎭 Checking persona.ini...');
const personaPath = path.join(__dirname, 'persona.ini');
if (fs.existsSync(personaPath)) {
    try {
        const personaContent = fs.readFileSync(personaPath, 'utf8');
        if (personaContent.includes('[Info]')) {
            console.log('✅ persona.ini has valid [Info] section');
        } else {
            console.log('❌ persona.ini missing [Info] section');
            allValid = false;
        }
        
        if (personaContent.includes('name=')) {
            console.log('✅ persona.ini has name field');
        } else {
            console.log('❌ persona.ini missing name field');
            allValid = false;
        }
        
        if (personaContent.includes('version=')) {
            console.log('✅ persona.ini has version field');
        } else {
            console.log('❌ persona.ini missing version field');
            allValid = false;
        }
        
        if (personaContent.includes('description=')) {
            console.log('✅ persona.ini has description field');
        } else {
            console.log('❌ persona.ini missing description field');
            allValid = false;
        }
        
        if (personaContent.includes('[Window Image]')) {
            console.log('✅ persona.ini has valid [Window Image] section');
        } else {
            console.log('❌ persona.ini missing [Window Image] section');
            allValid = false;
        }
        
        if (personaContent.includes('image=')) {
            console.log('✅ persona.ini has image field');
        } else {
            console.log('❌ persona.ini missing image field');
            allValid = false;
        }
        
        if (personaContent.includes('background=')) {
            console.log('✅ persona.ini has background field');
        } else {
            console.log('❌ persona.ini missing background field');
            allValid = false;
        }
        
        if (personaContent.includes('Type=')) {
            console.log('✅ persona.ini has Type field');
        } else {
            console.log('❌ persona.ini missing Type field');
            allValid = false;
        }
        
    } catch (error) {
        console.log(`❌ Error reading persona.ini: ${error.message}`);
        allValid = false;
    }
} else {
    console.log('❌ persona.ini not found');
    allValid = false;
}

// Final result
console.log('\n' + '='.repeat(50));
if (allValid) {
    console.log('🎉 Opera extension validation PASSED!');
    console.log('✅ All required files are present');
    console.log('✅ Manifest is properly configured');
    console.log('✅ Icons are available');
    console.log('\n📋 Ready for Opera installation:');
    console.log('1. Open Opera browser');
    console.log('2. Go to opera://extensions/');
    console.log('3. Enable Developer mode');
    console.log('4. Click "Load unpacked"');
    console.log('5. Select this folder');
} else {
    console.log('❌ Opera extension validation FAILED!');
    console.log('Please fix the issues above before installing in Opera.');
}
console.log('='.repeat(50)); 
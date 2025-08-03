const fs = require('fs');
const path = require('path');

// Read the English messages file
const englishFile = fs.readFileSync('src/locale/messages.xlf', 'utf8');
const arabicFile = fs.readFileSync('src/locale/messages.ar.xlf', 'utf8');

// Extract all trans-unit IDs from English file
const englishIds = [];
const englishMatches = englishFile.matchAll(/<trans-unit id="([^"]+)"/g);
for (const match of englishMatches) {
    englishIds.push(match[1]);
}

// Extract all trans-unit IDs from Arabic file
const arabicIds = [];
const arabicMatches = arabicFile.matchAll(/<trans-unit id="([^"]+)"/g);
for (const match of arabicMatches) {
    arabicIds.push(match[1]);
}

// Find missing translations
const missingInArabic = englishIds.filter(id => !arabicIds.includes(id));

console.log(`📊 Translation Status:`);
console.log(`✅ Total English messages: ${englishIds.length}`);
console.log(`✅ Total Arabic translations: ${arabicIds.length}`);
console.log(`❌ Missing Arabic translations: ${missingInArabic.length}`);
console.log('');

if (missingInArabic.length > 0) {
    console.log('🔍 Missing Arabic translations for these IDs:');
    console.log('='.repeat(50));
    
    // Group by component/page for better organization
    const grouped = {};
    missingInArabic.forEach(id => {
        const parts = id.split('.');
        const component = parts[0] || 'unknown';
        if (!grouped[component]) {
            grouped[component] = [];
        }
        grouped[component].push(id);
    });
    
    Object.keys(grouped).sort().forEach(component => {
        console.log(`\n📁 ${component.toUpperCase()}:`);
        grouped[component].forEach(id => {
            // Find the English text for this ID
            const englishMatch = englishFile.match(new RegExp(`<trans-unit id="${id}"[^>]*>[\\s\\S]*?<source>([\\s\\S]*?)</source>`));
            const englishText = englishMatch ? englishMatch[1].trim() : 'Text not found';
            console.log(`   • ${id}`);
            console.log(`     EN: "${englishText}"`);
        });
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('💡 To add these translations:');
    console.log('1. Copy the missing trans-unit blocks from messages.xlf');
    console.log('2. Add them to messages.ar.xlf');
    console.log('3. Add <target>Arabic translation</target> for each');
} else {
    console.log('🎉 All translations are up to date!');
}
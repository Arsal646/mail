const fs = require('fs');

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

if (missingInArabic.length > 0) {
    console.log('📝 Generating missing translation templates...\n');
    
    let missingTranslations = '';
    
    missingInArabic.forEach(id => {
        // Extract the full trans-unit block from English file
        const regex = new RegExp(`(<trans-unit id="${id}"[\\s\\S]*?</trans-unit>)`, 'g');
        const match = englishFile.match(regex);
        
        if (match) {
            let englishBlock = match[0];
            
            // Add target element with placeholder
            const sourceEndIndex = englishBlock.indexOf('</source>');
            if (sourceEndIndex !== -1) {
                const beforeSource = englishBlock.substring(0, sourceEndIndex + 9);
                const afterSource = englishBlock.substring(sourceEndIndex + 9);
                
                // Extract source text for reference
                const sourceMatch = englishBlock.match(/<source>([\s\S]*?)<\/source>/);
                const sourceText = sourceMatch ? sourceMatch[1].trim() : '';
                
                englishBlock = beforeSource + '\n        <target><!-- TODO: Add Arabic translation for: ' + sourceText.replace(/<!--.*?-->/g, '').replace(/<[^>]*>/g, '').trim() + ' --></target>' + afterSource;
            }
            
            missingTranslations += '      ' + englishBlock + '\n\n';
        }
    });
    
    // Write to a new file
    fs.writeFileSync('missing-translations.xml', `<!-- Missing Arabic Translations -->
<!-- Copy these trans-unit blocks to your messages.ar.xlf file -->
<!-- Replace the TODO comments with actual Arabic translations -->

${missingTranslations}`);
    
    console.log('✅ Generated missing-translations.xml file');
    console.log('📋 Instructions:');
    console.log('1. Open missing-translations.xml');
    console.log('2. Copy the trans-unit blocks');
    console.log('3. Paste them into src/locale/messages.ar.xlf before the closing </body> tag');
    console.log('4. Replace the TODO comments with actual Arabic translations');
    console.log('5. Remove the <!-- TODO: ... --> comments');
    
} else {
    console.log('🎉 All translations are up to date!');
}
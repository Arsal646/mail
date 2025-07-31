# Opera Extension Upload Guide

## Step-by-Step Upload Instructions

### Step 1: Verify Files Are Present

First, ensure all required files are in the `opera-extension` directory:

```bash
# Check that these files exist in opera-extension/
- manifest.json
- popup.html
- popup.css
- popup.js
- background.js
- content.js
- persona.ini
- icon128.png (in root directory)
- package.json
- README.md
- OPERA_INSTALLATION.md
- OPERA_SUMMARY.md
- PERSONA_EXPLANATION.md
- build-opera.js
- validate-opera.js
- icons/ (folder with all icon files)
```

### Step 2: Run Validation

Before uploading, run the validation script:

```bash
cd opera-extension
node validate-opera.js
```

You should see:
```
🎉 Opera extension validation PASSED!
✅ All required files are present
✅ Manifest is properly configured
✅ Icons are available
```

### Step 3: Create Proper ZIP File

**IMPORTANT**: Create the ZIP file correctly to avoid path issues.

#### Method A: Using Windows Explorer
1. Navigate to the `opera-extension` folder
2. Select ALL files and folders inside `opera-extension`
3. Right-click → "Send to" → "Compressed (zipped) folder"
4. Rename the ZIP file to `temporary-email-opera-extension.zip`

#### Method B: Using Command Line
```bash
# Navigate to the parent directory (mail/)
cd ..

# Create ZIP from opera-extension folder
powershell Compress-Archive -Path "opera-extension\*" -DestinationPath "temporary-email-opera-extension.zip"
```

#### Method C: Using Build Script
```bash
cd opera-extension
npm run build-opera
```

#### Method D: Using Clean ZIP Script (Recommended)
```bash
cd opera-extension
npm run create-clean-zip
```

**Note**: Method D is recommended as it excludes problematic files that Opera doesn't allow.

### Step 4: Verify ZIP Contents

Before uploading, verify the ZIP contains files at the root level:

1. Extract the ZIP file to a temporary location
2. Check that these files are at the root (not in a subfolder):
   - `manifest.json`
   - `persona.ini`
   - `icon128.png`
   - `popup.html`
   - `background.js`
   - etc.

### Step 5: Upload to Opera

1. **Open Opera Browser**
2. **Go to Opera Add-ons Developer Portal**
   - Visit: https://addons.opera.com/developer/
   - Sign in with your Opera account

3. **Upload Extension**
   - Click "Upload Extension"
   - Select your `temporary-email-opera-extension.zip` file
   - Wait for processing

4. **Check for Errors**
   - If you get errors, note them down
   - Common issues:
     - Files not found (check ZIP structure)
     - Invalid persona.ini (check format)
     - Missing required fields

### Step 6: Troubleshooting

#### If "File not found" errors occur:

1. **Check ZIP Structure**
   ```
   ✅ CORRECT:
   temporary-email-opera-extension.zip
   ├── manifest.json
   ├── persona.ini
   ├── icon128.png
   ├── popup.html
   └── icons/
       ├── icon16.png
       ├── icon32.png
       └── icon48.png

   ❌ WRONG:
   temporary-email-opera-extension.zip
   └── opera-extension/
       ├── manifest.json
       ├── persona.ini
       └── icon128.png
   ```

#### If "Illegal paths" errors occur:

1. **Use Clean ZIP Script**
   ```bash
   npm run create-clean-zip
   ```
   This excludes problematic files like:
   - android-chrome-192x192.png
   - android-chrome-512x512.png
   - apple-touch-icon.png
   - favicon files

2. **Recreate ZIP Properly**
   ```bash
   # Delete old ZIP
   del temporary-email-opera-extension.zip

   # Create new ZIP with correct structure
   cd opera-extension
   powershell Compress-Archive -Path "*" -DestinationPath "../temporary-email-opera-extension.zip"
   ```

#### If persona.ini errors occur:

1. **Check persona.ini format**
   ```ini
   [Info]
   name=Temporary Email Service for Opera
   version=1
   description=Quick access to temporary email addresses for privacy and spam protection - Opera Edition
   author=Temporary Email Service
   homepage=https://tempmails.online
   repository=https://github.com/your-username/temporary-email-opera-extension
   license=MIT
   category=Productivity
   tags=temporary-email,privacy,spam-protection,email-service,opera-extension
   icon=icon128.png
   compatibility=opera:>=60.0

   [Window Image]
   image=icon128.png
   background=icon128.png
   Type=BestFit
   ```

2. **Run validation again**
   ```bash
   node validate-opera.js
   ```

### Step 7: Final Verification

After successful upload:

1. **Test the Extension**
   - Install it in Opera browser
   - Go to `opera://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `opera-extension` folder

2. **Verify Functionality**
   - Extension icon appears in toolbar
   - Popup opens when clicked
   - Context menu works on email inputs
   - Quick fill buttons appear

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| "File not found" | Check ZIP structure - files must be at root level |
| "Invalid persona.ini" | Run validation script and fix format |
| "Missing required fields" | Ensure all required fields are present |
| "Icon not found" | Verify icon128.png is in root directory |

### Support

If you continue to have issues:

1. Run the validation script: `node validate-opera.js`
2. Check the ZIP file structure
3. Verify all files are present
4. Ensure persona.ini format is correct

The extension should upload successfully once all files are properly structured! 
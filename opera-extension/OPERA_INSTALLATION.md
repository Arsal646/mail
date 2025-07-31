# Opera Extension Installation Guide

## Quick Installation Steps

### 1. Download the Extension
- Download or clone the `opera-extension` folder to your computer
- Make sure all files are present in the folder

### 2. Open Opera Extensions Page
- Open Opera browser
- Type `opera://extensions/` in the address bar and press Enter
- Or go to Menu → Extensions → Manage Extensions

### 3. Enable Developer Mode
- In the Extensions page, toggle on "Developer mode" in the top right corner

### 4. Load the Extension
- Click "Load unpacked" button
- Navigate to and select the `opera-extension` folder
- Click "Select Folder"

### 5. Pin the Extension
- Click the puzzle piece icon in Opera's toolbar
- Find "Temporary Email Service for Opera"
- Click the pin icon to keep it visible in the toolbar

## Verification

After installation, you should see:
- The extension icon in your Opera toolbar
- Clicking the icon opens the popup with email functionality
- Right-clicking on email input fields shows the context menu

## Troubleshooting

### Extension Not Appearing
- Make sure Developer mode is enabled
- Check that all files are present in the opera-extension folder
- Verify manifest.json is valid JSON

### Extension Not Working
- Check the browser console for errors (F12 → Console)
- Ensure the extension has the necessary permissions
- Try reloading the extension

### Context Menu Not Working
- Make sure you're on a website with email input fields
- Right-click directly on the email input field
- Check that the extension is enabled

## Features Available in Opera

✅ **Popup Interface**: Click extension icon to open
✅ **Email Generation**: Generate new temporary emails
✅ **Copy to Clipboard**: Copy email addresses
✅ **Context Menu**: Right-click on email inputs
✅ **Quick Fill Button**: Automatic button on email inputs
✅ **Auto-refresh**: Automatic email checking
✅ **Storage**: Local storage for email data

## Opera-Specific Notes

- Opera uses the same WebExtensions API as Chrome, so all features work identically
- The extension will work on all websites that support Chrome extensions
- Opera's security model is similar to Chrome's
- All permissions and host permissions work the same way

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Ensure all files are present and valid
3. Try reloading the extension
4. Check that the extension has the required permissions

For more help, refer to the main README.md file. 
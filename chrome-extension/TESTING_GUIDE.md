# Chrome Extension Testing Guide

## Prerequisites
- Google Chrome browser installed
- The Chrome extension files in the `chrome-extension/` directory

## Step 1: Load the Extension in Chrome

1. **Open Chrome** and navigate to `chrome://extensions/`
2. **Enable Developer Mode** by toggling the switch in the top-right corner
3. **Click "Load unpacked"** button
4. **Select the `chrome-extension/` folder** from your project directory
5. **Verify the extension appears** in the extensions list with the name "Temp Mail Assistant"

## Step 2: Test Basic Functionality

### Test the Popup
1. **Click the extension icon** in the Chrome toolbar (top-right)
2. **Verify the popup opens** with the following elements:
   - Header with logo and status indicator
   - Current email display with copy button
   - Action buttons (New Email, Open Inbox)
   - Inbox preview section
   - Quick actions (Save, History)
   - Footer link

### Test Email Generation
1. **Click "New Email"** button in the popup
2. **Verify a new email is generated** and displayed
3. **Click the copy button** next to the email
4. **Paste somewhere** (Ctrl+V) to verify it copied correctly

### Test Email Refresh
1. **Click the refresh button** (circular arrow icon)
2. **Verify emails are fetched** from the API
3. **Check the inbox preview** shows recent emails

## Step 3: Test Website Integration

### Test Email Input Detection
1. **Navigate to any website** with an email input field (e.g., Gmail signup, any registration form)
2. **Click on an email input field**
3. **Look for the "Temp Mail" button** that appears next to the input
4. **Click the "Temp Mail" button** to fill the field with your current temp email

### Test Right-Click Context Menu
1. **Right-click on any email input field**
2. **Look for the context menu** with these options:
   - "Fill with Temp Email"
   - "Generate New Email"
   - "Open Temp Mail Site"
3. **Test each option** to verify they work correctly

## Step 4: Test API Integration

### Test Email Fetching
1. **Open browser developer tools** (F12)
2. **Go to Network tab**
3. **Generate a new email** in the extension popup
4. **Check the network requests** to verify API calls to `https://tempmails.online/api/emails/{email}`

### Test Email Saving
1. **Click "Save"** in the extension popup
2. **Check the network requests** to verify API calls to `https://tempmails.online/api/save-email`
3. **Verify success/error handling** works correctly

## Step 5: Test Notifications

### Test Success Notifications
1. **Perform actions** that trigger success notifications:
   - Copy email to clipboard
   - Save email successfully
   - Generate new email
2. **Verify notifications appear** in the bottom-right corner

### Test Error Notifications
1. **Disconnect internet** temporarily
2. **Try to refresh emails** or save an email
3. **Verify error notifications** appear with appropriate messages

## Step 6: Test Storage and Persistence

### Test Data Persistence
1. **Generate a new email** in the extension
2. **Close and reopen Chrome**
3. **Open the extension popup**
4. **Verify the email is still there** (stored in Chrome storage)

### Test Settings Persistence
1. **The extension should remember** your preferences between sessions
2. **Check that email history** is maintained

## Step 7: Test Keyboard Shortcuts

### Test Quick Actions
1. **Press Ctrl+Shift+E** (if configured) to open the extension popup
2. **Test any other keyboard shortcuts** you've configured

## Step 8: Test Error Scenarios

### Test Network Errors
1. **Disconnect from internet**
2. **Try to generate new email**
3. **Verify appropriate error message** is displayed

### Test Invalid API Responses
1. **Monitor network requests** in developer tools
2. **Verify the extension handles** malformed API responses gracefully

## Step 9: Performance Testing

### Test Responsiveness
1. **Open multiple tabs** with the extension
2. **Test popup responsiveness** under load
3. **Verify no memory leaks** or performance issues

### Test Background Processing
1. **Close the popup** and let the extension run in background
2. **Verify periodic email checking** works (if implemented)
3. **Check that notifications** still work when popup is closed

## Troubleshooting Common Issues

### Extension Not Loading
- **Check manifest.json** for syntax errors
- **Verify all required files** are present
- **Check Chrome console** for error messages

### Popup Not Opening
- **Check popup.html** for syntax errors
- **Verify popup.js** is properly linked
- **Check browser console** for JavaScript errors

### API Calls Failing
- **Check network connectivity**
- **Verify API endpoints** are correct
- **Check CORS settings** if applicable
- **Verify API authentication** if required

### Context Menu Not Appearing
- **Check content.js** is properly injected
- **Verify manifest.json** permissions
- **Check for JavaScript errors** in console

## Debugging Tips

### Enable Detailed Logging
1. **Open extension popup**
2. **Right-click and inspect** the popup
3. **Check console** for detailed logs

### Check Background Script
1. **Go to chrome://extensions/**
2. **Find your extension**
3. **Click "service worker"** link
4. **Check console** for background script logs

### Monitor Storage
1. **Open Chrome DevTools**
2. **Go to Application tab**
3. **Check Storage > Local Storage**
4. **Look for extension data**

## Testing Checklist

- [ ] Extension loads without errors
- [ ] Popup opens and displays correctly
- [ ] Email generation works
- [ ] Copy to clipboard works
- [ ] Email refresh works
- [ ] Website integration works
- [ ] Context menu appears
- [ ] API calls succeed
- [ ] Notifications appear
- [ ] Data persists between sessions
- [ ] Error handling works
- [ ] Performance is acceptable

## Next Steps After Testing

1. **Fix any issues** found during testing
2. **Optimize performance** if needed
3. **Add more features** based on testing feedback
4. **Prepare for Chrome Web Store** submission (if desired)
5. **Create user documentation** for end users

## Support

If you encounter issues during testing:
1. **Check the browser console** for error messages
2. **Review the extension's README.md** for troubleshooting tips
3. **Check Chrome's extension documentation** for guidance
4. **Test on different websites** to ensure compatibility 
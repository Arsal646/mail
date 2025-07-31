# Temporary Email Service Opera Extension

An Opera extension that provides quick access to temporary email addresses for privacy and spam protection. This extension integrates with your temporary email service at `tempmails.online`.

## Features

### 🚀 Core Features
- **Quick Email Generation**: Generate temporary email addresses instantly
- **Email Management**: View and manage your temporary emails
- **Auto-refresh**: Automatically check for new emails every 30 seconds
- **Copy to Clipboard**: One-click copy of email addresses
- **Save for 7 Days**: Save important emails for extended access

### 🎯 Smart Integration
- **Context Menu**: Right-click on email input fields to fill with temporary email
- **Quick Fill Button**: Automatic "Temp Mail" button appears on email inputs
- **Badge Notifications**: Shows unread email count on extension icon
- **Desktop Notifications**: Get notified when new emails arrive

### 🛡️ Privacy Features
- **No Registration Required**: Start using immediately
- **Anonymous Emails**: Protect your real email address
- **Auto-expiration**: Emails automatically expire after 24 hours
- **Local Storage**: Email data stored locally in browser

## Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download the Extension**
   ```bash
   # Clone or download the extension files
   # Make sure you have the complete opera-extension folder
   ```

2. **Open Opera Extensions Page**
   - Open Opera and go to `opera://extensions/`
   - Enable "Developer mode" (toggle in top right)

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `opera-extension` folder
   - The extension should now appear in your extensions list

4. **Pin the Extension**
   - Click the puzzle piece icon in Opera toolbar
   - Find "Temporary Email Service for Opera" and click the pin icon

### Method 2: Opera Add-ons Store (Future)

Once published, you'll be able to install directly from the Opera Add-ons Store.

## Usage

### 🎯 Popup Interface

Click the extension icon in your Opera toolbar to open the popup:

- **Current Email**: Shows your active temporary email address
- **Copy Button**: Click to copy the email to clipboard
- **New Email**: Generate a fresh temporary email address
- **Open Inbox**: View all emails in your temporary inbox
- **Recent Emails**: Quick preview of latest emails
- **Save Email**: Save current email for 7-day access
- **History**: View your email history

### 🎯 Website Integration

#### Right-click Context Menu
1. Navigate to any website with email input fields
2. Right-click on an email input field
3. Select from the context menu:
   - **Fill with temp email**: Use current temporary email
   - **Generate new email**: Create new email and fill
   - **Open temp mail site**: Visit the main website

#### Quick Fill Button
1. Click on any email input field
2. A blue "Temp Mail" button appears
3. Click the button to fill with your temporary email

### 🎯 Keyboard Shortcuts

- **Alt + T**: Quick fill current email (if supported)
- **Alt + N**: Generate new email (if supported)

## Configuration

### Settings (Future Feature)

The extension will support customizable settings:

- **Auto-refresh interval**: Change how often emails are checked
- **Notifications**: Enable/disable desktop notifications
- **Badge display**: Show/hide unread count on icon
- **Quick fill**: Enable/disable automatic quick fill buttons

## API Integration

The extension integrates with your temporary email service API:

### Endpoints Used
- `GET /api/emails/{email}` - Fetch emails for an address
- `POST /api/save-email` - Save email for extended access

### Data Storage
- **Local Storage**: Email accounts and settings stored locally
- **Chrome Storage API**: Persistent storage across browser sessions

## Development

### File Structure
```
opera-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # Content script for websites
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

### Key Components

#### Popup (`popup.js`)
- Manages the extension popup interface
- Handles email generation and copying
- Displays recent emails
- Communicates with background script

#### Background Script (`background.js`)
- Handles background tasks and notifications
- Manages email storage and retrieval
- Provides API communication
- Handles badge updates

#### Content Script (`content.js`)
- Runs on web pages
- Detects email input fields
- Provides context menu functionality
- Enables quick fill buttons

### Customization

#### Styling
- Modify `popup.css` to change the popup appearance
- Update colors, fonts, and layout as needed

#### Functionality
- Edit `popup.js` to modify popup behavior
- Update `content.js` to change website integration
- Modify `background.js` for background tasks

#### API Integration
- Update API endpoints in `popup.js` and `background.js`
- Modify data handling for your specific API structure

## Troubleshooting

### Common Issues

#### Extension Not Loading
- Ensure all files are present in the opera-extension folder
- Check that manifest.json is valid JSON
- Verify icon files exist and are valid PNG images

#### Popup Not Working
- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Ensure CORS is properly configured on your API

#### Content Script Issues
- Check if the script is running on the target website
- Verify permissions in manifest.json
- Test on different websites

#### API Connection Issues
- Verify your API is running and accessible
- Check network connectivity
- Ensure API endpoints match your backend

### Debug Mode

1. **Open Developer Tools**
   - Right-click the extension popup
   - Select "Inspect"

2. **Check Console**
   - Look for error messages
   - Verify API calls are working

3. **Test API Endpoints**
   - Use browser dev tools to test API calls
   - Verify response format matches expected structure

## Security Considerations

### Data Privacy
- All email data is stored locally in the browser
- No personal information is transmitted to external servers
- Temporary emails expire automatically

### Permissions
The extension requests minimal permissions:
- `storage`: For saving email accounts and settings
- `clipboardWrite`: For copying email addresses
- `activeTab`: For website integration

### API Security
- All API calls use HTTPS
- No sensitive data is stored permanently
- Emails are automatically cleaned up

## Future Enhancements

### Planned Features
- **Custom Email Domains**: Support for multiple email domains
- **Email Templates**: Pre-filled email addresses for common services
- **Advanced Filtering**: Filter emails by sender or subject
- **Export Functionality**: Export email data
- **Dark Mode**: Support for dark theme
- **Mobile Support**: Responsive design improvements

### API Enhancements
- **Real-time Updates**: WebSocket support for instant email updates
- **Email Search**: Search through received emails
- **Email Forwarding**: Forward emails to real address
- **Custom Domains**: Support for custom email domains

## Support

### Getting Help
- Check the troubleshooting section above
- Review browser console for error messages
- Test API endpoints directly

### Contributing
- Fork the repository
- Create a feature branch
- Submit a pull request with your changes

### Reporting Issues
- Include browser version and OS
- Provide steps to reproduce the issue
- Include any error messages from console

## License

This extension is provided as-is for use with the Temporary Email Service. Please ensure compliance with Opera Add-ons Store policies if publishing publicly.

---

**Note**: This extension is designed to work with your temporary email service at `tempmails.online`. Make sure your API endpoints match the ones used in the extension code. 
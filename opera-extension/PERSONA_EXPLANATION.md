# persona.ini File Explanation

## What is persona.ini?

The `persona.ini` file is a required metadata file for Opera extensions. It contains information about the extension that Opera uses to display the extension in the Opera Add-ons Store and manage it within the browser.

## Why is it needed?

Opera extensions require this file to:
- Display proper extension information in the Opera Add-ons Store
- Provide metadata for extension management
- Define compatibility requirements
- Set category and tags for discovery

## File Structure

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

## Field Explanations

- **name**: The display name of the extension
- **version**: Extension version number (use '1' for Opera extensions)
- **description**: Brief description of what the extension does
- **author**: Extension developer/company name
- **homepage**: Main website for the extension
- **repository**: Source code repository URL
- **license**: License type (MIT, GPL, etc.)
- **category**: Extension category (Productivity, Security, etc.)
- **tags**: Keywords for search and discovery
- **icon**: Path to the main extension icon
- **screenshot**: Path to extension screenshot (optional)
- **compatibility**: Minimum Opera version required
- **image**: Path to the window image (required for [Window Image] section)
- **background**: Path to the background image (required for [Window Image] section)
- **Type**: Window image type - must be either "BestFit" or "BoxTile" (required for [Window Image] section)

## Validation

The `validate-opera.js` script checks that:
- ✅ File exists
- ✅ Has valid [Info] section
- ✅ Contains required fields (name, version, description)
- ✅ Has valid [Window Image] section
- ✅ Contains image field
- ✅ Contains background field
- ✅ Contains Type field
- ✅ Properly formatted

## Chrome vs Opera

- **Chrome**: Does not require persona.ini (uses manifest.json for metadata)
- **Opera**: Requires persona.ini in addition to manifest.json
- **Firefox**: Uses manifest.json with different format

## Version Differences

- **Chrome**: Uses semantic versioning (e.g., '1.0.1') in manifest.json
- **Opera**: Uses simple version '1' in persona.ini
- **manifest.json**: Can still use semantic versioning for internal tracking

## Window Image Type Options

- **BestFit**: Scales the image to fit the window while maintaining aspect ratio
- **BoxTile**: Tiles the image to fill the window completely

## Notes

- The persona.ini file is included in the build process
- It's validated during the validation step
- It's copied to the dist folder when building
- It's required for Opera Add-ons Store submission 
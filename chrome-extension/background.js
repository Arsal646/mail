// Background service worker for Temporary Email Service extension

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Temporary Email Service extension installed');
        
        // Initialize storage with default values
        chrome.storage.local.set({
            tempMailAccounts: [],
            settings: {
                autoRefresh: true,
                refreshInterval: 30, // seconds
                notifications: true
            }
        });
    }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('Temporary Email Service extension started');
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'getCurrentEmail':
            handleGetCurrentEmail(sendResponse);
            return true; // Keep message channel open for async response
            
        case 'generateNewEmail':
            handleGenerateNewEmail(sendResponse);
            return true;
            
        case 'refreshEmails':
            handleRefreshEmails(request.email, sendResponse);
            return true;
            
        case 'saveEmail':
            handleSaveEmail(request.email, sendResponse);
            return true;
            
        case 'openInbox':
            handleOpenInbox(request.email);
            break;
            
        case 'showNotification':
            // Notifications removed - no longer showing notifications
            break;
            
        default:
            console.log('Unknown action:', request.action);
    }
});

// Handle getting current email
async function handleGetCurrentEmail(sendResponse) {
    try {
        const result = await chrome.storage.local.get(['tempMailAccounts']);
        const accounts = result.tempMailAccounts || [];
        const activeAccount = accounts.find(acc => acc.active === true);
        
        sendResponse({
            success: true,
            email: activeAccount ? activeAccount.address : null
        });
    } catch (error) {
        console.error('Error getting current email:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}

// Handle generating new email
async function handleGenerateNewEmail(sendResponse) {
    try {
        const username = Math.random().toString(36).substring(2, 10);
        const newEmail = `${username}@tempmails.online`;
        
        const result = await chrome.storage.local.get(['tempMailAccounts']);
        const accounts = result.tempMailAccounts || [];
        
        // Mark all existing accounts as inactive
        accounts.forEach(acc => acc.active = false);
        
        // Add new account
        const newAccount = {
            address: newEmail,
            createdAt: Date.now(),
            expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
            active: true
        };
        
        accounts.push(newAccount);
        await chrome.storage.local.set({ tempMailAccounts: accounts });
        
        sendResponse({
            success: true,
            email: newEmail
        });
    } catch (error) {
        console.error('Error generating new email:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}

// Handle refreshing emails
async function handleRefreshEmails(email, sendResponse) {
    if (!email) {
        sendResponse({
            success: false,
            error: 'No email provided'
        });
        return;
    }
    
    try {
        const response = await fetch(`https://mailboxhub.fun/api/fakeemails?email=${email}`);
        if (response.ok) {
            const emails = await response.json();
            sendResponse({
                success: true,
                emails: emails
            });
        } else {
            sendResponse({
                success: false,
                error: 'Failed to fetch emails'
            });
        }
    } catch (error) {
        console.error('Error refreshing emails:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}

// Handle saving email
async function handleSaveEmail(email, sendResponse) {
    if (!email) {
        sendResponse({
            success: false,
            error: 'No email provided'
        });
        return;
    }
    
    try {
        const response = await fetch('https://mailboxhub.fun/api/save-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
        
        if (response.ok) {
            const result = await response.json();
            sendResponse({
                success: true,
                data: result.data
            });
        } else {
            sendResponse({
                success: false,
                error: 'Failed to save email'
            });
        }
    } catch (error) {
        console.error('Error saving email:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}

// Handle opening inbox
function handleOpenInbox(email) {
    const url = email ? 
        `http://tempmail4u.com/?email=${email}` : 
        'http://tempmail4u.com/';
    
    chrome.tabs.create({ url: url });
}

// Handle showing notifications - REMOVED
// function handleShowNotification(title, message) {
//     chrome.notifications.create({
//         type: 'basic',
//         iconUrl: 'icons/icon48.png',
//         title: title,
//         message: message
//     });
// }

// Handle badge updates (optional - for showing unread count)
function updateBadge(unreadCount) {
    if (unreadCount > 0) {
        chrome.action.setBadgeText({ text: unreadCount.toString() });
        chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
    } else {
        chrome.action.setBadgeText({ text: '' });
    }
}

// Periodic email checking (optional)
setInterval(async () => {
    try {
        const result = await chrome.storage.local.get(['tempMailAccounts', 'settings']);
        const accounts = result.tempMailAccounts || [];
        const settings = result.settings || {};
        
        if (!settings.autoRefresh) return;
        
        const activeAccount = accounts.find(acc => acc.active === true);
        if (!activeAccount) return;
        
        // Check for new emails
        const response = await fetch(`https://mailboxhub.fun/api/fakeemails?email=${activeAccount.address}`);
        if (response.ok) {
            const emails = await response.json();
            const unreadCount = emails.filter(email => !email.read).length;
            
            updateBadge(unreadCount);
            
            // Show notification for new emails - REMOVED
            // if (settings.notifications && unreadCount > 0) {
            //     handleShowNotification(
            //         'New Emails',
            //         `You have ${unreadCount} new email(s) in your temporary inbox.`
            //     );
            // }
        }
    } catch (error) {
        console.error('Error in periodic email check:', error);
    }
}, 60000); // Check every minute 
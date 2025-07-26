// Content script for Temporary Email Service extension

// Initialize content script
(function() {
    'use strict';
    
    // Check if we're on the main site to avoid conflicts
    if (window.location.hostname === 'tempmail4u.com') {
        return;
    }
    
    // Add context menu for email input fields
    addEmailInputListeners();
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.action) {
            case 'fillEmail':
                fillEmailInput(request.email);
                break;
            case 'getCurrentEmail':
                getCurrentEmail(sendResponse);
                return true;
        }
    });
    
    // Add context menu
    addContextMenu();
})();

// Add listeners to email input fields
function addEmailInputListeners() {
    // Find all email input fields
    const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"], input[placeholder*="email"]');
    
    emailInputs.forEach(input => {
        // Add right-click context menu
        input.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showEmailContextMenu(e, input);
        });
        
        // Add focus event to show quick fill button
        input.addEventListener('focus', () => {
            showQuickFillButton(input);
        });
        
        // Add blur event to hide quick fill button
        input.addEventListener('blur', () => {
            hideQuickFillButton(input);
        });
    });
}

// Show context menu for email inputs
function showEmailContextMenu(event, input) {
    // Remove existing context menu
    const existingMenu = document.getElementById('temp-mail-context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Create context menu
    const menu = document.createElement('div');
    menu.id = 'temp-mail-context-menu';
    menu.style.cssText = `
        position: fixed;
        top: ${event.clientY}px;
        left: ${event.clientX}px;
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        min-width: 200px;
    `;
    
    // Get current email from storage
    chrome.storage.local.get(['tempMailAccounts'], (result) => {
        const accounts = result.tempMailAccounts || [];
        const activeAccount = accounts.find(acc => acc.active === true);
        const currentEmail = activeAccount ? activeAccount.address : null;
        
        menu.innerHTML = `
            <div style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">
                Temporary Email Service
            </div>
            <div style="padding: 8px 12px; cursor: pointer; hover:background-color: #f9fafb;" onclick="fillEmailInput('${currentEmail}')">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Fill with temp email
                </div>
                ${currentEmail ? `<div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${currentEmail}</div>` : ''}
            </div>
            <div style="padding: 8px 12px; cursor: pointer; hover:background-color: #f9fafb;" onclick="generateNewEmailAndFill()">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path d="M3 21v-5h5"></path>
                    </svg>
                    Generate new email
                </div>
            </div>
            <div style="padding: 8px 12px; cursor: pointer; hover:background-color: #f9fafb;" onclick="openTempMailSite()">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Open temp mail site
                </div>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Close menu when clicking outside
        document.addEventListener('click', closeContextMenu);
    });
}

// Close context menu
function closeContextMenu(event) {
    const menu = document.getElementById('temp-mail-context-menu');
    if (menu && !menu.contains(event.target)) {
        menu.remove();
        document.removeEventListener('click', closeContextMenu);
    }
}

// Show quick fill button
function showQuickFillButton(input) {
    // Remove existing button
    const existingButton = document.getElementById('temp-mail-quick-fill');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Create quick fill button
    const button = document.createElement('div');
    button.id = 'temp-mail-quick-fill';
    button.style.cssText = `
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 11px;
        cursor: pointer;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    button.textContent = 'Temp Mail';
    button.title = 'Fill with temporary email';
    
    // Position the button relative to the input
    const inputRect = input.getBoundingClientRect();
    button.style.top = `${inputRect.top + window.scrollY}px`;
    button.style.left = `${inputRect.right - button.offsetWidth - 8}px`;
    
    // Add click handler
    button.addEventListener('click', () => {
        chrome.storage.local.get(['tempMailAccounts'], (result) => {
            const accounts = result.tempMailAccounts || [];
            const activeAccount = accounts.find(acc => acc.active === true);
            if (activeAccount) {
                fillEmailInput(activeAccount.address);
            }
        });
    });
    
    document.body.appendChild(button);
}

// Hide quick fill button
function hideQuickFillButton(input) {
    setTimeout(() => {
        const button = document.getElementById('temp-mail-quick-fill');
        if (button) {
            button.remove();
        }
    }, 200);
}

// Fill email input with temporary email
function fillEmailInput(email) {
    if (!email) return;
    
    // Find focused email input
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.type === 'email' || 
        activeElement.name?.includes('email') || 
        activeElement.id?.includes('email') || 
        activeElement.placeholder?.includes('email'))) {
        
        activeElement.value = email;
        activeElement.dispatchEvent(new Event('input', { bubbles: true }));
        activeElement.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Show success feedback
        showSuccessFeedback(activeElement);
    }
}

// Generate new email and fill
function generateNewEmailAndFill() {
    chrome.runtime.sendMessage({ action: 'generateNewEmail' }, (response) => {
        if (response.success) {
            fillEmailInput(response.email);
        }
    });
}

// Open temp mail site
function openTempMailSite() {
    chrome.tabs.create({ url: 'http://tempmail4u.com/' });
}

// Show success feedback
function showSuccessFeedback(input) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: absolute;
        top: ${input.getBoundingClientRect().top - 30}px;
        left: ${input.getBoundingClientRect().left}px;
        background: #10b981;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    feedback.textContent = '✓ Filled with temp email';
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Get current email
function getCurrentEmail(sendResponse) {
    chrome.storage.local.get(['tempMailAccounts'], (result) => {
        const accounts = result.tempMailAccounts || [];
        const activeAccount = accounts.find(acc => acc.active === true);
        sendResponse({
            success: true,
            email: activeAccount ? activeAccount.address : null
        });
    });
}

// Add context menu to page
function addContextMenu() {
    // This could be extended to add more context menu options
    // For now, we rely on the email input listeners
}

// Make functions globally available for onclick handlers
window.fillEmailInput = fillEmailInput;
window.generateNewEmailAndFill = generateNewEmailAndFill;
window.openTempMailSite = openTempMailSite; 
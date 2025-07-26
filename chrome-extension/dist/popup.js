class TempMailExtension {
    constructor() {
        this.currentEmail = '';
        this.emails = [];
        this.isRefreshing = false;
        this.domain = '@tempmails.online';
        this.apiBase = 'https://mailboxhub.fun/api';
        this.currentEmailInModal = null;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadCurrentEmail();
        await this.refreshEmails();
        this.startAutoRefresh();
    }

    bindEvents() {
        // Copy email button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyEmail();
        });

        // New email button
        document.getElementById('newEmailBtn').addEventListener('click', () => {
            this.generateNewEmail();
        });

        // Open inbox button
        // document.getElementById('openInboxBtn').addEventListener('click', () => {
        //     this.openInbox();
        // });

        //Open inbox button
        document.getElementById('openFullSite').addEventListener('click', () => {
            this.openInbox();
        });

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshEmails();
        });

        // Save email button
        document.getElementById('saveEmailBtn').addEventListener('click', () => {
            this.saveEmail();
        });

        // History button
        // document.getElementById('historyBtn').addEventListener('click', () => {
        //     this.openHistory();
        // });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeEmailModal();
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeEmailModal();
        });

        // Open in website button
        document.getElementById('openInWebsite').addEventListener('click', () => {
            this.openEmailInWebsite();
        });

        // Test congrats button
        document.getElementById('testCongratsBtn').addEventListener('click', () => {
            this.showSaveMessage(`✅ Email saved successfully for 7 days!

📧 Email Address: test@example.com
🔗 Access Link: http://tempmail4u.com/?email=test@example.com

💡 How to use:
• Use this link to access your inbox anytime within 7 days
• Share this link with others to let them view your emails
• The link will expire after 7 days for security

📋 Access link has been copied to your clipboard!`, 'success');
        });

        // Close modal when clicking outside
        document.getElementById('emailModal').addEventListener('click', (e) => {
            if (e.target.id === 'emailModal') {
                this.closeEmailModal();
            }
        });
    }

    async loadCurrentEmail() {
        try {
            // Try to get from storage first
            const stored = await this.getStorageData('tempMailAccounts');
            console.log('Stored data:', stored);
            const accounts = stored || [];
            const activeAccount = accounts.find(acc => acc.active === true);

            if (activeAccount) {
                this.currentEmail = activeAccount.address;
                this.updateEmailDisplay();
            } else {
                await this.generateNewEmail();
            }
        } catch (error) {
            console.error('Error loading current email:', error);
            await this.generateNewEmail();
        }
    }

    async generateNewEmail() {
        try {
            const emailText = document.getElementById('currentEmail');
            emailText.textContent = 'Generating...';

            // Generate random email
            const username = Math.random().toString(36).substring(2, 10);
            const newEmail = `${username}${this.domain}`;

            // Update storage
            const stored = await this.getStorageData('tempMailAccounts') || [];
            stored.forEach(acc => acc.active = false);
            
            const newAccount = {
                address: newEmail,
                createdAt: Date.now(),
                expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
                active: true
            };
            
            stored.push(newAccount);
            await this.setStorageData('tempMailAccounts', stored);

            this.currentEmail = newEmail;
            this.updateEmailDisplay();
            this.emails = [];
            this.updateInboxDisplay();
            await this.refreshEmails();

        } catch (error) {
            console.error('Error generating new email:', error);
            emailText.textContent = 'Error generating email';
        }
    }

    updateEmailDisplay() {
        const emailText = document.getElementById('currentEmail');
        const loadingEmail = document.getElementById('loadingEmail');
        
        emailText.textContent = this.currentEmail || 'No email available';
        
        // Also update the loading state email display
        if (loadingEmail) {
            loadingEmail.textContent = this.currentEmail || 'Loading...';
        }
    }

    async copyEmail() {
        if (!this.currentEmail) return;

        try {
            await navigator.clipboard.writeText(this.currentEmail);
            
            const copyBtn = document.getElementById('copyBtn');
            copyBtn.classList.add('copied');
            
            // Update button text temporarily
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (error) {
            console.error('Error copying email:', error);
        }
    }

    async refreshEmails() {
        if (!this.currentEmail || this.isRefreshing) return;

        this.isRefreshing = true;
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.classList.add('spinning');

        try {
            const response = await fetch(`${this.apiBase}/fakeemails?email=${this.currentEmail}`);
            if (response.ok) {
                this.emails = await response.json();
                this.updateInboxDisplay();
            } else {
                console.error('Failed to fetch emails');
            }
        } catch (error) {
            console.error('Error refreshing emails:', error);
        } finally {
            this.isRefreshing = false;
            refreshBtn.classList.remove('spinning');
        }
    }

    updateInboxDisplay() {
        const inboxList = document.getElementById('inboxList');
        
        if (this.emails.length === 0) {
            inboxList.innerHTML = `
                <div class="empty-state">
                    <div class="spinner"></div>
                    <p>Waiting for incoming messages for  <span style="font-weight: bold;">${this.currentEmail}</span> </p>
                    <p class="auto-refresh">Auto-refresh in 10s</p>
                </div>
            `;
            return;
        }

        const emailsHTML = this.emails.slice(0, 5).map(email => {
            const time = new Date(email.created_at).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            console.log('Creating email item with ID:', email.id, 'Type:', typeof email.id);
            
            return `
                <div class="email-item ${!email.read ? 'unread' : ''}" data-email-id="${email.id}" onclick="window.tempMailExtension.openEmail('${email.id}')">
                    <div class="email-subject">${email.subject || '(No subject)'}</div>
                    <div class="email-from">${email.from_email}</div>
                    <div class="email-time">${time}</div>
                </div>
            `;
        }).join('');

        inboxList.innerHTML = emailsHTML;

        // Add click handlers for email items
        inboxList.querySelectorAll('.email-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const emailId = item.dataset.emailId;
                console.log('Email item clicked, ID:', emailId);
                this.openEmail(emailId);
            });
        });
    }

    openEmail(emailId) {
        console.log('Opening email with ID:', emailId);
        console.log('Available emails:', this.emails);
        
        // Convert emailId to number if it's a string
        const numericId = parseInt(emailId, 10);
        const email = this.emails.find(e => e.id === numericId || e.id === emailId);
        
        if (email) {
            console.log('Found email:', email);
            // Try to show email in modal first
            try {
                this.showEmailModal(email);
            } catch (error) {
                console.error('Error showing modal:', error);
                // Fallback: open in website
                this.openEmailInWebsiteWithEmail(email);
            }
        } else {
            console.error('Email not found with ID:', emailId);
            // Fallback: try to open in website
            chrome.tabs.create({
                url: `http://tempmail4u.com/?email=${this.currentEmail}`
            });
        }
    }

    openEmailInWebsite(email = null) {
        const emailToUse = email || this.currentEmailInModal;
        if (emailToUse) {
            const emailId = emailToUse.id;
            const urls = [
                `http://tempmail4u.com/?email=${this.currentEmail}&id=${emailId}`,
                `http://tempmail4u.com/?email=${this.currentEmail}&view=${emailId}`,
                `http://tempmail4u.com/?email=${this.currentEmail}&email_id=${emailId}`,
                `http://tempmail4u.com/?email=${this.currentEmail}`
            ];
            
            chrome.tabs.create({ url: urls[0] });
            if (this.currentEmailInModal) {
                this.closeEmailModal();
            }
        }
    }

    showEmailModal(email) {
        console.log('Showing email modal for:', email);
        
        const modal = document.getElementById('emailModal');
        const subject = document.getElementById('modalSubject');
        const from = document.getElementById('modalFrom');
        const to = document.getElementById('modalTo');
        const time = document.getElementById('modalTime');
        const body = document.getElementById('modalBody');

        if (!modal || !subject || !from || !to || !time || !body) {
            console.error('Modal elements not found');
            return;
        }

        // Set modal content
        subject.textContent = email.subject || '(No subject)';
        from.textContent = email.from_email || 'Unknown';
        to.textContent = email.to_email || this.currentEmail;
        time.textContent = new Date(email.created_at).toLocaleString();
        
        // Set email body (prefer HTML, fallback to text)
        if (email.body_html) {
            body.innerHTML = email.body_html;
        } else if (email.body_text) {
            body.textContent = email.body_text;
        } else {
            body.textContent = 'No content available';
        }

        // Store current email for website opening
        this.currentEmailInModal = email;

        // Show modal
        modal.style.display = 'block';
        console.log('Modal should be visible now');
    }

    closeEmailModal() {
        const modal = document.getElementById('emailModal');
        modal.style.display = 'none';
        this.currentEmailInModal = null;
    }

    openEmailInWebsite() {
        this.openEmailInWebsiteWithEmail(this.currentEmailInModal);
    }

    openEmailInWebsiteWithEmail(email = null) {
        const emailToUse = email || this.currentEmailInModal;
        if (emailToUse) {
            const emailId = emailToUse.id;
            const urls = [
                `http://tempmail4u.com/?email=${this.currentEmail}&id=${emailId}`,
                `http://tempmail4u.com/?email=${this.currentEmail}&view=${emailId}`,
                `http://tempmail4u.com/?email=${this.currentEmail}&email_id=${emailId}`,
                `http://tempmail4u.com/?email=${this.currentEmail}`
            ];
            
            chrome.tabs.create({ url: urls[0] });
            if (this.currentEmailInModal) {
                this.closeEmailModal();
            }
        }
    }

    openInbox() {
        chrome.tabs.create({
            url: `http://tempmail4u.com/?email=${this.currentEmail}`
        });
    }

    openHistory() {
        chrome.tabs.create({
            url: 'http://tempmail4u.com/'
        });
    }

    async saveEmail() {
        if (!this.currentEmail) return;

        try {
            const saveBtn = document.getElementById('saveEmailBtn');
            saveBtn.classList.add('saved');
            saveBtn.textContent = 'Saving...';

            const response = await fetch(`${this.apiBase}/save-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: this.currentEmail })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data && result.data.access_url) {
                    try {
                        // Copy access link to clipboard
                        await navigator.clipboard.writeText(result.data.access_url);
                        
                        saveBtn.textContent = 'Saved!';
                        
                        // Show success message in the popup
                        this.showSaveMessage(`✅ Email saved successfully for 7 days!

📧 Email Address: ${this.currentEmail}
🔗 Access Link: ${result.data.access_url}

💡 How to use:
• Use this link to access your inbox anytime within 7 days
• Share this link with others to let them view your emails
• The link will expire after 7 days for security

📋 Access link has been copied to your clipboard!`, 'success');
                        
                        // Show notification
                        chrome.notifications.create({
                            type: 'basic',
                            iconUrl: 'icons/icon48.png',
                            title: 'Email Saved Successfully',
                            message: `Email ${this.currentEmail} saved for 7 days. Access link copied to clipboard!`
                        });
                    } catch (clipboardError) {
                        // Fallback: just show the message without redirecting
                        saveBtn.textContent = 'Saved!';
                        this.showSaveMessage(`✅ Email saved successfully for 7 days!

📧 Email Address: ${this.currentEmail}
🔗 Access Link: ${result.data.access_url}

💡 How to use:
• Use this link to access your inbox anytime within 7 days
• Share this link with others to let them view your emails
• The link will expire after 7 days for security

📋 Please copy the access link manually from above.`, 'success');
                    }
                    
                    setTimeout(() => {
                        saveBtn.classList.remove('saved');
                        saveBtn.textContent = 'Save';
                    }, 3000);
                } else {
                    throw new Error('Invalid response format');
                }
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.error('Error saving email:', error);
            const saveBtn = document.getElementById('saveEmailBtn');
            saveBtn.textContent = 'Error';
            this.showSaveMessage('Failed to save email. Please try again.', 'error');
            setTimeout(() => {
                saveBtn.textContent = 'Save';
            }, 2000);
        }
    }

    showSaveMessage(message, type = 'info') {
        // Remove existing message if any
        const existingMessage = document.getElementById('saveMessage');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.id = 'saveMessage';
        messageDiv.className = `save-message ${type}`;
        
        // Debug logging
        console.log('showSaveMessage called with:', { type, message: message.substring(0, 100) + '...' });
        
        // Check if this is a success message and contains the specific text
        if (type === 'success' && message.includes('Access link has been copied to your clipboard!')) {
            console.log('Applying special congrats styling');
            // Create HTML content with special styling for the congrats part
            const lines = message.split('\n');
            let htmlContent = '';
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.includes('Access link has been copied to your clipboard!')) {
                    // Add special styling for the congrats message
                    htmlContent += `<div class="congrats-message">🎉 Access link has been copied to your clipboard!</div>`;
                } else if (line.startsWith('✅ Email saved successfully for 7 days!')) {
                    // Add special styling for the main success message
                    htmlContent += `<div class="main-success-message">${line}</div>`;
                } else if (line.startsWith('📧') || line.startsWith('🔗') || line.startsWith('💡') || line.startsWith('📋')) {
                    // Regular info lines
                    htmlContent += `<div class="info-line">${line}</div>`;
                } else if (line.startsWith('•')) {
                    // Bullet points
                    htmlContent += `<div class="bullet-point">${line}</div>`;
                } else if (line === '') {
                    // Empty lines
                    htmlContent += '<br>';
                } else {
                    // Regular text
                    htmlContent += `<div>${line}</div>`;
                }
            }
            
            messageDiv.innerHTML = htmlContent;
            console.log('Generated HTML content:', htmlContent);
        } else {
            // For other message types, use plain text
            messageDiv.textContent = message;
            console.log('Using plain text message');
        }

        // Insert after the actions section (more reliable than quick-actions)
        const actionsSection = document.querySelector('.actions');
        if (actionsSection && actionsSection.parentNode) {
            actionsSection.parentNode.insertBefore(messageDiv, actionsSection.nextSibling);
        } else {
            // Fallback: insert at the beginning of the container
            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(messageDiv, container.firstChild);
            }
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    startAutoRefresh() {
        // Refresh emails every 10 seconds
        setInterval(() => {
            this.refreshEmails();
        }, 10000);
        
        // Update countdown timer
        let countdown = 10;
        setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                countdown = 10;
            }
            const autoRefreshText = document.querySelector('.auto-refresh');
            if (autoRefreshText) {
                autoRefreshText.textContent = `Auto-refresh in ${countdown}s`;
            }
        }, 1000);
    }

    // Storage helpers
    async getStorageData(key) {
        return new Promise((resolve) => {
            chrome.storage.local.get([key], (result) => {
                resolve(result[key]);
            });
        });
    }

    async setStorageData(key, value) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: value }, resolve);
        });
    }
}

// Initialize the extension when popup loads
document.addEventListener('DOMContentLoaded', () => {
    window.tempMailExtension = new TempMailExtension();
}); 
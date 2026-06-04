/**
 * B-Sim AI - Settings Interactivity Engine
 * Manages user credentials, theme swapping, text scaling, and mock key generation.
 */

(function() {
  


  // --- INITIALIZE SETTINGS PAGE INPUTS ---
  window.initSettingsPage = function(role) {
    // Set settings variant context
    localStorage.setItem('settings-variant', role);

    // 1. Profile fields
    var defaultName = role === 'student' ? 'Jamie Dela Cruz' : (role === 'admin' ? 'University Admin' : 'Dr. Reyes');
    var defaultEmail = role === 'student' ? 'jamie.dc@student.dlsu.edu.ph' : (role === 'admin' ? 'admin@dlsu.edu.ph' : 'dr.reyes@dlsu.edu.ph');
    var defaultInitials = role === 'student' ? 'JD' : (role === 'admin' ? 'UA' : 'DR');

    document.getElementById('profileName').value = localStorage.getItem('user-profile-name') || defaultName;
    document.getElementById('profileEmail').value = localStorage.getItem('user-profile-email') || defaultEmail;
    document.getElementById('profileInitials').value = localStorage.getItem('user-profile-initials') || defaultInitials;

    // 2. Theme select
    var savedTheme = localStorage.getItem('ui-theme-preset') || 'teal';
    document.getElementById('themePreset').value = savedTheme;

    // 3. Text Scale select
    var savedScale = localStorage.getItem('ui-text-scale') || 'standard';
    document.getElementById('textScale').value = savedScale;

    // 4. AI Feedback Radio cards
    var savedVerbosity = localStorage.getItem('ai-feedback-verbosity') || 'balanced';
    selectVerbosityCard(savedVerbosity);

    // 5. Alert Checkboxes
    document.getElementById('alertDeadline').checked = localStorage.getItem('alerts-deadline') !== 'false';
    document.getElementById('alertEsg').checked = localStorage.getItem('alerts-esg-breach') !== 'false';

    // 6. Role-specific fields
    if (role === 'student') {
      document.getElementById('alertPriceWar').checked = localStorage.getItem('alerts-price-war') !== 'false';
    } else if (role === 'instructor') {
      document.getElementById('alertCritical').checked = localStorage.getItem('alerts-team-critical') !== 'false';
      document.getElementById('alertDailyReport').checked = localStorage.getItem('alerts-daily-report') === 'true';
      
      // LMS
      var lmsEnabled = localStorage.getItem('lms-sync-enabled') === 'true';
      document.getElementById('lmsSyncToggle').checked = lmsEnabled;
      document.getElementById('apiKeyInput').value = localStorage.getItem('lms-api-key') || '';
    } else if (role === 'admin') {
      // SSO Toggles
      var ssoEnabled = localStorage.getItem('admin-sso-enabled') === 'true';
      document.getElementById('ssoSyncToggle').checked = ssoEnabled;
      document.getElementById('sessionTimeout').value = localStorage.getItem('admin-session-timeout') || '30m';
      
      // Server Alerts
      document.getElementById('alertCompute').checked = localStorage.getItem('admin-alert-compute') !== 'false';
      document.getElementById('alertReplica').checked = localStorage.getItem('admin-alert-replica') !== 'false';
      document.getElementById('alertInvoice').checked = localStorage.getItem('admin-alert-invoice') === 'true';
    }
  };

  // --- VERBOSITY CARD SELECTOR ---
  window.selectVerbosityCard = function(value) {
    localStorage.setItem('ai-feedback-verbosity', value);
    var cards = document.querySelectorAll('.radio-card');
    cards.forEach(function(card) {
      card.classList.remove('active');
      if (card.getAttribute('data-value') === value) {
        card.classList.add('active');
      }
    });
  };

  // --- SAVE SETTINGS ACTIONS ---
  window.saveAllSettings = function(role) {
    var name = document.getElementById('profileName').value.trim();
    var email = document.getElementById('profileEmail').value.trim();
    var initials = document.getElementById('profileInitials').value.trim().toUpperCase();

    if (!name || !email || !initials) {
      window.showToast("Cannot Save", "Please fill in all profile fields.", "danger");
      return;
    }

    if (initials.length > 3) {
      window.showToast("Initials Too Long", "Initials must be 2 or 3 characters.", "danger");
      return;
    }

    // Save profile data
    localStorage.setItem('user-profile-name', name);
    localStorage.setItem('user-profile-email', email);
    localStorage.setItem('user-profile-initials', initials);

    // Save visual preferences
    var theme = document.getElementById('themePreset').value;
    localStorage.setItem('ui-theme-preset', theme);
    
    var scale = document.getElementById('textScale').value;
    localStorage.setItem('ui-text-scale', scale);

    // Save alerts
    localStorage.setItem('alerts-deadline', document.getElementById('alertDeadline').checked);
    localStorage.setItem('alerts-esg-breach', document.getElementById('alertEsg').checked);

    if (role === 'student') {
      localStorage.setItem('alerts-price-war', document.getElementById('alertPriceWar').checked);
    } else if (role === 'instructor') {
      localStorage.setItem('alerts-team-critical', document.getElementById('alertCritical').checked);
      localStorage.setItem('alerts-daily-report', document.getElementById('alertDailyReport').checked);
      
      // LMS
      localStorage.setItem('lms-sync-enabled', document.getElementById('lmsSyncToggle').checked);
      localStorage.setItem('lms-api-key', document.getElementById('apiKeyInput').value);
    } else if (role === 'admin') {
      localStorage.setItem('admin-sso-enabled', document.getElementById('ssoSyncToggle').checked);
      localStorage.setItem('admin-session-timeout', document.getElementById('sessionTimeout').value);
      localStorage.setItem('admin-alert-compute', document.getElementById('alertCompute').checked);
      localStorage.setItem('admin-alert-replica', document.getElementById('alertReplica').checked);
      localStorage.setItem('admin-alert-invoice', document.getElementById('alertInvoice').checked);
    }

    // Apply styles immediately
    window.applyGlobalSettings();

    // Re-render components to propagate changes
    renderSidebar({ variant: role, activePage: 'settings' });
    renderTopBar({ title: 'Account Settings', subtitle: 'Manage preferences & custom configuration' });

    window.showToast("Settings Saved", "Your configuration updates have been persisted successfully.", "success");
  };

  // --- RESET DEFAULT CONFIG ---
  window.resetDefaultSettings = function(role) {
    window.openCustomModal({
      title: '⚠ Reset Settings',
      body: 'Are you sure you want to revert all settings to factory defaults? Your theme choices and custom profile details will be cleared.',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary'
        },
        {
          text: 'Reset Defaults',
          className: 'btn-danger',
          onclick: function(overlay) {
            // Remove storage items
            localStorage.removeItem('user-profile-name');
            localStorage.removeItem('user-profile-email');
            localStorage.removeItem('user-profile-initials');
            localStorage.removeItem('ui-theme-preset');
            localStorage.removeItem('ui-text-scale');
            localStorage.removeItem('ai-feedback-verbosity');
            localStorage.removeItem('alerts-deadline');
            localStorage.removeItem('alerts-esg-breach');
            
            if (role === 'student') {
              localStorage.removeItem('alerts-price-war');
            } else if (role === 'instructor') {
              localStorage.removeItem('alerts-team-critical');
              localStorage.removeItem('alerts-daily-report');
              localStorage.removeItem('lms-sync-enabled');
              localStorage.removeItem('lms-api-key');
            } else if (role === 'admin') {
              localStorage.removeItem('admin-sso-enabled');
              localStorage.removeItem('admin-session-timeout');
              localStorage.removeItem('admin-alert-compute');
              localStorage.removeItem('admin-alert-replica');
              localStorage.removeItem('admin-alert-invoice');
            }

            // Apply default theme styles
            window.applyGlobalSettings();

            // Re-initialize fields
            window.initSettingsPage(role);

            // Re-render sidebar/top-bar
            renderSidebar({ variant: role, activePage: 'settings' });

            window.showToast("Defaults Restored", "All settings have been reverted to system configurations.", "warning");
          }
        }
      ]
    });
  };

  // --- API KEY GENERATION ---
  window.generateMockApiKey = function() {
    var chars = 'abcdef0123456789';
    var key = 'bsim_api_live_';
    for (var i = 0; i < 24; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('apiKeyInput').value = key;
    window.showToast("Key Generated", "New API connection credentials generated successfully.", "success");
  };

})();

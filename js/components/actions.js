/**
 * B-Sim AI - Global Action Handlers & UI Interactivity System
 * Creates reusable Toast & Modal utilities and handles simulated actions.
 */

(function() {
  // --- THEME & SCALE STATE PERSISTENCE APPLIER ---
  var themes = {
    teal: {
      teal: '#0098A6',
      glow: 'rgba(0, 152, 166, 0.15)',
      dim: '#EAF9FA'
    },
    amber: {
      teal: '#E07B39',
      glow: 'rgba(224, 123, 57, 0.15)',
      dim: '#FEF3C7'
    },
    emerald: {
      teal: '#16A085',
      glow: 'rgba(22, 160, 133, 0.15)',
      dim: '#D1FAE5'
    }
  };

  window.applyGlobalSettings = function() {
    // 1. Theme
    var currentTheme = localStorage.getItem('ui-theme-preset') || 'teal';
    var tConfig = themes[currentTheme] || themes.teal;
    document.documentElement.style.setProperty('--teal', tConfig.teal);
    document.documentElement.style.setProperty('--teal-glow', tConfig.glow);
    document.documentElement.style.setProperty('--teal-dim', tConfig.dim);
    
    // 2. Font scale
    var fontScale = localStorage.getItem('ui-text-scale') || 'standard';
    if (document.body) {
      if (fontScale === 'large') {
        document.body.classList.add('large-font-scale');
      } else {
        document.body.classList.remove('large-font-scale');
      }
    }
  };

  // Run immediately and also on DOMContentLoaded
  window.applyGlobalSettings();
  document.addEventListener('DOMContentLoaded', window.applyGlobalSettings);

  // --- TOAST ENGINE ---
  var container = document.getElementById('global-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'global-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  window.showToast = function(title, message, type) {
    type = type || 'success'; // success, warning, danger, info
    
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    
    var icon = '✓';
    if (type === 'warning') icon = '⚠';
    else if (type === 'danger') icon = '✗';
    else if (type === 'info') icon = 'ℹ';
    
    toast.innerHTML = 
      '<div class="toast-icon">' + icon + '</div>' +
      '<div class="toast-content">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-message">' + message + '</div>' +
      '</div>' +
      '<button class="toast-close" onclick="this.parentElement.classList.remove(\'show\'); setTimeout(function(){this.parentElement.remove();}, 300)">✕</button>';
    
    container.appendChild(toast);
    
    // Force reflow
    toast.offsetHeight;
    
    toast.classList.add('show');
    
    setTimeout(function() {
      if (toast && toast.parentElement) {
        toast.classList.remove('show');
        setTimeout(function() {
          if (toast && toast.parentElement) toast.remove();
        }, 350);
      }
    }, 4000);
  };

  // --- DYNAMIC MODAL ENGINE ---
  window.openCustomModal = function(config) {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    var modal = document.createElement('div');
    modal.className = 'modal';
    
    var title = document.createElement('div');
    title.className = 'modal-title';
    title.innerHTML = config.title;
    modal.appendChild(title);
    
    var body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML = config.body;
    modal.appendChild(body);
    
    var actions = document.createElement('div');
    actions.className = 'modal-actions';
    
    config.buttons.forEach(function(btnConfig) {
      var btn = document.createElement('button');
      btn.className = 'btn ' + (btnConfig.className || 'btn-secondary') + ' modal-action-btn';
      btn.textContent = btnConfig.text;
      btn.onclick = function() {
        if (btnConfig.onclick) btnConfig.onclick(overlay);
        overlay.classList.remove('open');
        setTimeout(function() { overlay.remove(); }, 300);
      };
      actions.appendChild(btn);
    });
    
    modal.appendChild(actions);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animate open
    overlay.offsetHeight;
    overlay.classList.add('open');
  };

  // --- MOCK ACTION HANDLERS ---

  // 1. Session Config (session-config.html)
  window.saveSessionTemplate = function() {
    window.showToast("Template Saved", "Course configuration saved to templates folder successfully.", "success");
  };

  window.launchSimulation = function() {
    // Create launch simulation overlay
    var overlay = document.createElement('div');
    overlay.className = 'sim-overlay';
    overlay.innerHTML = 
      '<div class="sim-spinner"></div>' +
      '<div class="loading-title">Launching Simulation <span>Engine</span></div>' +
      '<div class="sim-step" id="simStep">Initializing simulation run context...</div>';
    
    document.body.appendChild(overlay);
    overlay.offsetHeight;
    overlay.classList.add('open');

    var steps = [
      "Synthesizing market pricing elasticity matrix...",
      "Calculating ESG compliance metrics for all 8 teams...",
      "Analyzing competitive segment dynamics...",
      "Finalizing ledger balances & starting Round 1..."
    ];
    
    var currentStep = 0;
    var interval = setInterval(function() {
      if (currentStep < steps.length) {
        document.getElementById('simStep').textContent = steps[currentStep];
        currentStep++;
      }
    }, 600);

    setTimeout(function() {
      clearInterval(interval);
      overlay.classList.remove('open');
      setTimeout(function() {
        overlay.remove();
        // Set local storage indicating round is 1
        localStorage.setItem('simulation-launched', 'true');
        // Success toast and redirect
        window.showToast("Simulation Launched!", "Round 1 is now active. Student portals are open.", "success");
        setTimeout(function() {
          window.location.href = 'class-monitor.html';
        }, 1200);
      }, 500);
    }, 3200);
  };

  // 2. Class Monitor (class-monitor.html)
  window.downloadClassReport = function() {
    window.showToast("Generating PDF", "Compiling Round 3 data and generating report...", "info");
    setTimeout(function() {
      window.showToast("Report Downloaded", "Class Performance PDF has been downloaded successfully.", "success");
    }, 1500);
  };

  window.reviewAtRiskAlert = function() {
    // Select the "At Risk" tab button and trigger filter
    var tabs = document.querySelectorAll('.team-table-header .tab-btn');
    if (tabs.length > 1) {
      window.filterClassMonitorTable('At Risk', tabs[1]);
    }
  };

  window.filterClassMonitorTable = function(tabType, btn) {
    // Toggle active tab style
    var tabs = document.querySelectorAll('.team-table-header .tab-btn');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    // Filter table rows
    var tableBody = document.querySelector('.data-table tbody');
    if (!tableBody) return;
    
    var rows = tableBody.querySelectorAll('tr');
    rows.forEach(function(row) {
      if (tabType === 'All Teams') {
        row.style.display = '';
      } else {
        // At Risk: Vertex, BlueStar, Peak Dynamics, Kestrel Co
        var statusDot = row.querySelector('.status-dot');
        if (statusDot && (statusDot.classList.contains('status-dot-amber') || statusDot.classList.contains('status-dot-red'))) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    });
  };

  window.openSideSheetFeedback = function(teamName) {
    window.openCustomModal({
      title: '📩 Send Private Feedback',
      body: '<p class="mb-10">Send private direct feedback to the members of <strong>' + teamName + '</strong>:</p>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">Message</label>' +
              '<textarea class="modal-form-input" id="feedbackMsg" rows="4" style="resize:none;" placeholder="E.g., Your pricing strategy is causing margins to deteriorate. Consider raising prices next round..."></textarea>' +
            '</div>',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary',
          onclick: function() {}
        },
        {
          text: 'Send Feedback',
          className: 'btn-primary',
          onclick: function(overlay) {
            var msg = document.getElementById('feedbackMsg').value;
            if (msg.trim()) {
              window.showToast("Feedback Sent", "Your private feedback has been delivered to " + teamName + ".", "success");
            } else {
              window.showToast("Error", "Message content cannot be empty.", "danger");
            }
          }
        }
      ]
    });
  };

  window.toggleSideSheetLock = function(btn) {
    var isLocked = btn.textContent.indexOf('🔒') !== -1;
    if (isLocked) {
      btn.textContent = '🔓 Decision Unlocked';
      btn.className = 'btn btn-primary btn-sm';
      window.showToast("Decision Unlocked", "NovaTech Corp can now modify and resubmit their Round 3 decisions.", "success");
    } else {
      btn.textContent = '🔒 Override Decision Lock';
      btn.className = 'btn btn-ghost btn-sm';
      window.showToast("Decision Locked", "NovaTech Corp decision portal has been locked.", "warning");
    }
  };

  // 3. Team Deep-Dive (team-deepdive.html)
  window.saveInstructorOverride = function() {
    window.showToast("Override Saved", "Score adjustments and private instructor notes have been applied to this team.", "success");
  };

  // 4. Admin Portal (admin.html)
  window.openUpgradeModal = function() {
    window.openCustomModal({
      title: '⬆ Upgrade License Plan',
      body: '<p class="mb-10">Current Plan: <strong>Enterprise License (500 seats)</strong></p>' +
            '<p class="mb-16">Select an upgraded tier to accommodate more student enrollments:</p>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">Plan Tier</label>' +
              '<select class="modal-form-input" id="upgradePlanSelect">' +
                '<option value="Elite">Elite Plan (1,000 seats) — $20,000 / yr</option>' +
                '<option value="Unlimited">Unlimited Plan (Unlimited seats) — $35,000 / yr</option>' +
              '</select>' +
            '</div>',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary'
        },
        {
          text: 'Confirm Upgrade',
          className: 'btn-primary',
          onclick: function(overlay) {
            var selectedVal = document.getElementById('upgradePlanSelect').value;
            window.showToast("License Upgraded", "Your plan has been upgraded to " + selectedVal + " successfully.", "success");
            
            // Dynamically update the badges/labels on admin.html
            var badges = document.querySelectorAll('.top-bar .badge');
            if (badges.length > 0) badges[0].textContent = '● ' + selectedVal + ' Plan';
            
            var stats = document.querySelectorAll('.billing-list .billing-row .badge');
            if (stats.length > 0) stats[0].textContent = selectedVal;
            
            var seats = document.querySelectorAll('.billing-list .billing-row .text-mono');
            if (seats.length > 0) {
              seats[0].textContent = (selectedVal === 'Elite' ? '1,000' : 'Unlimited') + ' / 284 used';
            }
          }
        }
      ]
    });
  };

  window.downloadInvoice = function() {
    window.showToast("Downloading Invoice", "Invoice DLSU-2025-Q4.pdf download started.", "success");
  };

  window.openAdminDocsModal = function() {
    window.openCustomModal({
      title: '📖 Institutional Documentation Library',
      body: '<p class="mb-10" style="color: var(--gray-200); font-size: 13px; margin-bottom: 16px;">Access official B-Sim AI guidebooks, technical manuals, and integration documentation customized for De La Salle University.</p>' +
            '<div class="round-status-list" style="margin-top: 14px;">' +
              '<div class="round-status-item" style="border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 10px; margin-bottom: 10px;">' +
                '<div>' +
                  '<div class="round-label" style="font-weight:600; color:var(--white);">University Admin Deployment Guide</div>' +
                  '<div style="font-size:11px; color:var(--gray-200); margin-top:2px;">SSO configuration, license management, and security protocols (PDF, 2.4 MB)</div>' +
                '</div>' +
                '<button class="btn btn-sm btn-ghost" onclick="window.showToast(\'Downloading Guide\', \'DLSU_Admin_Deployment_Guide.pdf is downloading.\', \'success\')">Download</button>' +
              '</div>' +
              '<div class="round-status-item" style="border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 10px; margin-bottom: 10px;">' +
                '<div>' +
                  '<div class="round-label" style="font-weight:600; color:var(--white);">Instructor Portal Training Manual</div>' +
                  '<div style="font-size:11px; color:var(--gray-200); margin-top:2px;">Course creation, grading rules, and AI strategic model configuration (PDF, 4.1 MB)</div>' +
                '</div>' +
                '<button class="btn btn-sm btn-ghost" onclick="window.showToast(\'Downloading Guide\', \'Instructor_Training_Manual.pdf is downloading.\', \'success\')">Download</button>' +
              '</div>' +
              '<div class="round-status-item" style="padding-bottom: 4px;">' +
                '<div>' +
                  '<div class="round-label" style="font-weight:600; color:var(--white);">Student Companion Strategy Guide</div>' +
                  '<div style="font-size:11px; color:var(--gray-200); margin-top:2px;">Student portal navigation, economics index reading, and decision submissions (PDF, 1.8 MB)</div>' +
                '</div>' +
                '<button class="btn btn-sm btn-ghost" onclick="window.showToast(\'Downloading Guide\', \'Student_Strategy_Companion.pdf is downloading.\', \'success\')">Download</button>' +
              '</div>' +
            '</div>',
      buttons: [
        {
          text: 'Close',
          className: 'btn-secondary'
        }
      ]
    });
  };

  window.openAddInstructorModal = function() {
    window.openCustomModal({
      title: '+ Add New Instructor',
      body: '<div class="modal-form-group">' +
              '<label class="modal-form-label">Full Name</label>' +
              '<input type="text" class="modal-form-input" id="instructorName" placeholder="Dr. Elena Santos">' +
            '</div>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">Email Address</label>' +
              '<input type="email" class="modal-form-input" id="instructorEmail" placeholder="e.santos@dlsu.edu.ph">' +
            '</div>',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary'
        },
        {
          text: 'Add Instructor',
          className: 'btn-primary',
          onclick: function(overlay) {
            var name = document.getElementById('instructorName').value;
            var email = document.getElementById('instructorEmail').value;
            if (name.trim() && email.trim()) {
              // Append to instructor table
              var table = document.querySelector('.data-table tbody');
              if (table) {
                var row = document.createElement('tr');
                row.innerHTML = 
                  '<td class="table-cell-pad table-cell-name">' + name + '</td>' +
                  '<td class="instructor-email-cell">' + email + '</td>' +
                  '<td>0</td>' +
                  '<td>0</td>' +
                  '<td><span class="badge badge-green">Active</span></td>' +
                  '<td><button class="btn btn-sm btn-ghost" onclick="toggleInstructorStatus(this, \'' + name + '\')">Deactivate</button></td>';
                table.appendChild(row);
                window.showToast("Instructor Added", name + " has been added and activation invite sent.", "success");
              }
            } else {
              window.showToast("Error", "All fields are required.", "danger");
            }
          }
        }
      ]
    });
  };

  window.toggleInstructorStatus = function(btn, name) {
    var row = btn.closest('tr');
    var badge = row.querySelector('.badge');
    if (badge.textContent === 'Active') {
      badge.textContent = 'Inactive';
      badge.className = 'badge badge-gray';
      btn.textContent = 'Activate';
      window.showToast("Instructor Deactivated", name + " has been set to Inactive.", "warning");
    } else {
      badge.textContent = 'Active';
      badge.className = 'badge badge-green';
      btn.textContent = 'Deactivate';
      window.showToast("Instructor Activated", name + " has been set to Active.", "success");
    }
  };

  // 5. Leaderboard (leaderboard.html)
  window.filterLeaderboardTable = function(tabType, btn) {
    // Toggle active tab class
    var tabs = document.querySelectorAll('.tab-bar .tab-btn');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    // Sort table rows dynamically based on the metric
    var tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;
    
    var rows = Array.from(tbody.querySelectorAll('tr'));
    
    var colIdx = 6; // Score (Overall)
    if (tabType === 'Revenue') colIdx = 2;
    else if (tabType === 'ESG') colIdx = 5;
    
    rows.sort(function(a, b) {
      var aVal = a.cells[colIdx] ? a.cells[colIdx].textContent.trim().replace(/[^0-9.]/g, '') : '0';
      var bVal = b.cells[colIdx] ? b.cells[colIdx].textContent.trim().replace(/[^0-9.]/g, '') : '0';
      return parseFloat(bVal || 0) - parseFloat(aVal || 0); // Always sort descending
    });
    
    // Clear and append
    tbody.innerHTML = '';
    rows.forEach(function(r) { tbody.appendChild(r); });

    // Toast
    window.showToast("Sorted Leaderboard", "Showing rankings sorted by: " + tabType, "info");
  };

  // 6. Global Settings & Logouts (for all pages)
  window.handleSidebarSettings = function(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    window.openCustomModal({
      title: '⚙️ Account Settings',
      body: '<p class="mb-10">Manage settings for your B-Sim AI user profile:</p>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">User Theme</label>' +
              '<select class="modal-form-input" id="themeSelect">' +
                '<option selected>Classic Navy (Dark)</option>' +
                '<option>Emerald Teal (Dark)</option>' +
                '<option>High Contrast (Accessible)</option>' +
              '</select>' +
            '</div>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">Email Notifications</label>' +
              '<select class="modal-form-input">' +
                '<option selected>All Rounds & Feedback Announcements</option>' +
                '<option>Critical Warning Flags Only</option>' +
                '<option>None</option>' +
              '</select>' +
            '</div>',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary'
        },
        {
          text: 'Save Changes',
          className: 'btn-primary',
          onclick: function(overlay) {
            window.showToast("Settings Saved", "Your interface settings have been updated successfully.", "success");
          }
        }
      ]
    });
  };

  // Student Save Draft (decision.html)
  window.saveStudentDraft = function() {
    window.showToast("Draft Saved", "Your decisions have been saved as draft at " + new Date().toLocaleTimeString() + ".", "success");
  };

  // Support Ticket Handlers (admin-support.html)
  window.toggleTicketStatus = function(btn, id) {
    var row = btn.closest('tr');
    var statusBadge = row.querySelector('.badge');
    var currentStatus = statusBadge.textContent;

    if (currentStatus === 'Open') {
      statusBadge.textContent = 'In Progress';
      statusBadge.className = 'badge badge-amber';
      btn.textContent = 'Resolve';
      window.showToast("Ticket Updated", "Ticket " + id + " has been marked as In Progress.", "warning");
    } else if (currentStatus === 'In Progress') {
      statusBadge.textContent = 'Resolved';
      statusBadge.className = 'badge badge-green';
      btn.textContent = 'Reopen';
      btn.className = 'btn btn-sm btn-secondary';
      window.showToast("Ticket Resolved", "Ticket " + id + " has been resolved successfully.", "success");
    } else {
      statusBadge.textContent = 'Open';
      statusBadge.className = 'badge badge-red';
      btn.textContent = 'Assign';
      btn.className = 'btn btn-sm btn-ghost';
      window.showToast("Ticket Reopened", "Ticket " + id + " has been set back to Open status.", "info");
    }
  };

  window.respondToTicket = function(teamName, id) {
    window.openCustomModal({
      title: '✉️ Respond to Ticket ' + id,
      body: '<p class="mb-10">Send a reply to the sender (<strong>' + teamName + '</strong>):</p>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">Message Reply</label>' +
              '<textarea class="modal-form-input" id="ticketReplyMsg" rows="4" style="resize:none;" placeholder="Write your reply here..."></textarea>' +
            '</div>',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary'
        },
        {
          text: 'Send Reply',
          className: 'btn-primary',
          onclick: function(overlay) {
            var msg = document.getElementById('ticketReplyMsg').value;
            if (msg.trim()) {
              window.showToast("Reply Sent", "Your response has been sent to ticket " + id + ".", "success");
            } else {
              window.showToast("Error", "Reply content cannot be empty.", "danger");
            }
          }
        }
      ]
    });
  };

  // Invite User Admin (admin-users.html)
  window.openInviteUserModal = function() {
    window.openCustomModal({
      title: '➕ Invite System User',
      body: '<div class="modal-form-group">' +
              '<label class="modal-form-label">Full Name</label>' +
              '<input type="text" class="modal-form-input" id="newUserName" placeholder="E.g., Prof. Sarah Cruz">' +
            '</div>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">Email Address</label>' +
              '<input type="email" class="modal-form-input" id="newUserEmail" placeholder="E.g., s.cruz@dlsu.edu.ph">' +
            '</div>' +
            '<div class="modal-form-group">' +
              '<label class="modal-form-label">User Role</label>' +
              '<select class="modal-form-input" id="newUserRole">' +
                '<option value="Instructor">Instructor / Faculty</option>' +
                '<option value="Admin">Institutional Admin</option>' +
                '<option value="Student Coord">Student Coordinator</option>' +
              '</select>' +
            '</div>',
      buttons: [
        {
          text: 'Cancel',
          className: 'btn-secondary'
        },
        {
          text: 'Send Invitation',
          className: 'btn-primary',
          onclick: function(overlay) {
            var name = document.getElementById('newUserName').value;
            var email = document.getElementById('newUserEmail').value;
            var role = document.getElementById('newUserRole').value;
            
            if (name.trim() && email.trim()) {
              var table = document.querySelector('.data-table tbody');
              if (table) {
                var row = document.createElement('tr');
                row.innerHTML = 
                  '<td class="table-cell-pad table-cell-name">' + name + '</td>' +
                  '<td class="instructor-email-cell">' + email + '</td>' +
                  '<td>' + role + '</td>' +
                  '<td>Just Now</td>' +
                  '<td><span class="badge badge-teal">Pending</span></td>' +
                  '<td><button class="btn btn-sm btn-ghost" onclick="toggleInstructorStatus(this, \'' + name + '\')">Deactivate</button></td>';
                table.appendChild(row);
                window.showToast("Invitation Sent", "SSO activation email sent to " + name + " (" + email + ").", "success");
              }
            } else {
              window.showToast("Error", "All fields are required.", "danger");
            }
          }
        }
      ]
    });
  };

  // 13. Investment Strategy Saver (investment-strategy.html)
  window.saveInvestmentStrategy = function() {
    var strats = document.querySelectorAll('.strat-val');
    var tacts = document.querySelectorAll('.tact-val');
    
    var stratSum = 0;
    var tactSum = 0;
    
    strats.forEach(function(input) { stratSum += parseFloat(input.value) || 0; });
    tacts.forEach(function(input) { tactSum += parseFloat(input.value) || 0; });
    
    if (stratSum > 100 || tactSum > 100) {
      window.showToast("Allocation Alert", "The total portfolio allocation sum exceeds 100% limit (" + Math.max(stratSum, tactSum).toFixed(1) + "%). Please rebalance.", "danger");
      return;
    }
    
    window.showToast("Strategy Saved", "Dynamic tactical portfolio allocations saved successfully for processing.", "success");
  };

  // --- STATE-DRIVEN LOOP MANAGEMENT ---
  // Ensure default states exist
  if (localStorage.getItem('bsim-round-number') === null) {
    localStorage.setItem('bsim-round-number', '3');
  }
  if (localStorage.getItem('bsim-round-stage') === null) {
    localStorage.setItem('bsim-round-stage', 'outlook');
  }
  if (localStorage.getItem('bsim-market-outlook-reviewed') === null) {
    localStorage.setItem('bsim-market-outlook-reviewed', 'false');
  }

  window.getRoundNumber = function() {
    return parseInt(localStorage.getItem('bsim-round-number') || '3', 10);
  };

  window.unlockDecisions = function() {
    localStorage.setItem('bsim-market-outlook-reviewed', 'true');
    localStorage.setItem('bsim-round-stage', 'decision');
    window.showToast("Decisions Unlocked", "The Round " + window.getRoundNumber() + " Decision Form is now accessible.", "success");
    setTimeout(function() {
      window.location.href = 'decision.html';
    }, 800);
  };

  window.submitDecisions = function() {
    localStorage.setItem('bsim-round-stage', 'processing');
    window.location.href = 'decision-success.html';
  };

  window.transitionToNextRound = function() {
    var nextRound = window.getRoundNumber() + 1;
    if (nextRound > 6) nextRound = 3; // loop back to 3 for demo purposes
    localStorage.setItem('bsim-round-number', nextRound.toString());
    localStorage.setItem('bsim-market-outlook-reviewed', 'false');
    localStorage.setItem('bsim-round-stage', 'outlook');
    
    window.showToast("Preparing Next Round", "Advancing to Round " + nextRound + " Outlook...", "info");
    setTimeout(function() {
      window.location.href = 'market-outlook.html';
    }, 1000);
  };

  window.handleLockedNav = function(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    window.showToast("Access Locked", "You must review the Market Outlook before you can access the Decision Form.", "warning");
  };

  // --- STEPPER RENDERING ENGINE ---
  window.renderRoundStepper = function() {
    var pageContent = document.querySelector('.page-content');
    if (!pageContent) return;

    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1);
    
    // Determine if we should show the stepper on this page
    var studentPages = [
      'student-dashboard.html',
      'market-outlook.html',
      'decision.html',
      'investment-strategy.html',
      'decision-success.html',
      'results.html',
      'financial.html',
      'class-financials.html',
      'ai-feedback.html',
      'leaderboard.html',
      'resources.html',
      'settings-student.html'
    ];

    var isStudentPage = false;
    for (var i = 0; i < studentPages.length; i++) {
      if (filename.indexOf(studentPages[i]) !== -1) {
        isStudentPage = true;
        break;
      }
    }

    if (!isStudentPage) return;

    // Determine step status based on current filename and global stage
    var globalStage = localStorage.getItem('bsim-round-stage') || 'outlook';
    var activeStepIdx = 1; // 1-indexed: 1 = Outlook, 2 = Decision, 3 = Processing, 4 = Results & AI

    if (filename.indexOf('market-outlook.html') !== -1) {
      activeStepIdx = 1;
    } else if (filename.indexOf('decision.html') !== -1 || filename.indexOf('investment-strategy.html') !== -1) {
      activeStepIdx = 2;
    } else if (filename.indexOf('decision-success.html') !== -1) {
      activeStepIdx = 3;
    } else if (
      filename.indexOf('results.html') !== -1 || 
      filename.indexOf('financial.html') !== -1 || 
      filename.indexOf('class-financials.html') !== -1 || 
      filename.indexOf('ai-feedback.html') !== -1 || 
      filename.indexOf('leaderboard.html') !== -1
    ) {
      activeStepIdx = 4;
    } else {
      // General landing pages display according to global stage
      if (globalStage === 'outlook') activeStepIdx = 1;
      else if (globalStage === 'decision') activeStepIdx = 2;
      else if (globalStage === 'processing') activeStepIdx = 3;
      else if (globalStage === 'results') activeStepIdx = 4;
    }

    var steps = [
      { key: 'outlook', label: 'Market Outlook', href: 'market-outlook.html', stepNum: 1 },
      { key: 'decision', label: 'Submit Decision', href: 'decision.html', stepNum: 2 },
      { key: 'processing', label: 'Processing', href: 'decision-success.html', stepNum: 3 },
      { key: 'results', label: 'Results & AI Recap', href: 'results.html', stepNum: 4 }
    ];

    // Build stepper HTML
    var html = '<div class="round-stepper" id="roundStepper">';
    for (var j = 0; j < steps.length; j++) {
      var step = steps[j];
      var stepIdx = j + 1;
      
      var stateClass = 'locked';
      var circleContent = step.stepNum.toString();
      var clickHandler = '';

      // Determine step status relative to active step index
      if (stepIdx < activeStepIdx) {
        stateClass = 'completed';
        circleContent = '✓';
        clickHandler = 'onclick="window.location.href=\'' + step.href + '\'"';
      } else if (stepIdx === activeStepIdx) {
        stateClass = 'active';
        clickHandler = 'onclick="window.location.href=\'' + step.href + '\'"';
      } else {
        stateClass = 'locked';
        clickHandler = 'onclick="window.showToast(\'Stage Locked\', \'You must complete the current stage first.\', \'warning\')"';
      }

      html += '<div class="stepper-step ' + stateClass + '" ' + clickHandler + '>';
      html += '<div class="step-circle">' + circleContent + '</div>';
      html += '<div class="step-label">' + step.label + '</div>';
      html += '</div>';

      if (j < steps.length - 1) {
        var lineCompleted = (stepIdx < activeStepIdx) ? ' completed' : '';
        html += '<div class="stepper-line' + lineCompleted + '"></div>';
      }
    }
    html += '</div>';

    // Inject as first child of .page-content
    var stepperRoot = document.getElementById('round-stepper-root');
    if (!stepperRoot) {
      stepperRoot = document.createElement('div');
      stepperRoot.id = 'round-stepper-root';
      pageContent.insertBefore(stepperRoot, pageContent.firstChild);
    }
    stepperRoot.innerHTML = html;
  };

  // Run render stepper automatically when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    window.renderRoundStepper();
  });

})();


/**
 * B-Sim AI - Global Action Handlers & UI Interactivity System
 * Creates reusable Toast & Modal utilities and handles simulated actions.
 */

(function() {
  // --- THEME & SCALE STATE PERSISTENCE APPLIER ---
  var themes = {
    teal: {
      teal: '#00f0ff',
      glow: 'rgba(0, 240, 255, 0.4)',
      dim: 'rgba(0, 240, 255, 0.08)'
    },
    amber: {
      teal: '#f4a261',
      glow: 'rgba(244, 162, 97, 0.4)',
      dim: 'rgba(244, 162, 97, 0.08)'
    },
    emerald: {
      teal: '#2ec4b6',
      glow: 'rgba(46, 196, 182, 0.4)',
      dim: 'rgba(46, 196, 182, 0.08)'
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

})();

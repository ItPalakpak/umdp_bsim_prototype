/**
 * Reusable Screen Navigator Component
 * Renders the floating bottom-right navigator panel into #navigator-root.
 * Auto-detects current page from URL to highlight active screen.
 */
function renderNavigator() {
  var root = document.getElementById('navigator-root');
  if (!root) return;

  var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
  var pagesPrefix = isInPages ? '' : 'pages/';
  var rootPrefix = isInPages ? '../' : '';

  var groups = [
    {
      title: 'General & Flow Map',
      screens: [
        { num: '1', label: 'Landing / Login', href: rootPrefix + 'index.html', match: 'index.html' },
        { num: '★', label: 'Wireframe Map', href: rootPrefix + 'wireframe.html', match: 'wireframe.html' }
      ]
    },
    {
      title: 'Student Portal',
      screens: [
        { num: '2', label: 'Student Dashboard', href: pagesPrefix + 'student-dashboard.html', match: 'student-dashboard.html' },
        { num: '19', label: 'Economic Outlook', href: pagesPrefix + 'market-outlook.html', match: 'market-outlook.html' },
        { num: '20', label: 'Investment Strategy', href: pagesPrefix + 'investment-strategy.html', match: 'investment-strategy.html' },
        { num: '3', label: 'Decision Submission', href: pagesPrefix + 'decision.html', match: 'decision.html' },
        { num: '9', label: 'Financial Dashboard', href: pagesPrefix + 'financial.html', match: 'financial.html' },
        { num: '21', label: 'Class Comparison', href: pagesPrefix + 'class-financials.html', match: 'class-financials.html' },
        { num: '4', label: 'AI Feedback Report', href: pagesPrefix + 'ai-feedback.html', match: 'ai-feedback.html' },
        { num: '5', label: 'Leaderboard', href: pagesPrefix + 'leaderboard.html', match: 'leaderboard.html' },
        { num: '11', label: 'Resources Page', href: pagesPrefix + 'resources.html', match: 'resources.html' },
        { num: '12', label: 'Student Settings', href: pagesPrefix + 'settings-student.html', match: 'settings-student.html' }
      ]
    },
    {
      title: 'Instructor Portal',
      screens: [
        { num: '6', label: 'Session Configuration', href: pagesPrefix + 'session-config.html', match: 'session-config.html' },
        { num: '7', label: 'Class Monitoring', href: pagesPrefix + 'class-monitor.html', match: 'class-monitor.html' },
        { num: '8', label: 'Team Deep-Dive', href: pagesPrefix + 'team-deepdive.html', match: 'team-deepdive.html' },
        { num: '13', label: 'Instructor Settings', href: pagesPrefix + 'settings-instructor.html', match: 'settings-instructor.html' }
      ]
    },
    {
      title: 'Institutional Admin',
      screens: [
        { num: '10', label: 'University Admin', href: pagesPrefix + 'admin.html', match: 'admin.html' },
        { num: '14', label: 'User Directory (Admin)', href: pagesPrefix + 'admin-users.html', match: 'admin-users.html' },
        { num: '15', label: 'Billing Details (Admin)', href: pagesPrefix + 'admin-billing.html', match: 'admin-billing.html' },
        { num: '16', label: 'Analytics Report (Admin)', href: pagesPrefix + 'admin-analytics.html', match: 'admin-analytics.html' },
        { num: '17', label: 'Support Center (Admin)', href: pagesPrefix + 'admin-support.html', match: 'admin-support.html' },
        { num: '18', label: 'Admin Settings', href: pagesPrefix + 'settings-admin.html', match: 'settings-admin.html' }
      ]
    }
  ];

  var currentPath = window.location.pathname;

  var html = '<div class="screen-nav-demo" id="screenNavDemo">';
  html += '<div class="screen-nav-label">SCREENS</div>';
  html += '<div class="screen-nav-panel" id="screenNavPanel">';
  html += '<div class="screen-nav-label">B-Sim AI — All Screens</div>';

  for (var g = 0; g < groups.length; g++) {
    var grp = groups[g];
    html += '<div class="screen-group-header">' + grp.title + '</div>';
    for (var i = 0; i < grp.screens.length; i++) {
      var s = grp.screens[i];
      var isActive = currentPath.indexOf(s.match) !== -1 ? ' active-screen' : '';
      html += '<a class="nav-screen-btn' + isActive + '" href="' + s.href + '">';
      html += '<span class="screen-num">' + s.num + '</span>' + s.label;
      html += '</a>';
    }
  }

  html += '</div>';
  html += '<button class="screen-nav-toggle" onclick="toggleNavPanel()">☰ Navigate Screens</button>';
  html += '</div>';

  root.innerHTML = html;
}

/**
 * Toggles the navigator panel open/closed.
 */
function toggleNavPanel() {
  var panel = document.getElementById('screenNavPanel');
  if (panel) panel.classList.toggle('open');
}

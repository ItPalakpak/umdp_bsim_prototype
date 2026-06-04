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

  var screens = [
    { num: '1', label: 'Landing / Login', href: rootPrefix + 'index.html', match: 'index.html' },
    { num: '2', label: 'Student Dashboard', href: pagesPrefix + 'student-dashboard.html', match: 'student-dashboard.html' },
    { num: '3', label: 'Decision Submission', href: pagesPrefix + 'decision.html', match: 'decision.html' },
    { num: '4', label: 'AI Feedback Report', href: pagesPrefix + 'ai-feedback.html', match: 'ai-feedback.html' },
    { num: '5', label: 'Leaderboard', href: pagesPrefix + 'leaderboard.html', match: 'leaderboard.html' },
    { num: '6', label: 'Session Configuration', href: pagesPrefix + 'session-config.html', match: 'session-config.html' },
    { num: '7', label: 'Class Monitoring', href: pagesPrefix + 'class-monitor.html', match: 'class-monitor.html' },
    { num: '8', label: 'Team Deep-Dive', href: pagesPrefix + 'team-deepdive.html', match: 'team-deepdive.html' },
    { num: '9', label: 'Financial Dashboard', href: pagesPrefix + 'financial.html', match: 'financial.html' },
    { num: '10', label: 'University Admin', href: pagesPrefix + 'admin.html', match: 'admin.html' },
    { num: '★', label: 'Wireframe Map', href: rootPrefix + 'wireframe.html', match: 'wireframe.html' }
  ];

  var currentPath = window.location.pathname;

  var html = '<div class="screen-nav-demo" id="screenNavDemo">';
  html += '<div class="screen-nav-label">SCREENS</div>';
  html += '<div class="screen-nav-panel" id="screenNavPanel">';
  html += '<div class="screen-nav-label">B-Sim AI — All Screens</div>';

  for (var i = 0; i < screens.length; i++) {
    var s = screens[i];
    var isActive = currentPath.indexOf(s.match) !== -1 ? ' active-screen' : '';
    html += '<a class="nav-screen-btn' + isActive + '" href="' + s.href + '">';
    html += '<span class="screen-num">' + s.num + '</span>' + s.label;
    html += '</a>';
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

/**
 * Reusable Sidebar Component
 * Renders sidebar navigation into #sidebar-root based on config.
 * 
 * @param {Object} config
 * @param {string} config.variant - 'student' | 'instructor' | 'admin'
 * @param {string} config.activePage - key of the active nav item
 */
function renderSidebar(config) {
  var root = document.getElementById('sidebar-root');
  if (!root) return;

  var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
  var prefix = isInPages ? '' : 'pages/';

  var navItems = {
    student: [
      { key: 'dashboard', label: 'Dashboard', href: prefix + 'student-dashboard.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>' },
      { key: 'decision', label: 'Submit Decision', href: prefix + 'decision.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'results', label: 'My Results', href: prefix + 'financial.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'ai-feedback', label: 'AI Feedback', href: prefix + 'ai-feedback.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'leaderboard', label: 'Leaderboard', href: prefix + 'leaderboard.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'resources', label: 'Resources', href: '#', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
    ],
    instructor: [
      { key: 'session-config', label: '⚙️ New Session', href: prefix + 'session-config.html', icon: '' },
      { key: 'class-monitor', label: '📊 Class Monitor', href: prefix + 'class-monitor.html', icon: '' },
      { key: 'team-deepdive', label: '🔍 Team Deep-Dive', href: prefix + 'team-deepdive.html', icon: '' }
    ],
    admin: [
      { key: 'institution', label: '🏛 Institution', href: '#', icon: '' },
      { key: 'users', label: '👥 User Management', href: '#', icon: '' },
      { key: 'billing', label: '💳 Billing', href: '#', icon: '' },
      { key: 'analytics', label: '📊 Analytics', href: '#', icon: '' },
      { key: 'support', label: '🆘 Support', href: '#', icon: '' }
    ]
  };

  var users = {
    student: { initials: 'JD', name: 'Jamie Dela Cruz', role: 'NovaTech Corp', avatarClass: '' },
    instructor: { initials: 'DR', name: 'Dr. Reyes', role: 'Faculty', avatarClass: ' avatar-instructor' },
    admin: { initials: 'UA', name: 'University Admin', role: 'De La Salle Univ.', avatarClass: ' avatar-admin' }
  };

  var sectionLabels = { student: 'Navigation', instructor: 'Instructor', admin: 'Admin' };

  var variant = config.variant || 'student';
  var activePage = config.activePage || '';
  var items = navItems[variant] || navItems.student;
  var user = users[variant] || users.student;
  var sectionLabel = sectionLabels[variant] || 'Navigation';

  var html = '<div class="sidebar">';
  html += '<div class="sidebar-logo"><div class="logo-mark"><div class="logo-icon">B</div><span class="logo-text">B-Sim <span>AI</span></span></div></div>';
  html += '<div class="sidebar-section-label">' + sectionLabel + '</div>';

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var isActive = item.key === activePage ? ' active' : '';
    html += '<a class="nav-item' + isActive + '" href="' + item.href + '">';
    html += item.icon ? item.icon : '';
    html += item.label;
    html += '</a>';
  }

  html += '<div class="sidebar-footer">';
  html += '<div class="avatar' + user.avatarClass + '">' + user.initials + '</div>';
  html += '<div class="avatar-info"><div class="avatar-name">' + user.name + '</div><div class="avatar-role">' + user.role + '</div></div>';
  html += '</div>';
  html += '</div>';

  root.innerHTML = html;
}

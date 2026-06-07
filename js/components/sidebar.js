/**
 * Reusable Sidebar Component
 * Renders sidebar navigation into #sidebar-root based on config.
 * Supports toggleable collapsed state (saved in localStorage) and user settings tooltip.
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

  // Read collapsed state from localStorage (default to collapsed on mobile screens <= 768px)
  var isMobile = window.innerWidth <= 768;
  var isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true' || isMobile;
  if (isCollapsed) {
    root.classList.add('collapsed');
  } else {
    root.classList.remove('collapsed');
  }

  var navItems = {
    student: [
      { key: 'dashboard', label: 'Dashboard', href: prefix + 'student-dashboard.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/></svg>' },
      { key: 'outlook', label: 'Economic Outlook', href: prefix + 'market-outlook.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10zM2 12h20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'decision', label: 'Submit Decision', href: prefix + 'decision.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'strategy', label: 'Investment Strategy', href: prefix + 'investment-strategy.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1.7-1.95L12 4 4.05 6.05A2 2 0 003 8v8a2 2 0 001.05 1.75L12 20l7.95-4.25A2 2 0 0021 16z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22V12M12 12l8.5-4.5M12 12L3.5 7.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'results', label: 'My Results', href: prefix + 'results.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'comparison', label: 'Class Comparison', href: prefix + 'class-financials.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'ai-feedback', label: 'AI Feedback', href: prefix + 'ai-feedback.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'leaderboard', label: 'Leaderboard', href: prefix + 'leaderboard.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'resources', label: 'Resources', href: prefix + 'resources.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
    ],
    instructor: [
      { key: 'session-config', label: 'New Session', href: prefix + 'session-config.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'class-monitor', label: 'Class Monitor', href: prefix + 'class-monitor.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'team-deepdive', label: 'Team Deep-Dive', href: prefix + 'team-deepdive.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
    ],
    admin: [
      { key: 'institution', label: 'Institution', href: prefix + 'admin.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011-1v5m-4 0h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'users', label: 'User Management', href: prefix + 'admin-users.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'billing', label: 'Billing', href: prefix + 'admin-billing.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'analytics', label: 'Analytics', href: prefix + 'admin-analytics.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 8v8m-4-5v5m-4-2v2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      { key: 'support', label: 'Support', href: prefix + 'admin-support.html', icon: '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
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
  var user = Object.assign({}, users[variant] || users.student); // clone to avoid side effects
  var sectionLabel = sectionLabels[variant] || 'Navigation';

  // Overwrite with dynamic user adjustments if they exist
  var savedName = localStorage.getItem(variant + '-profile-name');
  var savedInitials = localStorage.getItem(variant + '-profile-initials');
  if (savedName) user.name = savedName;
  if (savedInitials) user.initials = savedInitials;

  var html = '<div class="sidebar' + (isCollapsed ? ' collapsed' : '') + '">';
  
  // Logo & Collapse toggle button nested inside sidebar-logo header
  var toggleIcon = '<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var assetsPrefix = isInPages ? '../Assets/' : 'Assets/';
  html += '<div class="sidebar-logo">';
  html += '<div class="logo-mark"><div class="logo-icon"><img src="' + assetsPrefix + 'bsim_ai_icon.svg" alt="Logo"></div><span class="logo-text">B-Sim <span>AI</span></span></div>';
  html += '<button class="sidebar-collapse-toggle-btn" onclick="toggleSidebarCollapse(event)">' + toggleIcon + '</button>';
  html += '</div>';

  html += '<div class="sidebar-section-label">' + sectionLabel + '</div>';

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var isActive = item.key === activePage ? ' active' : '';
    
    var isDecisionLocked = variant === 'student' && item.key === 'decision' && localStorage.getItem('bsim-market-outlook-reviewed') !== 'true';
    var hrefVal = item.href;
    var extraClass = '';
    var onclickAttr = '';
    var labelText = item.label;

    if (isDecisionLocked) {
      hrefVal = 'javascript:void(0)';
      extraClass = ' nav-item-locked';
      onclickAttr = ' onclick="window.handleLockedNav(event)"';
      labelText += ' 🔒';
    }

    html += '<a class="nav-item' + isActive + extraClass + '" href="' + hrefVal + '"' + onclickAttr + ' data-tooltip="' + item.label + '">';
    html += item.icon ? item.icon : '';
    html += '<span class="nav-label">' + labelText + '</span>';
    html += '</a>';
  }


  // Footer / Profile
  html += '<div class="sidebar-footer">';
  html += '<div class="avatar' + user.avatarClass + '">' + user.initials + '</div>';
  html += '<div class="avatar-info"><div class="avatar-name">' + user.name + '</div><div class="avatar-role">' + user.role + '</div></div>';
  
  // Profile Hover Tooltip
  var settingsPage = 'settings-student.html';
  if (variant === 'instructor') settingsPage = 'settings-instructor.html';
  else if (variant === 'admin') settingsPage = 'settings-admin.html';
  
  html += '<div class="avatar-tooltip" id="avatarTooltip">';
  html += '<a href="' + prefix + settingsPage + '" class="tooltip-item">⚙️ Settings</a>';
  html += '<a href="' + (isInPages ? '../' : '') + 'index.html" class="tooltip-item">🚪 Logout</a>';
  html += '</div>';
  
  html += '</div>';
  html += '</div>';

  root.innerHTML = html;
}

/**
 * Toggles the sidebar collapse state.
 */
function toggleSidebarCollapse(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  var root = document.getElementById('sidebar-root');
  if (root) {
    var isCollapsed = !root.classList.contains('collapsed');
    
    // Toggle layout container class
    var sidebar = root.querySelector('.sidebar');
    if (isCollapsed) {
      root.classList.add('collapsed');
      if (sidebar) sidebar.classList.add('collapsed');
      localStorage.setItem('sidebar-collapsed', 'true');
    } else {
      root.classList.remove('collapsed');
      if (sidebar) sidebar.classList.remove('collapsed');
      localStorage.setItem('sidebar-collapsed', 'false');
    }
  }
}

/**
 * Mock settings action handler.
 */
function handleSidebarSettings(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  alert('Account Settings: Update profile details, interface theme, or notification preferences.');
}

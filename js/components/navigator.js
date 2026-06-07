/**
 * Reusable Screen Navigator Component
 * Draggable pill anchored to the right edge. Click to open/close panel.
 * Drag to reposition vertically. Position is saved to localStorage.
 */
function renderNavigator() {
  var root = document.getElementById('navigator-root');
  if (!root) return;

  var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
  var pagesPrefix = isInPages ? '' : 'pages/';
  var rootPrefix = isInPages ? '../' : '';

  // Inject favicon dynamically
  var favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  var assetsPrefix = isInPages ? '../Assets/' : 'Assets/';
  favicon.type = 'image/svg+xml';
  favicon.href = assetsPrefix + 'bsim_ai_icon.svg';

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
        { num: '2',  label: 'Student Dashboard',    href: pagesPrefix + 'student-dashboard.html',  match: 'student-dashboard.html' },
        { num: '19', label: 'Economic Outlook',      href: pagesPrefix + 'market-outlook.html',     match: 'market-outlook.html' },
        { num: '20', label: 'Investment Strategy',   href: pagesPrefix + 'investment-strategy.html',match: 'investment-strategy.html' },
        { num: '3',  label: 'Decision Submission',   href: pagesPrefix + 'decision.html',           match: 'decision.html' },
        { num: '9',  label: 'Financial Dashboard',   href: pagesPrefix + 'financial.html',          match: 'financial.html' },
        { num: '9b', label: 'Round Results Event',   href: pagesPrefix + 'results.html',            match: 'results.html' },
        { num: '21', label: 'Class Comparison',      href: pagesPrefix + 'class-financials.html',   match: 'class-financials.html' },

        { num: '4',  label: 'AI Feedback Report',    href: pagesPrefix + 'ai-feedback.html',        match: 'ai-feedback.html' },
        { num: '5',  label: 'Leaderboard',           href: pagesPrefix + 'leaderboard.html',        match: 'leaderboard.html' },
        { num: '11', label: 'Resources Page',        href: pagesPrefix + 'resources.html',          match: 'resources.html' },
        { num: '12', label: 'Student Settings',      href: pagesPrefix + 'settings-student.html',   match: 'settings-student.html' }
      ]
    },
    {
      title: 'Instructor Portal',
      screens: [
        { num: '6',  label: 'Session Configuration', href: pagesPrefix + 'session-config.html',     match: 'session-config.html' },
        { num: '7',  label: 'Class Monitoring',      href: pagesPrefix + 'class-monitor.html',      match: 'class-monitor.html' },
        { num: '8',  label: 'Team Deep-Dive',        href: pagesPrefix + 'team-deepdive.html',      match: 'team-deepdive.html' },
        { num: '13', label: 'Instructor Settings',   href: pagesPrefix + 'settings-instructor.html',match: 'settings-instructor.html' }
      ]
    },
    {
      title: 'Institutional Admin',
      screens: [
        { num: '10', label: 'University Admin',         href: pagesPrefix + 'admin.html',           match: 'admin.html' },
        { num: '14', label: 'User Directory (Admin)',   href: pagesPrefix + 'admin-users.html',     match: 'admin-users.html' },
        { num: '15', label: 'Billing Details (Admin)',  href: pagesPrefix + 'admin-billing.html',   match: 'admin-billing.html' },
        { num: '16', label: 'Analytics Report (Admin)', href: pagesPrefix + 'admin-analytics.html', match: 'admin-analytics.html' },
        { num: '17', label: 'Support Center (Admin)',   href: pagesPrefix + 'admin-support.html',   match: 'admin-support.html' },
        { num: '18', label: 'Admin Settings',           href: pagesPrefix + 'settings-admin.html',  match: 'settings-admin.html' }
      ]
    }
  ];

  var currentPath = window.location.pathname;

  // Build HTML
  var html = '';

  // Backdrop (transparent click-catcher to close panel)
  html += '<div class="screen-nav-backdrop" id="screenNavBackdrop" onclick="closeNavPanel()"></div>';

  html += '<div class="screen-nav-demo" id="screenNavDemo">';

  // Panel (opens to the left of the pill)
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

  // The pill button — shows only a map/grid icon
  html += '<button class="screen-nav-toggle" id="screenNavToggle" title="Navigate screens" aria-label="Navigate screens">';
  html += '⊞';
  html += '</button>';

  html += '</div>';

  root.innerHTML = html;

  // ── Drag + click logic ──────────────────────────────────────
  initNavigatorDrag();
}

function openNavPanel() {
  var panel = document.getElementById('screenNavPanel');
  var backdrop = document.getElementById('screenNavBackdrop');
  if (panel) panel.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeNavPanel() {
  var panel = document.getElementById('screenNavPanel');
  var backdrop = document.getElementById('screenNavBackdrop');
  if (panel) panel.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function toggleNavPanel() {
  var panel = document.getElementById('screenNavPanel');
  if (panel && panel.classList.contains('open')) {
    closeNavPanel();
  } else {
    openNavPanel();
  }
}

function initNavigatorDrag() {
  var demo   = document.getElementById('screenNavDemo');
  var toggle = document.getElementById('screenNavToggle');
  if (!demo || !toggle) return;

  // Restore saved vertical position (stored as top px from viewport top)
  var saved = localStorage.getItem('nav-pill-top');
  if (saved !== null) {
    var topVal = parseFloat(saved);
    topVal = Math.max(40, Math.min(window.innerHeight - 80, topVal));
    demo.style.top = topVal + 'px';
    demo.style.transform = 'none';
  }

  var isDragging = false;
  var dragStartY = 0;
  var dragStartTop = 0;
  var dragMoved = false;
  var DRAG_THRESHOLD = 5; // px moved before considered a drag

  function getTopPx() {
    // Always work in px from top
    var rect = demo.getBoundingClientRect();
    return rect.top;
  }

  // ── Pointer events (works for both mouse and touch) ──
  toggle.addEventListener('pointerdown', function(e) {
    e.preventDefault();
    isDragging = true;
    dragMoved = false;
    dragStartY = e.clientY;
    dragStartTop = getTopPx();

    // Remove CSS transform so we can work in pure `top` px
    demo.style.transform = 'none';
    demo.style.top = dragStartTop + 'px';

    toggle.setPointerCapture(e.pointerId);
    toggle.style.cursor = 'grabbing';
  });

  toggle.addEventListener('pointermove', function(e) {
    if (!isDragging) return;
    var delta = e.clientY - dragStartY;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragMoved = true;
    if (!dragMoved) return;

    var newTop = dragStartTop + delta;
    // Clamp within viewport with some margin
    newTop = Math.max(40, Math.min(window.innerHeight - 80, newTop));
    demo.style.top = newTop + 'px';
  });

  toggle.addEventListener('pointerup', function(e) {
    if (!isDragging) return;
    isDragging = false;
    toggle.style.cursor = 'grab';

    if (dragMoved) {
      // Save position
      localStorage.setItem('nav-pill-top', parseFloat(demo.style.top));
    } else {
      // It was a tap/click, not a drag — toggle the panel
      toggleNavPanel();
    }
    dragMoved = false;
  });

  toggle.addEventListener('pointercancel', function() {
    isDragging = false;
    dragMoved = false;
    toggle.style.cursor = 'grab';
  });

  // Keep pill in-bounds on window resize
  window.addEventListener('resize', function() {
    var current = parseFloat(demo.style.top);
    if (isNaN(current)) return;
    var clamped = Math.max(40, Math.min(window.innerHeight - 80, current));
    if (clamped !== current) {
      demo.style.top = clamped + 'px';
      localStorage.setItem('nav-pill-top', clamped);
    }
  });
}
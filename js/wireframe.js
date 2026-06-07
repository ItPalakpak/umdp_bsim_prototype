/**
 * Wireframe Page Module
 * Handles visual wireframe expansion, page details side-sheet lookup,
 * and high-fidelity HTML5 Canvas layout rasterization to export wireframes as PNGs.
 */

// Page details lookup database mapped by card href
var pageDetails = {
  "index.html": {
    purpose: "Public landing page and gateway portal for all user types (Students, Instructors, Institutional Admins).",
    functions: [
      "Role-based login routing for Student, Instructor, and Admin dashboard portals.",
      "Explore product platform features, ESG configuration guides, and annual pricing tiers.",
      "Submit interactive request demo form with validation checks and auto-closing success indicators.",
      "Review PRME sustainability alignment research metrics and growth telemetry stats."
    ]
  },
  "pages/student-dashboard.html": {
    purpose: "Central workspace for students to track cohort standing, round timers, and core financial performance.",
    functions: [
      "View global KPIs (Net Profit, Revenue, ESG Rating, Cumulative Return, AuM).",
      "Monitor cohort leaderboard rankings and real-time round countdown progression.",
      "Analyze historical profit and margin trend lines using dynamic chart interfaces.",
      "Access pending action checklists and read top priority alerts and notification feeds."
    ]
  },
  "pages/decision.html": {
    purpose: "Submit operational decision sets across asset classes, personnel, and sustainability parameters.",
    functions: [
      "Formulate corporate operations allocations including pricing fees and marketing spends.",
      "Input workforce decisions (salesforce numbers, staff base salary rates, and training hours).",
      "Manage ESG & carbon offset parameters with safety warning metrics.",
      "Toggle collapsible Market Benchmark panel showing last round averages, previous inputs, and ESG thresholds.",
      "Verify allocation constraints and perform final submission locks with toast feedback."
    ]
  },
  "pages/ai-feedback.html": {
    purpose: "Diagnostic feedback center rendering AI-driven performance audit reviews and forecast warnings.",
    functions: [
      "Inspect Section A containing backward-looking diagnostic cards with severity tags (Critical, Warning, Opportunity).",
      "Review Section B Playbook containing forward-looking recommendations for Pricing, Operations, and HR.",
      "Inspect competitor asset distributions and market share trends using dynamic charts.",
      "Trigger transition to next round via the CTA button at the bottom of the Playbook."
    ]
  },

  "pages/leaderboard.html": {
    purpose: "Cohort ranking ledger displaying relative standing by financial and ESG metrics.",
    functions: [
      "Display cohort team rankings based on overall performance score algorithms.",
      "Filter standings using sort actions (Overall, Net Revenue, ESG Score).",
      "Track round-by-round ranking delta shifts with green/red indicator badges.",
      "View team details highlighting key performance metrics in a table layout."
    ]
  },
  "pages/financial.html": {
    purpose: "Comprehensive financial statement explorer tracking individual team performance.",
    functions: [
      "Inspect Income Statement columns detailing EBITDA, EBIT, and margins.",
      "Review Balance Sheet rows evaluating assets, liabilities, and retained earnings.",
      "Analyze Cash Flow Statements assessing operations, investing, and financing items.",
      "Switch rounds and compare statements side-by-side with dynamic updates."
    ]
  },
  "pages/resources.html": {
    purpose: "Resource hub offering reference guides, walkthroughs, FAQs, and pricing models.",
    functions: [
      "Access quickstart operational guides and workforce manuals.",
      "Download tactical Excel templates (e.g., pricing modeler spreadsheets).",
      "View modal overlays containing video walkthrough transcripts and documentation summaries.",
      "Browse structured FAQs answering questions on scoring weights and AI diagnostic audits."
    ]
  },
  "pages/settings-student.html": {
    purpose: "Student configuration settings page to customize profile details and application appearance.",
    functions: [
      "Update profile credentials (e.g., team alias, course name, avatar initials).",
      "Swap color themes globally (Teal, Amber, Emerald) with persistent local storage saving.",
      "Scale application text sizes dynamically to support readability.",
      "Configure automated notification preferences and dead-line reminder popups."
    ]
  },
  "pages/session-config.html": {
    purpose: "Instructor control panel to configure session parameters, round schedules, and custom market shocks.",
    functions: [
      "Manage active rounds, deadline timers, and session duration parameters.",
      "Configure ESG carbon limits, minimum capital requirements, and training scales.",
      "Deploy custom economic shocks (e.g., ESG regulations, inflation spikes) for specific rounds.",
      "Restore default configuration presets and save session properties with confirmation sheets."
    ]
  },
  "pages/class-monitor.html": {
    purpose: "Instructor monitoring deck to track team progress, submissions, and key risk indicators.",
    functions: [
      "Scan live submission states, check decision locks, and track active round completion percentages.",
      "Monitor cohort average metrics (Total Revenues, Profit margins, ESG scores).",
      "Identify at-risk teams using dynamic alerts and interactive filters (e.g., show only at-risk).",
      "Access slide-out sheets for overriding decision locks or sending targeted feedback comments."
    ]
  },
  "pages/team-deepdive.html": {
    purpose: "Instructor investigation console allowing granular audits of specific team performance logs.",
    functions: [
      "Audit team-specific historical P&L trends, cash balances, and operational decisions.",
      "Compare actual team results against cohort averages deep diagnosis.",
      "Review submitted decisions (Pricing, Personnel, Sustainability) in details list cards.",
      "Enter custom administrative financial adjustments and post direct advisory feedback."
    ]
  },
  "pages/settings-instructor.html": {
    purpose: "Instructor account controls and LTI Canvas integration parameters.",
    functions: [
      "Manage profile credentials and edit dashboard notification thresholds.",
      "Initialize mock Canvas LMS integrations and generate secure LTI key strings.",
      "Configure system warning alerts (e.g., warn when submission rates are under 70%).",
      "Restore instructor defaults and change global accessibility sizes."
    ]
  },
  "pages/admin.html": {
    purpose: "Institutional billing, active seats allocation, and coordinator overview metrics.",
    functions: [
      "Track active student seat allocations, instructor counts, and overall resource usage.",
      "Inspect current course schedules, billing statuses, and license expiry details.",
      "Trigger interactive quick action links to access the Documentation Library, Support Center, and Usage Analytics.",
      "Initiate billing upgrades or view invoices log spreadsheets."
    ]
  },
  "pages/admin-users.html": {
    purpose: "Administrative directory database managing all institutional system users.",
    functions: [
      "Search user records dynamically and filter rows by system roles (e.g., Instructor, Coordinator).",
      "Invite new system users by email, auto-generating user profile entries in real-time.",
      "Deactivate/activate system accounts instantly with green/red indicator state updates.",
      "Edit user contact information and view relative course assignment tallies."
    ]
  },
  "pages/admin-billing.html": {
    purpose: "Institutional license limits, quota limits tracker, and invoice payment center.",
    functions: [
      "Monitor course licenses quota bars (student accounts, instructor slots, session limits).",
      "Upgrade billing tiers with instant capacity and seat adjustments.",
      "Manage institutional credit cards and primary billing addresses.",
      "Download detailed historical invoices as PDF files."
    ]
  },
  "pages/admin-analytics.html": {
    purpose: "Usage analytics telemetry engine assessing course engagement and submission timelines.",
    functions: [
      "Render dual-axis line charts showing student session minutes vs decision completion rates.",
      "Monitor course progress stages, comparing submissions by team.",
      "Analyze historical platform feedback survey metrics and system usage statistics.",
      "Export telemetry records as CSV reports."
    ]
  },
  "pages/admin-support.html": {
    purpose: "System telemetry dashboard and coordinator support ticket response console.",
    functions: [
      "Monitor real-time server health metrics (CPU load, API latency, Database replica lag).",
      "Inspect system logs showing automated error triggers and synchronization logs.",
      "Browse active support tickets from instructors and coordinates.",
      "Submit quick ticket responses, changing status categories (Open, In-Progress, Resolved)."
    ]
  },
  "pages/settings-admin.html": {
    purpose: "Institutional system-wide configuration controls and SAML SSO credentials.",
    functions: [
      "Modify admin profile information and email notifications preferences.",
      "Toggle SAML/SSO authentication pathways and update security settings.",
      "Set automated inactivity timeouts for active sessions.",
      "Configure system alerts thresholds (e.g., notify on server CPU loads > 85%)."
    ]
  },
  "pages/market-outlook.html": {
    purpose: "Market Outlook (Gate) screen showing dynamic economic briefs, events, signals, and locking gateway control.",
    functions: [
      "Review Market Conditions panel featuring Consumer Demand, Inflation, GDP Growth, and Raw Material Cost indicators.",
      "Inspect anonymized strategic Competitor Signals from the previous round.",
      "Acknowledge the dynamic Industry Event alert banner configured for the round.",
      "Click the gateway Proceed to Decisions button to unlock the student Decision Submission form."
    ]
  },
  "pages/results.html": {
    purpose: "Dedicated Round Results screen displaying relative standings and cohort benchmark metrics.",
    functions: [
      "Acknowledge Round Complete hero banner and status verification indicator.",
      "Compare Revenue, Net Profit, Market Share, and ESG score on a 3-column table showing Your Team / Market Average / Leading Team.",
      "Review delta indicators on every KPI comparing the current round against the previous round.",
      "Read What the Market Did summaries detailing collective competitor actions."
    ]
  },

  "pages/investment-strategy.html": {
    purpose: "Asset allocation planning board and tactical investment portfolio strategy panel.",
    functions: [
      "Input tactical asset class allocations (Equities, Bonds, Cash, Commodities).",
      "Toggle automated AI-based portfolio optimization sliders.",
      "Analyze portfolio tracking error trends on a dual-axis information ratio chart.",
      "Review currency distributions and total return statistics relative to benchmark indexes."
    ]
  },
  "pages/class-financials.html": {
    purpose: "Cohort comparison grid mapping detailed financial statements for all cohort teams.",
    functions: [
      "Compare team financial results across Income Statements, Balance Sheets, and Cash Flows.",
      "Audit team operations, personnel headcounts, salaries, and hours on the HR Report.",
      "Change rounds (1 to 5) to dynamically update metrics values using team trajectory profiles.",
      "Identify the active user's team column using persistent highlight stylings."
    ]
  }
};

/**
 * Opens the Zoom Modal and renders the enlarged schematic page layout with details on the right side.
 *
 * @param {MouseEvent} event - The click event from the zoom button
 * @param {HTMLButtonElement} btn - The clicked zoom button element
 */
function zoomWireframe(event, btn) {
  // Prevent navigating to the linked page
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // Find the mini-wireframe container and parent card
  var parentWireframe = btn.closest('.mini-wireframe');
  var parentCard = btn.closest('.wireframe-card');
  
  if (parentWireframe && parentCard) {
    var titleEl = parentCard.querySelector('.wireframe-card-title');
    var title = titleEl ? titleEl.textContent : 'Page Wireframe';
    
    // Set modal title
    var modalTitle = document.getElementById('zoom-modal-title');
    if (modalTitle) {
      modalTitle.textContent = title + ' — Layout Wireframe';
    }

    // Retrieve the card's href destination to lookup details
    var hrefAttr = parentCard.getAttribute('href') || '';
    
    // Fill in Page Purpose and Key Functions on the right side
    var purposeEl = document.getElementById('zoom-details-purpose');
    var functionsEl = document.getElementById('zoom-details-functions');
    
    var details = pageDetails[hrefAttr];
    if (details) {
      if (purposeEl) purposeEl.textContent = details.purpose;
      if (functionsEl) {
        var listHtml = '';
        for (var i = 0; i < details.functions.length; i++) {
          listHtml += '<li>' + details.functions[i] + '</li>';
        }
        functionsEl.innerHTML = listHtml;
      }
    } else {
      // Fallback if not found in dictionary
      var cardDescEl = parentCard.querySelector('.wireframe-card-desc');
      var fallbackDesc = cardDescEl ? cardDescEl.textContent : 'Interactive system page wireframe.';
      if (purposeEl) purposeEl.textContent = fallbackDesc;
      if (functionsEl) {
        functionsEl.innerHTML = '<li>Renders dynamic responsive grids and KPI statistics layout blocks.</li><li>Includes functional navigation controls.</li>';
      }
    }

    // Clone the wireframe structure
    var clone = parentWireframe.cloneNode(true);
    
    // Remove the zoom button from the clone so it doesn't render in modal
    var zoomBtn = clone.querySelector('.wireframe-zoom-btn');
    if (zoomBtn) {
      zoomBtn.remove();
    }

    // Convert the outer class to large-wireframe
    clone.className = clone.className.replace('mini-wireframe', 'large-wireframe');

    // Insert cloned wireframe into modal body container
    var containerLeft = document.getElementById('zoom-wireframe-container');
    if (containerLeft) {
      containerLeft.innerHTML = '';
      containerLeft.appendChild(clone);
    }

    // Set redirect button target URL
    var redirectBtn = document.getElementById('zoom-redirect-btn');
    if (redirectBtn) {
      redirectBtn.onclick = function() {
        window.location.href = hrefAttr;
      };
    }

    // Open the overlay
    var overlay = document.getElementById('zoom-modal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
}

/**
 * Closes the zoomed wireframe modal.
 */
function closeZoomModal() {
  var overlay = document.getElementById('zoom-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/**
 * High-fidelity HTML5 Canvas schematic layout rasterizer.
 * Reads the structure and classes of the cloned .large-wireframe layout
 * and outputs a downloadable PNG image representation.
 */
function downloadWireframeAsImage() {
  var largeWireframe = document.querySelector('#zoom-wireframe-container .large-wireframe');
  if (!largeWireframe) return;

  // Let's create an offscreen canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // Use bounding rect to get actual rendered layout coordinates
  var parentRect = largeWireframe.getBoundingClientRect();
  var scale = 2; // Render at 2x resolution for clean outline text and line rendering
  
  canvas.width = parentRect.width * scale;
  canvas.height = parentRect.height * scale;
  ctx.scale(scale, scale);

  // Fill canvas with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, parentRect.width, parentRect.height);

  // Draw the outer container box
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, parentRect.width, parentRect.height);

  // Recursive block renderer
  function renderElement(el) {
    // Skip zoom buttons and details panels if nested
    if (el.classList.contains('wireframe-zoom-btn')) return;

    var rect = el.getBoundingClientRect();
    var x = rect.left - parentRect.left;
    var y = rect.top - parentRect.top;
    var w = rect.width;
    var h = rect.height;

    var classes = el.className || '';
    
    var shouldDraw = false;
    var fillColor = '#ffffff';
    var strokeColor = '#444444';
    var lineWidth = 1;
    var isDashed = false;
    var drawDiagonals = false;
    var diagonalColor = '#e0e0e0';

    if (classes.indexOf('wireframe-block-sidebar') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#444444';
    } else if (classes.indexOf('wireframe-block-topbar') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#444444';
    } else if (classes.indexOf('wireframe-block-header') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#444444';
    } else if (classes.indexOf('wireframe-block-tab') !== -1) {
      shouldDraw = true;
      if (classes.indexOf('active') !== -1) {
        fillColor = '#EAF9FA';
        strokeColor = '#0098A6';
      } else {
        fillColor = '#ffffff';
        strokeColor = '#444444';
      }
    } else if (classes.indexOf('wireframe-block-list-item') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#666666';
      isDashed = true;
    } else if (classes.indexOf('wireframe-block-table-row') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#444444';
    } else if (classes.indexOf('wireframe-block-table-cell') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#dddddd';
    } else if (classes.indexOf('wireframe-block-box-teal') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#0098A6';
      drawDiagonals = true;
      diagonalColor = '#EAF9FA';
    } else if (classes.indexOf('wireframe-block-box-amber') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#E07B39';
      drawDiagonals = true;
      diagonalColor = '#FEF3C7';
    } else if (classes.indexOf('wireframe-block-box-green') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#16A085';
      drawDiagonals = true;
      diagonalColor = '#D1FAE5';
    } else if (classes.indexOf('wireframe-block-box') !== -1) {
      shouldDraw = true;
      fillColor = '#ffffff';
      strokeColor = '#555555';
      drawDiagonals = true;
      diagonalColor = '#e0e0e0';
    }

    // Perform rendering of bounding block on canvas
    if (shouldDraw && w > 0 && h > 0) {
      ctx.save();
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      if (isDashed) {
        ctx.setLineDash([3, 3]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.strokeRect(x, y, w, h);
      ctx.restore();

      // Overlap linear diagonal placeholder lines
      if (drawDiagonals) {
        ctx.save();
        ctx.strokeStyle = diagonalColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Top-left to bottom-right
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y + h);
        // Bottom-left to top-right
        ctx.moveTo(x, y + h);
        ctx.lineTo(x + w, y);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Recurse children elements to draw inner components
    for (var i = 0; i < el.children.length; i++) {
      renderElement(el.children[i]);
    }
  }

  // Draw each child element hierarchically
  for (var i = 0; i < largeWireframe.children.length; i++) {
    renderElement(largeWireframe.children[i]);
  }

  // Determine a filename based on the active modal title name
  var modalTitle = document.getElementById('zoom-modal-title');
  var rawTitle = modalTitle ? modalTitle.textContent : 'Page Wireframe';
  var cleanedName = rawTitle.toLowerCase().replace(' — layout wireframe', '').replace(/[^a-z0-9]+/g, '_');
  var filename = 'wireframe_' + cleanedName + '.png';

  // Spawn dynamic download anchor link
  var link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Background click listener to close modal
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('zoom-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeZoomModal();
      }
    });
  }
});

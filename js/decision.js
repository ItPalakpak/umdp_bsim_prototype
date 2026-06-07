/**
 * Decision Form Module
 * Tab switching, modal handling, and form submission for the decision page.
 */

/**
 * Switches active decision tab and shows corresponding panel.
 * @param {HTMLElement} btn - The clicked tab button
 * @param {string} panelId - ID of the tab panel to show
 */
function switchDecisionTab(btn, panelId) {
  document.querySelectorAll('.decision-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
  btn.classList.add('active');
  var panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

/** Opens the submit confirmation modal. */
function openSubmitModal() {
  document.getElementById('submitModal').classList.add('open');
}

/** Closes the submit confirmation modal. */
function closeSubmitModal() {
  document.getElementById('submitModal').classList.remove('open');
}

/** Submits the decision and redirects to success page. */
function submitDecision() {
  closeSubmitModal();
  if (window.submitDecisions) {
    window.submitDecisions();
  } else {
    window.location.href = 'decision-success.html';
  }
}


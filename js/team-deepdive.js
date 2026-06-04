/**
 * Team Deep-Dive Side Sheet Module
 * Opens and closes the team analysis side sheet.
 */

/**
 * Opens the team deep-dive side sheet.
 * @param {string} teamName - Name of the team to display
 */
function openTeamDeepDive(teamName) {
  document.getElementById('teamSideSheet').classList.add('open');
  document.getElementById('teamSheetOverlay').classList.add('open');
  var nameEl = document.getElementById('sheetTeamName');
  if (nameEl) nameEl.textContent = teamName;
}

/** Closes the team deep-dive side sheet. */
function closeTeamDeepDive() {
  document.getElementById('teamSideSheet').classList.remove('open');
  document.getElementById('teamSheetOverlay').classList.remove('open');
}

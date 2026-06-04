/**
 * Reusable Top Bar Component
 * Renders top navigation bar into #topbar-root based on config.
 *
 * @param {Object} config
 * @param {string} config.title - Main title text
 * @param {string} [config.subtitle] - Subtitle text
 * @param {Array}  [config.badges] - Array of { text, variant } objects
 * @param {Object} [config.timer] - { label, value } for timer widget
 * @param {Array}  [config.actions] - Array of { text, className } for action buttons
 */
function renderTopBar(config) {
  var root = document.getElementById('topbar-root');
  if (!root) return;

  var html = '<div class="top-bar">';
  html += '<div>';
  html += '<div class="top-bar-title">' + (config.title || '') + '</div>';
  if (config.subtitle) {
    html += '<div class="top-bar-sub">' + config.subtitle + '</div>';
  }
  html += '</div>';
  html += '<div class="top-bar-spacer"></div>';

  if (config.badges && config.badges.length > 0) {
    for (var i = 0; i < config.badges.length; i++) {
      var badge = config.badges[i];
      html += '<span class="badge badge-' + badge.variant + '">' + badge.text + '</span>';
    }
  }

  if (config.timer) {
    html += '<div class="timer-widget">';
    html += '<div class="timer-icon">⏱</div>';
    html += '<div>';
    html += '<div class="timer-label">' + config.timer.label + '</div>';
    html += '<div class="timer-value">' + config.timer.value + '</div>';
    html += '</div>';
    html += '</div>';
  }

  if (config.actions && config.actions.length > 0) {
    for (var j = 0; j < config.actions.length; j++) {
      var action = config.actions[j];
      var clickAttr = action.onclick ? ' onclick="' + action.onclick + '"' : '';
      html += '<button class="' + action.className + '"' + clickAttr + '>' + action.text + '</button>';
    }
  }

  html += '</div>';
  root.innerHTML = html;
}

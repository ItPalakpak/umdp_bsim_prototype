/**
 * Collapsible Section Module
 * Toggles collapsible content sections.
 */

/**
 * Toggles a collapsible section open/closed.
 * @param {string} id - ID of the collapsible body element
 */
function toggleCollapsible(id) {
  var body = document.getElementById(id);
  var arrow = document.getElementById(id + 'Arrow');
  body.classList.toggle('open');
  if (arrow) arrow.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
}

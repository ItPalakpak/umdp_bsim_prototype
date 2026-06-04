/**
 * Leaderboard Table Sort Module
 * Sorts table columns by numeric value.
 */

/**
 * Sorts a table column in ascending/descending order.
 * @param {HTMLElement} th - The clicked table header element
 * @param {number} colIdx - Column index to sort by
 */
function sortTable(th, colIdx) {
  var tbody = document.getElementById('leaderboardBody');
  var rows = Array.from(tbody.querySelectorAll('tr'));
  var asc = th.dataset.asc !== 'true';
  th.dataset.asc = asc;
  rows.sort(function(a, b) {
    var aVal = a.cells[colIdx] ? a.cells[colIdx].textContent.trim().replace(/[^0-9.]/g, '') : '';
    var bVal = b.cells[colIdx] ? b.cells[colIdx].textContent.trim().replace(/[^0-9.]/g, '') : '';
    return asc
      ? parseFloat(aVal || 0) - parseFloat(bVal || 0)
      : parseFloat(bVal || 0) - parseFloat(aVal || 0);
  });
  rows.forEach(function(r) { tbody.appendChild(r); });
}

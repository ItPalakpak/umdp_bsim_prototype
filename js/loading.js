/**
 * Loading Screen Module
 * Handles the loading screen fade-out animation on page load.
 * Used only on index.html (landing page).
 */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    var ls = document.getElementById('loading-screen');
    if (ls) {
      ls.style.opacity = '0';
      setTimeout(function() {
        ls.style.display = 'none';
        var nav = document.getElementById('screenNavDemo');
        if (nav) nav.style.display = 'flex';
      }, 500);
    }
  }, 1800);
});

/**
 * Chart.js Initialization Module
 * Provides chart defaults and page-specific chart init functions.
 * Requires Chart.js to be loaded via CDN before this file.
 */

// Global Chart.js defaults
Chart.defaults.color = '#8A9BAD';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'DM Mono', monospace";
Chart.defaults.font.size = 11;

var chartInstances = {};

/**
 * Initializes or re-initializes a Chart.js chart.
 * @param {string} id - Canvas element ID
 * @param {Object} config - Chart.js config object
 */
function initChart(id, config) {
  if (chartInstances[id]) { chartInstances[id].destroy(); }
  var ctx = document.getElementById(id);
  if (ctx) chartInstances[id] = new Chart(ctx, config);
}

/** Student Dashboard charts */
function initDashboardCharts() {
  initChart('dashTrendChart', {
    type: 'line',
    data: {
      labels: ['R1', 'R2', 'R3'],
      datasets: [
        { label: 'Revenue', data: [12.8, 16.4, 18.4], borderColor: '#00C2CB', backgroundColor: 'rgba(0,194,203,0.1)', tension: 0.4, fill: true, pointBackgroundColor: '#00C2CB' },
        { label: 'Net Profit', data: [2.9, 3.9, 4.2], borderColor: '#2EC4B6', backgroundColor: 'rgba(46,196,182,0.08)', tension: 0.4, fill: true, pointBackgroundColor: '#2EC4B6' }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { boxWidth: 10, usePointStyle: true } } }, scales: { y: { beginAtZero: false, ticks: { callback: function(v) { return '$' + v + 'M'; } } } } }
  });
}

/** AI Feedback charts */
function initFeedbackCharts() {
  initChart('marketShareChart', {
    type: 'doughnut',
    data: {
      labels: ['NovaTech', 'TeamAlpha', 'Stratosphere', 'Others'],
      datasets: [{ data: [23.4, 26.8, 21.1, 28.7], backgroundColor: ['#00C2CB', '#F4A261', '#2EC4B6', '#162C44'], borderColor: '#0D1B2A', borderWidth: 3 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true } } } }
  });
  initChart('profitTrendChart', {
    type: 'line',
    data: {
      labels: ['R1', 'R2', 'R3'],
      datasets: [
        { label: 'NovaTech', data: [2.9, 3.9, 4.2], borderColor: '#00C2CB', tension: 0.4, pointBackgroundColor: '#00C2CB' },
        { label: 'Class Avg', data: [2.1, 2.8, 3.0], borderColor: '#8A9BAD', borderDash: [4,4], tension: 0.4 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { boxWidth: 10, usePointStyle: true } } }, scales: { y: { ticks: { callback: function(v) { return '$' + v + 'M'; } } } } }
  });
}

/** Class Monitor charts */
function initClassMonitorCharts() {
  initChart('classShareChart', {
    type: 'pie',
    data: {
      labels: ['TeamAlpha', 'NovaTech', 'Stratosphere', 'Omega', 'BlueStar', 'Others'],
      datasets: [{ data: [26.8, 23.4, 21.1, 18.9, 5.4, 4.4], backgroundColor: ['#F4A261', '#00C2CB', '#2EC4B6', '#162C44', '#E63946', '#4A6077'], borderColor: '#0D1B2A', borderWidth: 2 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } } } } }
  });
  initChart('classAvgProfitChart', {
    type: 'line',
    data: {
      labels: ['R1', 'R2', 'R3'],
      datasets: [{ label: 'Class Avg Profit', data: [2.1, 2.8, 3.0], borderColor: '#00C2CB', backgroundColor: 'rgba(0,194,203,0.1)', tension: 0.4, fill: true }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: function(v) { return '$' + v + 'M'; } } } } }
  });
}

/** Financial Dashboard charts */
function initFinancialCharts() {
  initChart('finTrendChart', {
    type: 'bar',
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3'],
      datasets: [
        { label: 'Revenue', data: [12.8, 16.4, 18.4], backgroundColor: 'rgba(0,194,203,0.6)', borderRadius: 6 },
        { label: 'Net Profit', data: [2.9, 3.9, 4.2], backgroundColor: 'rgba(46,196,182,0.6)', borderRadius: 6 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { boxWidth: 10, usePointStyle: true } } }, scales: { y: { ticks: { callback: function(v) { return '$' + v + 'M'; } } } } }
  });
}

/** Admin Dashboard charts */
function initAdminCharts() {
  initChart('adminMauChart', {
    type: 'bar',
    data: {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{ label: 'Active Users', data: [120, 198, 245, 271, 284, 260], backgroundColor: 'rgba(0,194,203,0.55)', borderRadius: 5 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
}

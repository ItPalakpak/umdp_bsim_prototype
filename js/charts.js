/**
 * Chart.js Initialization Module
 * Provides chart defaults and page-specific chart init functions.
 * Requires Chart.js to be loaded via CDN before this file.
 */

// Global Chart.js defaults
Chart.defaults.color = '#5A6A7A';
Chart.defaults.borderColor = '#E2E8F0';
Chart.defaults.font.family = "'JetBrains Mono', 'Courier New', monospace";
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
        { label: 'Revenue', data: [12.8, 16.4, 18.4], borderColor: '#0098A6', backgroundColor: 'rgba(0,152,166,0.1)', tension: 0.4, fill: true, pointBackgroundColor: '#0098A6' },
        { label: 'Net Profit', data: [2.9, 3.9, 4.2], borderColor: '#16A085', backgroundColor: 'rgba(22,160,133,0.08)', tension: 0.4, fill: true, pointBackgroundColor: '#16A085' }
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
      datasets: [{ data: [23.4, 26.8, 21.1, 28.7], backgroundColor: ['#0098A6', '#E07B39', '#16A085', '#5A6A7A'], borderColor: '#FFFFFF', borderWidth: 3 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true } } } }
  });
  initChart('profitTrendChart', {
    type: 'line',
    data: {
      labels: ['R1', 'R2', 'R3'],
      datasets: [
        { label: 'NovaTech', data: [2.9, 3.9, 4.2], borderColor: '#0098A6', tension: 0.4, pointBackgroundColor: '#0098A6' },
        { label: 'Class Avg', data: [2.1, 2.8, 3.0], borderColor: '#5A6A7A', borderDash: [4,4], tension: 0.4 }
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
      datasets: [{ data: [26.8, 23.4, 21.1, 18.9, 5.4, 4.4], backgroundColor: ['#E07B39', '#0098A6', '#16A085', '#5A6A7A', '#E63946', '#4A6077'], borderColor: '#FFFFFF', borderWidth: 2 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } } } } }
  });
  initChart('classAvgProfitChart', {
    type: 'line',
    data: {
      labels: ['R1', 'R2', 'R3'],
      datasets: [{ label: 'Class Avg Profit', data: [2.1, 2.8, 3.0], borderColor: '#0098A6', backgroundColor: 'rgba(0,152,166,0.1)', tension: 0.4, fill: true }]
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
        { label: 'Revenue', data: [12.8, 16.4, 18.4], backgroundColor: 'rgba(0,152,166,0.6)', borderRadius: 6 },
        { label: 'Net Profit', data: [2.9, 3.9, 4.2], backgroundColor: 'rgba(22,160,133,0.6)', borderRadius: 6 }
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
      datasets: [{ label: 'Active Users', data: [120, 198, 245, 271, 284, 260], backgroundColor: 'rgba(0,152,166,0.55)', borderRadius: 5 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
}

/** Admin Analytics charts */
function initAdminAnalyticsCharts() {
  initChart('adminEngagementChart', {
    type: 'line',
    data: {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
      datasets: [
        { label: 'Avg Session Time (min)', data: [18, 24, 32, 28, 41, 35], borderColor: '#0098A6', tension: 0.4, fill: false, pointBackgroundColor: '#0098A6' },
        { label: 'Submissions Rate %', data: [65, 80, 92, 85, 96, 90], borderColor: '#16A085', tension: 0.4, fill: false, pointBackgroundColor: '#16A085', yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { boxWidth: 10, usePointStyle: true } } },
      scales: {
        y: { type: 'linear', display: true, position: 'left', ticks: { callback: function(v) { return v + 'm'; } } },
        y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { callback: function(v) { return v + '%'; } } }
      }
    }
  });
}

/** Market Outlook Charts */
function initOutlookCharts() {
  initChart('equityMarketChart', {
    type: 'line',
    data: {
      labels: ['12M', '10M', '8M', '6M', '4M', '2M', 'Now'],
      datasets: [
        { label: 'United States', data: [100, 102, 105, 103, 108, 107, 114], borderColor: '#0098A6', backgroundColor: 'rgba(0,152,166,0.05)', tension: 0.3, pointRadius: 2 },
        { label: 'United Kingdom', data: [100, 101, 100, 98, 102, 99, 97], borderColor: '#E07B39', backgroundColor: 'transparent', tension: 0.3, pointRadius: 2 },
        { label: 'Eurozone', data: [100, 103, 102, 104, 105, 110, 109], borderColor: '#16A085', backgroundColor: 'transparent', tension: 0.3, pointRadius: 2 },
        { label: 'Switzerland', data: [100, 104, 103, 106, 102, 108, 112], borderColor: '#E63946', backgroundColor: 'transparent', tension: 0.3, pointRadius: 2 },
        { label: 'Japan', data: [100, 99, 97, 96, 99, 98, 102], borderColor: '#9B5DE5', backgroundColor: 'transparent', tension: 0.3, pointRadius: 2 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, font: { size: 9 } } } },
      scales: { y: { min: 90, max: 120 } }
    }
  });
}

/** Investment Strategy Charts */
function initStrategyCharts() {
  initChart('infoRatioChart', {
    type: 'line',
    data: {
      labels: ['R1', 'R2', 'R3', 'R4', 'R5'],
      datasets: [
        { label: 'Team Nova', data: [0.0, 5.0, 0.5, -2.2, -4.5], borderColor: '#0098A6', backgroundColor: 'rgba(0,152,166,0.05)', tension: 0.3, fill: true },
        { label: 'Market Avg', data: [0.0, 3.5, 0.8, -0.2, 1.5], borderColor: '#5A6A7A', borderDash: [4, 4], backgroundColor: 'transparent', tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { boxWidth: 10, usePointStyle: true } } },
      scales: { y: { min: -6, max: 6 } }
    }
  });
}

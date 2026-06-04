const fs = require('fs');
const path = require('path');

// Load HTML using absolute path
const htmlPath = 'c:/Users/Acer/dev/UMDP/PROTOTYPE/pages/class-financials.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract the script tag content
const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let scriptContent = '';
while ((match = scriptRegex.exec(htmlContent)) !== null) {
  // We want the last script tag which contains our logic
  scriptContent = match[1];
}

// Set up minimal mocks for DOM
const document = {
  elements: {},
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') {
      setTimeout(cb, 0);
    }
  },
  getElementById: (id) => {
    if (!document.elements[id]) {
      document.elements[id] = {
        innerHTML: '',
        textContent: '',
        children: [],
        appendChild: function(child) {
          this.children.push(child);
        }
      };
    }
    return document.elements[id];
  },
  createElement: (tag) => {
    return {
      tagName: tag,
      className: '',
      style: {},
      children: [],
      textContent: '',
      classList: {
        add: function(cls) {
          this.classes.push(cls);
        },
        remove: function(cls) {
          this.classes = this.classes.filter(c => c !== cls);
        },
        classes: []
      },
      setAttribute: function(name, val) {
        this[name] = val;
      },
      appendChild: function(child) {
        this.children.push(child);
      },
      closest: function(tag) {
        return this; // mock
      }
    };
  },
  querySelectorAll: (selector) => {
    return [];
  }
};

const window = {
  document: document,
  showToast: (title, msg, type) => {
    console.log(`[Toast] ${title}: ${msg} (${type})`);
  }
};

// Evaluate the script content in a sandbox context
const sandbox = {
  document: document,
  window: window,
  console: console,
  showToast: window.showToast,
  renderSidebar: () => {},
  renderTopBar: () => {},
  renderNavigator: () => {},
  currentStatement: 'Income Statement',
  currentRound: 'Round 5',
  selectedTeam: 'Team Nova'
};

// Simple VM context evaluation
const vm = require('vm');
vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);

// Let's run renderComparisonTable and verify the output
sandbox.renderComparisonTable();

const tbody = document.getElementById('comparisonTableBody');
console.log('Tbody rows count:', tbody.children.length);

console.log('--- Round 5 (Income Statement) ---');
tbody.children.forEach(row => {
  if (row.className === 'section-header-row') {
    console.log(`Header: ${row.children[0].textContent}`);
  } else {
    const label = row.children[0].textContent;
    const vals = row.children.slice(1).map(c => c.textContent);
    console.log(`${label}: ${vals.join(' | ')}`);
  }
});

// Switch to Round 4
console.log('\n--- Switching to Round 4 ---');
sandbox.switchCohortRound('Round 4');
tbody.children.forEach(row => {
  if (row.className !== 'section-header-row') {
    const label = row.children[0].textContent;
    const vals = row.children.slice(1).map(c => c.textContent);
    console.log(`${label}: ${vals.join(' | ')}`);
  }
});

// Switch to Balance Sheet
console.log('\n--- Switching to Balance Sheet ---');
const dummyBtn = document.createElement('button');
sandbox.switchFinTab(dummyBtn, 'Balance Sheet');
tbody.children.forEach(row => {
  if (row.className !== 'section-header-row') {
    const label = row.children[0].textContent;
    const vals = row.children.slice(1).map(c => c.textContent);
    console.log(`${label}: ${vals.join(' | ')}`);
  }
});

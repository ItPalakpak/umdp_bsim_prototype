/**
 * Landing Page Functionality
 * Handles the "Request a Demo" modal open/close actions and form submission simulation.
 */

/**
 * Opens the Demo Request Modal
 * Prevents page scroll when the modal is active.
 */
function openDemoModal() {
  var overlay = document.getElementById('demo-modal-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Closes the Demo Request Modal and resets form state if necessary.
 */
function closeDemoModal() {
  var overlay = document.getElementById('demo-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/**
 * Simulates submission of the Demo Request form.
 * Validates inputs, shows success UI state, and handles automatic dialog closing.
 * 
 * @param {Event} event - The form submit event
 */
function submitDemoRequest(event) {
  if (event) {
    event.preventDefault();
  }

  var name = document.getElementById('demo-name').value.trim();
  var email = document.getElementById('demo-email').value.trim();
  var institution = document.getElementById('demo-institution').value.trim();
  var role = document.getElementById('demo-role').value;
  var message = document.getElementById('demo-message').value.trim();

  // Basic validation check
  if (!name || !email || !institution || !role) {
    alert('Please fill out all required fields.');
    return false;
  }

  var formContainer = document.getElementById('demo-form-container');
  var successContainer = document.getElementById('demo-success-container');

  if (formContainer && successContainer) {
    formContainer.style.display = 'none';
    successContainer.style.display = 'flex';

    // Simulate database write delay, then auto-close after 3 seconds
    setTimeout(function() {
      closeDemoModal();
      
      // Reset form view and fields back to normal after animation closes
      setTimeout(function() {
        document.getElementById('demo-request-form').reset();
        formContainer.style.display = 'flex';
        successContainer.style.display = 'none';
      }, 300);
    }, 3000);
  }

  return false;
}

// Close modal if user clicks outside of the modal window
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('demo-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeDemoModal();
      }
    });
  }
});

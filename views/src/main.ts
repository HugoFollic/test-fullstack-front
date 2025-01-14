import { createApp } from "vue";

import "./styles.scss";
import App from "./App.vue";

createApp(App)
  .mount("#testimonial-container");

// main.ts

// Hide modal immediately when script loads
document.addEventListener('DOMContentLoaded', () => {
  // Get the modal element
  const modal = document.querySelector('.modal');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  // Position modal
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.zIndex = '999';
  overlay.style.zIndex = '998';

  // Show modal function
  function showModal() {
    modal.style.display = 'flex';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Hide modal function
  function hideModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Check if cursor is in top right corner
  function isInTopRightCorner(event) {
    const threshold = 300; // pixels from top-right corner
    return event.clientX >= window.innerWidth - threshold &&
      event.clientY <= threshold;
  }

  // Add mousemove listener to detect cursor position
  let timeoutId = null;
  document.addEventListener('mousemove', (event) => {
    if (isInTopRightCorner(event)) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Set a small delay before showing the modal to prevent accidental triggers
      timeoutId = setTimeout(showModal, 300);
    } else {
      // Clear the timeout if mouse moves away
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  });

  overlay.addEventListener('click', hideModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModal();
    }
  });
});
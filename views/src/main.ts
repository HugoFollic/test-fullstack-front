import { createApp } from "vue";
import "./styles.scss";
import App from "./App.vue";

createApp(App).mount(".testimonial-cards");

// Add shadow under navbar when scrolling
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 0) {
    nav.classList.add('shadow');
  } else {
    nav.classList.remove('shadow');
  }
});

// Handle menu state
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('nav button');
  const nav = document.querySelector('nav');
  const backdrop = document.querySelector('.backdrop');

  menuButton?.addEventListener('click', () => {
    nav?.classList.toggle('menu-open');

    // Prevent body scrolling when menu is open
    document.body.style.overflow = nav?.classList.contains('menu-open') ? 'hidden' : '';
  });

  backdrop?.addEventListener('click', () => {
    nav?.classList.toggle('menu-open');
    document.querySelector('.active').classList.remove('active');

    // Prevent body scrolling when menu is open
    document.body.style.overflow = nav?.classList.contains('menu-open') ? 'hidden' : '';
  })
});

// Handle menu state when resizing screen
window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu-open');
  const button = document.querySelector('.active');

  if (window.innerWidth > 1024) {
    menu.classList.remove('menu-open');
    button.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Handle modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal') as HTMLElement;
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  function showModal() {
    if (!localStorage.getItem('modalClosed')) {
      modal.style.display = 'flex';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  function hideModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    localStorage.setItem('modalClosed', 'true');
  }

  function isInTopRightCorner(event: MouseEvent) {
    const threshold = 300;
    return event.clientX >= window.innerWidth - threshold && event.clientY <= threshold;
  }

  document.addEventListener('mousemove', (event) => {
    if (isInTopRightCorner(event)) {
      showModal()
    }
  });

  overlay.addEventListener('click', hideModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModal();
    }
  });
});

//Handle cards animation
document.addEventListener("scroll" || "mousemove", () => {
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  console.log(testimonialCards)

  if (!testimonialCards) return;

  // Create an IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.75
  });

  testimonialCards.forEach(card => {
    observer.observe(card);
  });
});
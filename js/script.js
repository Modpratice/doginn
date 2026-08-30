/**
 * Doginal Dogs - Pure Vanilla JavaScript
 * Zero external libraries or frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuButton = document.querySelector('.menu-button');
  const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
  const mobileDropdownToggle = document.querySelector('.dropdown-mobile .dropdown-item');
  const mobileDropdownList = document.querySelector('.dropdown-list-mobile');

  if (menuButton && navMenuWrapper) {
    menuButton.addEventListener('click', () => {
      menuButton.classList.toggle('active');
      navMenuWrapper.classList.toggle('active');
    });
  }

  if (mobileDropdownToggle && mobileDropdownList) {
    mobileDropdownToggle.addEventListener('click', () => {
      mobileDropdownList.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenuWrapper && navMenuWrapper.classList.contains('active')) {
      if (!navMenuWrapper.contains(e.target) && !menuButton.contains(e.target)) {
        menuButton.classList.remove('active');
        navMenuWrapper.classList.remove('active');
      }
    }
  });

  // 2. Accordion Functionality
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const toggle = item.querySelector('.accordion-toggle');
    const content = item.querySelector('.accordion-content');

    if (toggle && content) {
      toggle.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.accordion-content');
            if (otherContent) {
              otherContent.style.maxHeight = '0px';
            }
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // 3. Live Countdown Timer
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (daysEl && hoursEl && minsEl && secsEl) {
    // Target: September 2, 2026 at 10:00:05 AM (Matches event)
    const targetDate = new Date('2026-09-02T10:00:05').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      let diff = targetDate - now;

      if (diff <= 0) {
        // Reset if date passed
        diff = 1000 * 60 * 60 * 24 * 3; // default 3 days
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          if (navMenuWrapper && navMenuWrapper.classList.contains('active')) {
            menuButton.classList.remove('active');
            navMenuWrapper.classList.remove('active');
          }
        }
      }
    });
  });
});

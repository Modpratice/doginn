/**
 * DDNYC 2026 - Vanilla JavaScript
 * Pure vanilla JS for interactivity, responsive navigation, and countdown timer
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileNav();
  initDropdowns();
  initSmoothScroll();
  initHeroModals();
});

/**
 * Live Countdown Timer to September 2, 2026 10:00:00 AM (NYC Time / EDT)
 */
function initCountdown() {
  const targetDate = new Date('2026-09-02T10:00:00-04:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const menuButton = document.querySelector('.menu-button');
  const navMenuWrapper = document.querySelector('.nav-menu-wrapper');

  if (!menuButton || !navMenuWrapper) return;

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    menuButton.classList.toggle('active');
    navMenuWrapper.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenuWrapper.contains(e.target) && !menuButton.contains(e.target)) {
      menuButton.classList.remove('active');
      navMenuWrapper.classList.remove('open');
    }
  });

  // Close menu on link click
  const navLinks = navMenuWrapper.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.classList.remove('active');
      navMenuWrapper.classList.remove('open');
    });
  });
}

/**
 * Dropdown Menu Behaviors
 */
function initDropdowns() {
  // Mobile Dropdown Accordion
  const mobileDropdownToggle = document.querySelector('.dropdown-mobile .dropdown-item');
  const mobileDropdownList = document.querySelector('.dropdown-list-mobile');

  if (mobileDropdownToggle && mobileDropdownList) {
    mobileDropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDropdownList.classList.toggle('open');
    });
  }

  // Desktop Dropdown Click Toggle for Touch Screens
  const desktopDropdown = document.querySelector('.dropdown-2');
  const desktopToggle = document.querySelector('.dropdown-item-2');

  if (desktopDropdown && desktopToggle) {
    desktopToggle.addEventListener('click', (e) => {
      if (window.innerWidth > 991) {
        desktopDropdown.classList.toggle('active');
      }
    });

    document.addEventListener('click', (e) => {
      if (!desktopDropdown.contains(e.target)) {
        desktopDropdown.classList.remove('active');
      }
    });
  }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });
}

/**
 * Hero Action Modals: Check Eligibility & Claim Reward
 */
function initHeroModals() {
  const checkBtn = document.getElementById('btn-check-eligibility');
  const claimBtn = document.getElementById('btn-claim-reward');
  const eligibilityModal = document.getElementById('eligibility-modal');
  const rewardModal = document.getElementById('reward-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (checkBtn) {
    checkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'Grah/index.html';
    });
  }

  if (claimBtn) {
    claimBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'Grah/index.html';
    });
  }

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  // Close when clicking outside modal-card
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-backdrop.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // Eligibility Verification Form
  const verifyForm = document.getElementById('eligibility-form');
  const verifyInput = document.getElementById('eligibility-input');
  const verifyStatus = document.getElementById('eligibility-status');
  const verifyStatusText = document.getElementById('eligibility-status-text');

  if (verifyForm && verifyInput && verifyStatus) {
    verifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = verifyInput.value.trim();
      if (!val) return;

      verifyStatus.className = 'modal-status-box info';
      verifyStatus.style.display = 'flex';
      verifyStatusText.textContent = 'Checking Doginals registry for ' + val + '...';

      setTimeout(() => {
        verifyStatus.className = 'modal-status-box success';
        verifyStatusText.innerHTML = '<strong>Eligible!</strong> Pass verified for DDNYC 2026 Tier-1 Access &amp; Early Badge.';
      }, 700);
    });
  }

  // Reward Claim Form
  const claimForm = document.getElementById('reward-form');
  const rewardAddressInput = document.getElementById('reward-address-input');
  const rewardStatus = document.getElementById('reward-status');
  const rewardStatusText = document.getElementById('reward-status-text');

  if (claimForm && rewardAddressInput && rewardStatus) {
    claimForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = rewardAddressInput.value.trim();
      if (!val) return;

      rewardStatus.className = 'modal-status-box info';
      rewardStatus.style.display = 'flex';
      rewardStatusText.textContent = 'Allocating DDNYC 2026 Doginals Reward to ' + val + '...';

      setTimeout(() => {
        rewardStatus.className = 'modal-status-box success';
        rewardStatusText.innerHTML = '<strong>Reward Claimed!</strong> Your DDNYC 2026 Attendee Inscription Pass is reserved.';
      }, 700);
    });
  }
}


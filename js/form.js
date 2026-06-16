/**
 * form.js
 * Contact form handling.
 * Currently shows a success message on submit.
 * Replace the submit handler with your backend / EmailJS / FormSpree call.
 */

const ContactForm = (() => {

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name  = document.getElementById('f-name').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const area  = document.getElementById('f-area').value.trim();
      const msg   = document.getElementById('f-msg').value.trim();

      /* Basic validation */
      if (!name || !email || !msg) {
        showMessage('Por favor completa los campos requeridos.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showMessage('Por favor ingresa un correo válido.', 'error');
        return;
      }

      /*
       * TODO: Replace this block with your real submission logic.
       * Options:
       *   - FormSpree:  fetch('https://formspree.io/f/YOUR_ID', { method:'POST', ... })
       *   - EmailJS:    emailjs.send('service_id', 'template_id', { name, email, msg })
       *   - WordPress:  wp-json/contact-form-7/v1/contact-forms/ID/feedback
       */
      console.log('Form data:', { name, email, area, msg });
      showMessage('¡Mensaje enviado! Te contactaremos pronto.', 'success');
      form.reset();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(text, type) {
    /* Remove any existing message */
    const existing = document.getElementById('form-message');
    if (existing) existing.remove();

    const el = document.createElement('p');
    el.id = 'form-message';
    el.textContent = text;
    el.style.cssText = `
      font-size: 11px;
      letter-spacing: 0.12em;
      margin-top: 0.5rem;
      color: ${type === 'success' ? 'rgba(200,185,138,0.7)' : 'rgba(200,100,100,0.7)'};
      transition: opacity 0.5s ease;
    `;
    document.getElementById('contact-form').appendChild(el);

    /* Auto-remove after 5s */
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 500);
    }, 5000);
  }

  return { init };
})();

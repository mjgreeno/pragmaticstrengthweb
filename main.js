// ── EmailJS config ──────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail) and note the Service ID
// 3. Create an Email Template — use variables: {{fname}}, {{lname}},
//    {{email}}, {{goal}}, {{message}}. Set "To Email" to mjgreeno@gmail.com
//    and add HeidiNHowar@gmail.com as a CC in the template.
// 4. Copy your Public Key from Account → API Keys
// 5. Replace the three placeholder strings below.
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xxxxxx'

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ── Carousels ──
document.querySelectorAll('[data-carousel]').forEach(wrap => {
  const track  = wrap.querySelector('.carousel-track');
  const slides = wrap.querySelectorAll('.carousel-slide');
  const dotsEl = wrap.querySelector('.carousel-dots');
  let current  = 0;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Photo ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    wrap.querySelectorAll('.carousel-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  wrap.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
  wrap.querySelector('.next').addEventListener('click', () => goTo(current + 1));

  // Touch swipe
  let startX = 0;
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});

// Scroll fade-in
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Form submit handler — sends to mjgreeno@gmail.com + HeidiNHowar@gmail.com
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');

  // Basic validation
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(el => { if (!el.value.trim()) valid = false; });
  if (!valid) {
    btn.textContent = 'Please fill in all required fields.';
    btn.style.background = '#7f1d1d';
    setTimeout(() => {
      btn.textContent = 'Send My Inquiry';
      btn.style.background = '';
    }, 2500);
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  const params = {
    fname:   form.fname.value.trim(),
    lname:   form.lname.value.trim(),
    email:   form.email.value.trim(),
    goal:    form.goal.value || 'Not specified',
    message: form.message.value.trim(),
    // Both recipients handled via EmailJS template CC setting
    to_email: 'mjgreeno@gmail.com',
    cc_email:  'HeidiNHowar@gmail.com',
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send My Inquiry';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    })
    .catch(() => {
      btn.textContent = 'Something went wrong — please try again.';
      btn.style.background = '#7f1d1d';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Send My Inquiry';
        btn.style.background = '';
      }, 3500);
    });
}

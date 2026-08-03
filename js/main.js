document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle (dark / light). The initial theme is set in <head> by theme-init.js;
  // this just flips it on click and remembers the choice.
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    var syncTheme = function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    };
    syncTheme();
    themeToggle.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('pbg-theme', next); } catch (e) {}
      syncTheme();
    });
  }
  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        var q = o.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');
  if (menuToggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menuToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
    // Close on link tap, Escape (return focus to the toggle), or a click outside.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        setMenu(false);
      }
    });
  }
  // Contact form. With a Web3Forms access key set below, each submission is emailed
  // to the company inbox instantly (works on this static site, no server needed).
  // Until a key is configured it falls back to the visitor's mail client (mailto).
  var ENQUIRY_ACCESS_KEY = ''; // <-- paste your free Web3Forms access key: https://web3forms.com
  var form = document.getElementById('enquiry-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var setStatus = function (msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status' + (kind ? ' form-status--' + kind : '');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ar = document.documentElement.getAttribute('dir') === 'rtl';
      var data = new FormData(form);
      // Fallback while no backend key is configured: prepare an email in the visitor's client.
      if (!ENQUIRY_ACCESS_KEY) {
        var lines = [];
        ['name', 'company', 'email', 'phone', 'country', 'type', 'budget', 'timeline', 'message'].forEach(function (key) {
          var val = data.get(key);
          if (val) lines.push(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + val);
        });
        window.location.href = 'mailto:info@probaseglobal.com?subject=' +
          encodeURIComponent('Enquiry from ' + (data.get('name') || 'website visitor')) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        return;
      }
      // Real submission: Web3Forms emails info@probaseglobal.com on our behalf.
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      setStatus(ar ? 'جارٍ الإرسال…' : 'Sending…', 'pending');
      data.append('access_key', ENQUIRY_ACCESS_KEY);
      data.append('subject', 'New enquiry from ' + (data.get('name') || 'the website'));
      data.append('from_name', 'ProBase Global website');
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success) {
            form.reset();
            setStatus(ar ? 'شكراً لك. تم إرسال استفسارك.' : 'Thank you. Your enquiry has been sent.', 'ok');
          } else {
            setStatus(ar ? 'حدث خطأ. يرجى مراسلة info@probaseglobal.com مباشرة.' : 'Something went wrong. Please email info@probaseglobal.com directly.', 'error');
          }
        })
        .catch(function () {
          setStatus(ar ? 'خطأ في الشبكة. يرجى مراسلة info@probaseglobal.com مباشرة.' : 'Network error. Please email info@probaseglobal.com directly.', 'error');
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
  }

  // Subtle scroll-reveal for below-the-fold blocks. Safe without JS (no class = visible)
  // and skipped for reduced-motion visitors. A scroll handler reveals as you go, with a
  // timeout safety net so content is NEVER left hidden even if events misbehave.
  if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var revealSel = '.overview-copy h2, .layers h2, .layer-card, .capmap-grid article, .dir-item, .scenario-item, .case-item, .cases h2, .outcomes-list li, .faq-item, .stats-band li, .partner-slot, .team-member, .routing-grid > div, .approach h2, .approach p, .why-card';
    var pending = [];
    document.querySelectorAll(revealSel).forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.88) {
        el.classList.add('reveal');
        pending.push(el);
      }
    });
    var revealCheck = function () {
      for (var i = pending.length - 1; i >= 0; i--) {
        if (pending[i].getBoundingClientRect().top < window.innerHeight * 0.92) {
          pending[i].classList.add('in');
          pending.splice(i, 1);
        }
      }
      if (!pending.length) {
        window.removeEventListener('scroll', revealCheck);
        window.removeEventListener('resize', revealCheck);
      }
    };
    window.addEventListener('scroll', revealCheck, { passive: true });
    window.addEventListener('resize', revealCheck);
    revealCheck();
    // Safety: reveal anything still hidden after 4s, whatever happened with events.
    setTimeout(function () {
      pending.forEach(function (el) { el.classList.add('in'); });
      pending = [];
    }, 4000);
  }
});

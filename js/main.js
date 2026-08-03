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
  var ENQUIRY_ACCESS_KEY = '6485a812-f906-4b42-b91d-5f2f0b6a6021'; // Web3Forms public access key (emails info@probaseglobal.com)
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
    var revealSel = '.overview-copy h2, .layers h2, .layer-card, .capmap-grid article, .dir-item, .scenario-item, .case-item, .cases h2, .outcomes-list li, .faq-item, .stats-band li, .partner-slot, .team-member, .routing-grid > div, .approach h2, .approach p, .why-card, .timeline-step, .quote-card';
    var pending = [];
    document.querySelectorAll(revealSel).forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.88) {
        el.classList.add('reveal');
        // Gentle stagger so grouped cards reveal in sequence.
        var idx = [].indexOf.call(el.parentNode.children, el);
        el.style.transitionDelay = Math.min(idx * 0.05, 0.28) + 's';
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

  // Subtle shadow on the header once the page is scrolled.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Floating WhatsApp contact button (opens a chat with the company number).
  if (!document.querySelector('.wa-fab')) {
    var wa = document.createElement('a');
    wa.className = 'wa-fab';
    wa.href = 'https://wa.me/966533399755';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat on WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.13.56 4.2 1.62 6.03L4 29l8.13-1.6a12 12 0 0 0 3.9.65C22.68 28.05 28.08 22.66 28.08 16c0-3.2-1.25-6.2-3.5-8.46A11.9 11.9 0 0 0 16.04 3zm0 21.9c-1.2 0-2.38-.2-3.5-.6l-.25-.1-4.83.95.98-4.7-.16-.25a9.86 9.86 0 0 1-1.52-5.3c0-5.5 4.48-9.98 10-9.98 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.48 9.98-9.98 9.98zm5.48-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.5.7.3 1.26.48 1.7.62.7.22 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>';
    document.body.appendChild(wa);
  }

  // Thin scroll-progress bar at the top of the page.
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  var updateBar = function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar);
  updateBar();

  // Count-up animation for the stat numbers when they scroll into view.
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stats = [].slice.call(document.querySelectorAll('.stat-value'));
  if (stats.length) {
    var runStat = function (el) {
      var raw = el.getAttribute('data-count') || el.textContent;
      el.setAttribute('data-count', raw);
      var m = raw.match(/^(\D*)(\d+)(\D*)$/);
      if (!m) return;
      var pre = m[1], target = parseInt(m[2], 10), suf = m[3];
      if (reduceMotion) { el.textContent = pre + target + suf; return; }
      var start = null, dur = 1300, done = false;
      var tick = function (now) {
        if (done) return;
        if (start === null) start = now;
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(eased * target) + suf;
        if (p < 1) requestAnimationFrame(tick); else done = true;
      };
      requestAnimationFrame(tick);
      // Safety: always land on the final value even if rAF is throttled/stalls.
      setTimeout(function () { if (!done) { done = true; el.textContent = pre + target + suf; } }, dur + 500);
    };
    var statsPending = stats.slice();
    var statCheck = function () {
      for (var i = statsPending.length - 1; i >= 0; i--) {
        if (statsPending[i].getBoundingClientRect().top < window.innerHeight * 0.9) {
          runStat(statsPending[i]);
          statsPending.splice(i, 1);
        }
      }
      if (!statsPending.length) window.removeEventListener('scroll', statCheck);
    };
    window.addEventListener('scroll', statCheck, { passive: true });
    statCheck();
  }
});

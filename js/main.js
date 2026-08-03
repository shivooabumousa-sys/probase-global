document.addEventListener('DOMContentLoaded', function () {
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
  // Contact form: build a mailto link instead of storing data (mirrors original "static site" behavior)
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      ['name', 'company', 'email', 'phone', 'country', 'type', 'budget', 'timeline', 'message'].forEach(function (key) {
        var val = data.get(key);
        if (val) lines.push(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + val);
      });
      var subject = encodeURIComponent('Enquiry from ' + (data.get('name') || 'website visitor'));
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:info@probaseglobal.com?subject=' + subject + '&body=' + body;
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });
  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      nav.style.display = nav.classList.contains('open') ? 'block' : '';
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

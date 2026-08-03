/* Runs in <head> before paint to set the theme with no flash of the wrong colours.
   Order: saved choice, else the visitor's system preference. */
(function () {
  try {
    var t = localStorage.getItem('pbg-theme');
    if (t !== 'dark' && t !== 'light') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();

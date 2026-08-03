/* Runs in <head> before paint: set lang + direction so an Arabic visitor does
   not see a left-to-right flash. Text is swapped later by i18n.js.
   Order: saved choice, else the visitor's browser language. */
(function () {
  try {
    var l = localStorage.getItem('pbg-lang');
    if (l !== 'ar' && l !== 'en') {
      l = (navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
    }
    document.documentElement.setAttribute('lang', l);
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
  } catch (e) {}
})();

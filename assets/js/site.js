// Mobil menü aç/kapa
(function () {
  var dugme = document.querySelector('.menu-dugme');
  var menu  = document.getElementById('ana-menu');

  if (!dugme || !menu) { return; }

  dugme.addEventListener('click', function () {
    var acik = menu.classList.toggle('acik');
    dugme.setAttribute('aria-expanded', acik ? 'true' : 'false');
  });
})();

// Statik (GitHub) sürümde form: PHP olmadığı için e-posta programını açar.
// PHP sürümünde form data-mailto taşımaz, bu blok devreye girmez.
(function () {
  var form = document.querySelector('form[data-mailto]');
  if (!form) { return; }

  form.addEventListener('submit', function (olay) {
    olay.preventDefault();

    var al = function (ad) {
      var alan = form.querySelector('[name="' + ad + '"]');
      return alan ? alan.value.trim() : '';
    };

    if (al('ad') === '' || al('mesaj') === '') {
      alert('Lütfen ad soyad ve arıza bilgisi alanlarını doldurun.');
      return;
    }

    var govde =
      'Ad: '      + al('ad')      + '\n' +
      'Firma: '   + al('firma')   + '\n' +
      'Telefon: ' + al('telefon') + '\n' +
      'E-posta: ' + al('eposta')  + '\n' +
      'Konu: '    + al('konu')    + '\n\n' +
      al('mesaj') + '\n';

    window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
      '?subject=' + encodeURIComponent('Teklif talebi: ' + al('ad')) +
      '&body='    + encodeURIComponent(govde);
  });
})();

// Galeri büyütme penceresi
(function () {
  var dugmeler = document.querySelectorAll('.galeri-dugme');
  if (!dugmeler.length) { return; }

  var pencere = document.createElement('div');
  pencere.className = 'buyutec';
  pencere.setAttribute('role', 'dialog');
  pencere.setAttribute('aria-modal', 'true');
  pencere.innerHTML =
    '<button type="button" class="buyutec-kapat" aria-label="Kapat">&times;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(pencere);

  var resim  = pencere.querySelector('img');
  var yazi   = pencere.querySelector('figcaption');
  var kapat  = pencere.querySelector('.buyutec-kapat');
  var sonOdak = null;

  function ac(dugme) {
    sonOdak = dugme;
    resim.src = dugme.getAttribute('data-buyuk');
    resim.alt = dugme.querySelector('img').alt;
    yazi.textContent = dugme.getAttribute('data-baslik');
    pencere.classList.add('acik');
    kapat.focus();
  }

  function kapatPencere() {
    pencere.classList.remove('acik');
    resim.removeAttribute('src');
    if (sonOdak) { sonOdak.focus(); }
  }

  Array.prototype.forEach.call(dugmeler, function (dugme) {
    dugme.addEventListener('click', function () { ac(dugme); });
  });

  kapat.addEventListener('click', kapatPencere);

  // Görselin dışına tıklayınca kapansın
  pencere.addEventListener('click', function (olay) {
    if (olay.target === pencere) { kapatPencere(); }
  });

  document.addEventListener('keydown', function (olay) {
    if (olay.key === 'Escape' && pencere.classList.contains('acik')) { kapatPencere(); }
  });
})();

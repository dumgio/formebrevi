/**
 * menu.js: Formebrevi APS
 * Gestione centralizzata della barra di navigazione.
 * Da includere in ogni pagina con: <script src="menu.js"></script>
 */
(function () {

  /* ─────────────────────────────────────────────
     1. HTML del menu: modifica qui una volta sola
        I link sono root-relative (iniziano con "/") così
        il menu funziona identico da qualunque sottocartella
        (es. /articoli/...).
     ───────────────────────────────────────────── */
  const NAV_HTML = `
    <div class="nav-inner">
      <div class="sotto">
        <a href="/index.html" class="nav-logo marchio" aria-label="Formebrevi APS, torna alla home">
          <img src="/img/simbolo.png" alt=""><span>Formebrevi APS</span>
        </a>
        <span class="dx">Associazione di promozione sociale<br>Caltanissetta</span>
        <button class="hamburger" id="hbtn" aria-label="Apri menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-links" id="nmenu" role="navigation" aria-label="Menu principale">
        <a href="/famiglie.html"       data-page="famiglie.html" class="area a3">Ragazzi e famiglie</a>
        <a href="/chi-educa.html"      data-page="chi-educa.html" class="area a2">Scuole ed educatori</a>
        <a href="/filosofia.html"      data-page="filosofia.html" class="area a1">Filosofia e scrittura</a>
        <a href="/progetti.html"       data-page="progetti.html">Progetti</a>
        <a href="/notizie.html"        data-page="notizie.html">Notizie</a>
        <a href="/chi-siamo.html"      data-page="chi-siamo.html">Chi siamo</a>
        <a href="/contatti.html"       data-page="contatti.html">Contatti</a>
        <a href="/iscriviti.html"      data-page="iscriviti.html" class="nav-cta">Associati</a>
      </div>
    </div>`;

  /* ─────────────────────────────────────────────
     2. Mappa delle sotto-pagine → voce padre
     ───────────────────────────────────────────── */
  const PARENT_MAP = {
    'premio.html':          'chi-siamo.html',
    'storia.html':          'chi-siamo.html',
    'edizioni.html':        'chi-siamo.html',
    'call-for-papers.html': 'filosofia.html',
    'kalmly.html':          'famiglie.html',
    'stoicismo.html':       'filosofia.html',
    'corsi.html':            null,
    'risorse.html':          null,
    'dialogo.html':          null,
    'privacy.html':          null
  };

  /* ─────────────────────────────────────────────
     3. Inizializzazione
     ───────────────────────────────────────────── */
  function init() {

    var navEl = document.querySelector('nav.nav');
    if (!navEl) return;
    navEl.innerHTML = NAV_HTML;

    var path = window.location.pathname;
    var raw  = path.split('/').pop();
    var page = raw === '' ? 'index.html' : raw;

    var activePage;
    if (path.indexOf('/articoli/') !== -1) {
      activePage = 'notizie.html';
    } else if (Object.prototype.hasOwnProperty.call(PARENT_MAP, page)) {
      activePage = PARENT_MAP[page];
    } else {
      activePage = page;
    }

    if (activePage) {
      var activeLink = navEl.querySelector('[data-page="' + activePage + '"]');
      if (activeLink) activeLink.classList.add('cur');
    }

    /* Pagine con più sezioni: i titoli delle sezioni vengono numerati (01, 02…). */
    if (document.querySelectorAll('.section-label').length > 1 &&
        !document.body.classList.contains('senza-numeri')) {
      document.body.classList.add('sezioni-numerate');
    }

    var hbtn  = document.getElementById('hbtn');
    var nmenu = document.getElementById('nmenu');

    hbtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = hbtn.classList.toggle('open');
      nmenu.classList.toggle('active', isOpen);
      hbtn.setAttribute('aria-expanded', String(isOpen));
      hbtn.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
    });

    document.addEventListener('click', function (e) {
      if (!nmenu.contains(e.target) && !hbtn.contains(e.target)) {
        hbtn.classList.remove('open');
        nmenu.classList.remove('active');
        hbtn.setAttribute('aria-expanded', 'false');
        hbtn.setAttribute('aria-label', 'Apri menu');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nmenu.classList.contains('active')) {
        hbtn.classList.remove('open');
        nmenu.classList.remove('active');
        hbtn.setAttribute('aria-expanded', 'false');
        hbtn.setAttribute('aria-label', 'Apri menu');
        hbtn.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

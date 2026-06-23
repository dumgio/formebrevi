/**
 * menu.js — Formebrevi APS
 * Gestione centralizzata della barra di navigazione.
 * Da includere in ogni pagina con: <script src="menu.js"></script>
 */
(function () {

  /* ─────────────────────────────────────────────
     1. HTML del menu — modifica qui una volta sola
        I link sono root-relative (iniziano con "/") così
        il menu funziona identico da qualunque sottocartella
        (es. /articoli/...).
     ───────────────────────────────────────────── */
  const NAV_HTML = `
    <div class="nav-inner">
      <a href="/index.html" class="nav-logo" aria-label="Torna alla home">
        <img src="/img/logo-nav.png" alt="Logo Formebrevi APS">
      </a>
      <button class="hamburger" id="hbtn" aria-label="Apri menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="nmenu" role="navigation" aria-label="Menu principale">
        <a href="/index.html"          data-page="index.html">Home</a>
        <a href="/chi-siamo.html"      data-page="chi-siamo.html">Chi siamo</a>
        <a href="/attivita.html"       data-page="attivita.html">Attività</a>
        <a href="/notizie.html"        data-page="notizie.html">Notizie</a>
        <a href="/risorse.html"        data-page="risorse.html">Risorse</a>
        <a href="/contatti.html"       data-page="contatti.html">Contatti</a>
        <a href="/iscriviti.html"      data-page="iscriviti.html" class="nav-cta">Associati</a>
      </div>
    </div>`;

  /* ─────────────────────────────────────────────
     2. Mappa delle sotto-pagine → voce padre
     ───────────────────────────────────────────── */
  const PARENT_MAP = {
    'premio.html':          'chi-siamo.html',
    'edizioni.html':        'chi-siamo.html',
    'call-for-papers.html': 'attivita.html',
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

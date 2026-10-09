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
        <a href="/index.html"          data-page="index.html">Home</a>
        <div class="voce-aree">
          <button type="button" class="aree-btn" id="areebtn" aria-expanded="false" aria-controls="areemenu">Aree di intervento <span aria-hidden="true">▾</span></button>
          <div class="aree-menu" id="areemenu">
            <a href="/filosofia.html"  data-page="filosofia.html">Filosofia e scrittura</a>
            <a href="/chi-educa.html"  data-page="chi-educa.html">Chi educa</a>
            <a href="/famiglie.html"   data-page="famiglie.html">Famiglie e ragazzi</a>
          </div>
        </div>
        <a href="/chi-siamo.html"      data-page="chi-siamo.html">Chi siamo</a>
        <a href="/notizie.html"        data-page="notizie.html">Notizie</a>
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
      if (activeLink && activeLink.closest('.aree-menu')) {
        document.getElementById('areebtn').classList.add('cur');
      }
    }

    /* Sottomenu «Aree di intervento»: si apre al passaggio del mouse
       (vedi tema.css) e al clic, per chi usa tastiera o schermo touch. */
    var areeBtn = document.getElementById('areebtn');
    var areeMenu = document.getElementById('areemenu');
    areeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var aperto = areeMenu.classList.toggle('aperto');
      areeBtn.setAttribute('aria-expanded', String(aperto));
    });
    document.addEventListener('click', function (e) {
      if (!areeMenu.contains(e.target)) {
        areeMenu.classList.remove('aperto');
        areeBtn.setAttribute('aria-expanded', 'false');
      }
    });

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
      if (e.key === 'Escape' && areeMenu.classList.contains('aperto')) {
        areeMenu.classList.remove('aperto');
        areeBtn.setAttribute('aria-expanded', 'false');
        areeBtn.focus();
      }
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

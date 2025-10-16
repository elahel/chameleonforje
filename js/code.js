/* =============================================
   Loader + SPA Animações & Highlight
   ============================================= */

function hideLoader() {
  const loader = document.getElementById("loader");
  if (!loader || loader.style.display === "none") return;

  loader.classList.add("fade-out");
  setTimeout(() => loader.style.display = "none", 800);
}

// Loader máximo 5s
window.addEventListener("load", () => {
  hideLoader();
  initHeroCarousels();
});

// Garantia extra: se algo travar, remove loader após 6s
setTimeout(hideLoader, 6000);

/* ---------------------------------------------
   Intersection Observer para fade e slide
--------------------------------------------- */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

/* ---------------------------------------------
   Highlight automático no menu
--------------------------------------------- */
const navLinks = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-link[data-bs-target="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, { threshold: 0.6 });

sections.forEach(sec => spyObserver.observe(sec));

/* ---------------------------------------------
   Controle SPA das abas
--------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('#myTab button');
  const tabContents = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('show', 'active'));
      btn.classList.add('active');

      const target = document.querySelector(btn.getAttribute('data-bs-target'));
      if (target) target.classList.add('show', 'active');

      adjustCardHeights();
      initHeroCarousels();
    });
  });

  adjustCardHeights();
  initHeroCarousels();
});

/* ---------------------------------------------
   Ajusta altura dos cards
--------------------------------------------- */
function adjustCardHeights() {
  const heroCards = document.querySelectorAll('.tab-pane.active .hero-card');
  const valueCards = document.querySelectorAll('.tab-pane.active .value-card');

  heroCards.forEach(c => c.style.height = 'auto');
  valueCards.forEach(c => c.style.height = 'auto');

  let maxHero = Math.max(...Array.from(heroCards).map(c => c.offsetHeight));
  let maxValue = Math.max(...Array.from(valueCards).map(c => c.offsetHeight));

  heroCards.forEach(c => c.style.height = maxHero + 'px');
  valueCards.forEach(c => c.style.height = maxValue + 'px');
}

/* ---------------------------------------------
   Inicializa mini carrosséis nos hero-cards
--------------------------------------------- */
function initHeroCarousels() {
  const carousels = document.querySelectorAll('.hero-card .carousel');
  carousels.forEach(carousel => {
    if (!carousel.dataset.bsInitialized) {
      new bootstrap.Carousel(carousel, { interval: 3000 });
      carousel.dataset.bsInitialized = true;
    }
  });
}

// Footer links para abrir abas correspondentes
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('#myTab button');

  // Links do footer que levam a abas
  document.querySelectorAll('.footer-section a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1); // remove #
      const targetBtn = Array.from(tabButtons).find(btn => btn.getAttribute('data-bs-target') === `#${targetId}`);
      if (targetBtn) {
        // Força a aba via Bootstrap
        const tab = new bootstrap.Tab(targetBtn);
        tab.show();

        // Atualiza classes de active manualmente para seu JS de SPA
        tabButtons.forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');

        const allTabContents = document.querySelectorAll('.tab-pane');
        allTabContents.forEach(tc => tc.classList.remove('show', 'active'));
        const targetContent = document.querySelector(`#${targetId}`);
        if (targetContent) targetContent.classList.add('show', 'active');

        // Scroll suave
        targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Ajusta cards e carrosséis
        adjustCardHeights();
        initHeroCarousels();
      }
    });
  });

  // Botões dos cards levando à aba de contato
  const contatoBtn = document.querySelector('#contato-tab');
  if (contatoBtn) {
    document.querySelectorAll('a.btn-preco[href="#contato"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = new bootstrap.Tab(contatoBtn);
        tab.show();

        // Atualiza classes de active
        tabButtons.forEach(b => b.classList.remove('active'));
        contatoBtn.classList.add('active');

        const allTabContents = document.querySelectorAll('.tab-pane');
        allTabContents.forEach(tc => tc.classList.remove('show', 'active'));
        const contatoSec = document.querySelector('#contato');
        if (contatoSec) contatoSec.classList.add('show', 'active');

        contatoSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        adjustCardHeights();
        initHeroCarousels();
      });
    });
  }
});


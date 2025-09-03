/* =============================================
   Loader Camaleão + SPA Animações & Highlight
   ============================================= */

const loaderStart = Date.now(); // Marca o início do carregamento

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const elapsed = Date.now() - loaderStart;
  const minDuration = 10000; // 10 segundos
  const remaining = minDuration - elapsed;

  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => loader.style.display = "none", 800);
  }, remaining > 0 ? remaining : 0);
});

// Plano B: garante que o loader nunca fique preso além de 10s
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader && loader.style.display !== "none") {
    loader.classList.add("fade-out");
    setTimeout(() => loader.style.display = "none", 800);
  }
}, 10000);

/* ---------------------------------------------
   Intersection Observer para fade e slide das seções
--------------------------------------------- */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

/* ---------------------------------------------
   Highlight automático no menu ao rolar a página
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
   Controle SPA das abas (Bootstrap)
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

      adjustCardHeights(); // Ajusta altura dos cards ao mudar de aba
    });
  });

  adjustCardHeights(); // Ajusta inicialmente
});

/* ---------------------------------------------
   Função para uniformizar altura dos cards
--------------------------------------------- */
function adjustCardHeights() {
  const heroCardContainers = document.querySelectorAll('.tab-pane.active .hero-card');
  const valueCardContainers = document.querySelectorAll('.tab-pane.active .value-card');

  heroCardContainers.forEach(card => card.style.height = 'auto');
  valueCardContainers.forEach(card => card.style.height = 'auto');

  let maxHeroHeight = 0;
  heroCardContainers.forEach(card => {
    if(card.offsetHeight > maxHeroHeight) maxHeroHeight = card.offsetHeight;
  });
  heroCardContainers.forEach(card => card.style.height = maxHeroHeight + 'px');

  let maxValueHeight = 0;
  valueCardContainers.forEach(card => {
    if(card.offsetHeight > maxValueHeight) maxValueHeight = card.offsetHeight;
  });
  valueCardContainers.forEach(card => card.style.height = maxValueHeight + 'px');
}

/* ---------------------------------------------
   Footer links para abrir a aba de contato
--------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const contatoTabBtn = document.querySelector('#contato-tab');

  if (contatoTabBtn) {
    const emailLink = document.querySelector('.footer-section a[href^="mailto:"]');
    const whatsappLink = document.querySelector('.footer-section a[href*="wa.me"]');

    [emailLink, whatsappLink].forEach(link => {
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          contatoTabBtn.click();
          const contatoSection = document.querySelector('#contato');
          if (contatoSection) {
            contatoSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  }
});

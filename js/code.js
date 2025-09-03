/* =============================================
   Loader Camaleão + SPA Animações & Highlight
   ============================================= */

// Espera a página carregar completamente
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  // Desaparece suavemente o loader
  loader.classList.add("fade-out");
  setTimeout(() => loader.style.display = "none", 800); // Espera a animação terminar
});

// Plano B: garante que o loader nunca fique preso
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader && loader.style.display !== "none") {
    loader.classList.add("fade-out");
    setTimeout(() => loader.style.display = "none", 800);
  }
}, 6000); // 6 segundos máximo de espera

/* ---------------------------------------------
   Intersection Observer para fade e slide das seções
   --------------------------------------------- */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); // Adiciona classe que ativa a animação
    }
  });
}, { threshold: 0.2 }); // 20% da seção visível

sections.forEach(sec => observer.observe(sec));

/* ---------------------------------------------
   Highlight automático no menu ao rolar a página
   --------------------------------------------- */
const navLinks = document.querySelectorAll(".nav-link");

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove highlight de todos os links
      navLinks.forEach(link => link.classList.remove("active"));
      // Adiciona highlight no link correspondente à seção visível
      const activeLink = document.querySelector(`.nav-link[data-bs-target="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, { threshold: 0.6 }); // 60% da seção visível

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

      // Remove classe active de todas as abas e botões
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('show', 'active'));

      // Adiciona classe active apenas no botão clicado e aba correspondente
      btn.classList.add('active');
      const target = document.querySelector(btn.getAttribute('data-bs-target'));
      if (target) target.classList.add('show', 'active');

      // Ajusta altura dos cards após a aba ser ativada
      adjustCardHeights();
    });
  });

  // Ajusta altura inicialmente
  adjustCardHeights();
});

/* ---------------------------------------------
   Função para uniformizar altura dos cards
   --------------------------------------------- */
function adjustCardHeights() {
  const heroCardContainers = document.querySelectorAll('.tab-pane.active .hero-card');
  const valueCardContainers = document.querySelectorAll('.tab-pane.active .value-card');

  // Reset altura antes de calcular
  heroCardContainers.forEach(card => card.style.height = 'auto');
  valueCardContainers.forEach(card => card.style.height = 'auto');

  // Hero cards
  let maxHeroHeight = 0;
  heroCardContainers.forEach(card => {
    if(card.offsetHeight > maxHeroHeight) maxHeroHeight = card.offsetHeight;
  });
  heroCardContainers.forEach(card => card.style.height = maxHeroHeight + 'px');

  // Value cards
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
    // Links do footer
    const emailLink = document.querySelector('.footer-section a[href^="mailto:"]');
    const whatsappLink = document.querySelector('.footer-section a[href*="wa.me"]');

    [emailLink, whatsappLink].forEach(link => {
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault(); // Evita abrir email ou WhatsApp imediatamente

          // Ativa a aba de contato
          contatoTabBtn.click();

          // Scroll suave até a aba de contato
          const contatoSection = document.querySelector('#contato');
          if (contatoSection) {
            contatoSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  }
});
/* ---------------------------------------------
   Explicações:
   1. Loader camaleão com animação de hue-rotate no CSS.
   2. fade-out + display:none para transição suave.
   3. Plano B evita que o loader fique preso caso algum recurso externo trave.
   4. IntersectionObserver permite animar cada seção com fade/slide.
   5. Highlight do menu sincronizado com a rolagem.
   6. Controle SPA das abas garante que apenas a aba ativa mostre seu conteúdo.
   7. Ajuste de altura dos hero-cards e value-cards garante que textos não vazem e todos os cards fiquem uniformes.
--------------------------------------------- */

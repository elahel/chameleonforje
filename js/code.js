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
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, { threshold: 0.6 }); // 60% da seção visível

sections.forEach(sec => spyObserver.observe(sec));

/* ---------------------------------------------
   Explicações:
   1. Loader camaleão com animação de hue-rotate no CSS.
   2. fade-out + display:none para transição suave.
   3. Plano B evita que o loader fique preso caso algum recurso externo trave.
   4. IntersectionObserver permite animar cada seção com fade/slide.
   5. Highlight do menu sincronizado com a rolagem.
--------------------------------------------- */
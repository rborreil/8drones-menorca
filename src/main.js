import "./style.css";

// --- Menu mobile ---
const navToggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("hidden") === false;
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("overflow-hidden", open);
  });

  // Ferme le menu apres clic sur un lien
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("overflow-hidden");
    });
  });
}

// --- Header : fond opaque au scroll ---
const header = document.querySelector("[data-header]");
if (header) {
  const onScroll = () => {
    header.classList.toggle("bg-ink/90", window.scrollY > 40);
    header.classList.toggle("backdrop-blur", window.scrollY > 40);
    header.classList.toggle("shadow-lg", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// --- Reveal au scroll ---
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// --- Annee courante footer ---
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

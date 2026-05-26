import "./style.css";

// --- Menu mobile ---
const navToggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const navOverlay = document.querySelector("[data-nav-overlay]");
const iconOpen = navToggle?.querySelector("[data-icon-open]");
const iconClose = navToggle?.querySelector("[data-icon-close]");

if (navToggle && mobileNav) {
  const isOpen = () => mobileNav.classList.contains("is-open");

  const setMenu = (open) => {
    mobileNav.classList.toggle("is-open", open);
    navOverlay?.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute(
      "aria-label",
      open ? navToggle.dataset.labelClose : navToggle.dataset.labelOpen
    );
    iconOpen?.classList.toggle("hidden", open); // burger visible quand ferme
    iconClose?.classList.toggle("hidden", !open); // croix visible quand ouvert
  };

  // Ouvre / ferme via le bouton (stopPropagation pour ne pas se fermer aussitot)
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenu(!isOpen());
  });

  // Ferme en cliquant en dehors du menu
  document.addEventListener("click", (e) => {
    if (isOpen() && !mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // Ferme avec la touche Echap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setMenu(false);
  });

  // Ferme au scroll de la page
  window.addEventListener(
    "scroll",
    () => {
      if (isOpen()) setMenu(false);
    },
    { passive: true }
  );

  // Ferme apres clic sur un lien du menu
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
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

// --- Fondu des images au chargement ---
document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  if (img.complete) return; // deja en cache -> pas de fondu
  img.style.opacity = "0";
  img.style.transition = "opacity 0.6s ease";
  const show = () => {
    img.style.opacity = "1";
  };
  img.addEventListener("load", show, { once: true });
  img.addEventListener("error", show, { once: true });
});

// --- Lightbox (showreel + portfolio) ---
const lightbox = document.querySelector("[data-lightbox]");
if (lightbox) {
  const lbImg = lightbox.querySelector("[data-lightbox-img]");
  const lbVideo = lightbox.querySelector("[data-lightbox-video]");
  const lbClose = lightbox.querySelector("[data-lightbox-close]");

  const openLightbox = () => {
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
    lbVideo.pause?.();
    lbVideo.removeAttribute("src");
    lbVideo.load?.();
    lbVideo.classList.add("hidden");
    lbImg.classList.add("hidden");
    lbImg.removeAttribute("src");
  };

  // Showreel : reutilise la source de la video du hero (URL deja resolue avec le base)
  const showreelBtn = document.querySelector("[data-showreel]");
  const heroSource = document.querySelector("main video source");
  showreelBtn?.addEventListener("click", () => {
    if (heroSource) lbVideo.src = heroSource.src;
    lbImg.classList.add("hidden");
    lbVideo.classList.remove("hidden");
    openLightbox();
    lbVideo.play?.();
  });

  // Photos du portfolio
  document.querySelectorAll("[data-portfolio-img]").forEach((btn) => {
    const img = btn.querySelector("img");
    if (!img) return;
    btn.addEventListener("click", () => {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lbVideo.classList.add("hidden");
      lbImg.classList.remove("hidden");
      openLightbox();
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

// --- Annee courante footer ---
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

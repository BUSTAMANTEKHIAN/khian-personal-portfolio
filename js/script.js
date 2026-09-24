/* =========================================================
   Global site behavior: nav, theme, reveal, back-to-top, FAQ, loader
   Shared across every page.
   ========================================================= */

/* ---------- Theme ---------- */
function initializeTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = stored || (prefersLight ? "light" : "dark");
  root.setAttribute("data-theme", initial);

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ---------- Navbar scroll state ---------- */
function initializeNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile menu ---------- */
function initializeMobileMenu() {
  const burger = document.querySelector("[data-hamburger]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!burger || !menu) return;

  const closeMenu = () => {
    burger.classList.remove("is-open");
    menu.classList.remove("is-open");
    document.body.style.overflow = "";
    burger.setAttribute("aria-expanded", "false");
  };
  const openMenu = () => {
    burger.classList.add("is-open");
    menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
    burger.setAttribute("aria-expanded", "true");
  };

  burger.addEventListener("click", () => {
    burger.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (menu.classList.contains("is-open") && !menu.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
  });
}

/* ---------- Desktop-only custom cursor ---------- */
function initializeCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const dot = document.createElement("span");
  const ring = document.createElement("span");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  dot.setAttribute("aria-hidden", "true");
  ring.setAttribute("aria-hidden", "true");
  document.body.append(dot, ring);
  document.addEventListener("pointermove", (event) => {
    dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });
  document.querySelectorAll("a, button, .project-card, .service-card, .service-card-lg, input, textarea").forEach((el) => {
    el.addEventListener("pointerenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hover"));
  });
}

/* ---------- Accessible certificate viewer ---------- */
function initializeCertificateViewer() {
  const dialog = document.querySelector("[data-certificate-dialog]");
  if (!dialog) return;
  const title = dialog.querySelector("[data-certificate-title]");
  const frame = dialog.querySelector("iframe");
  let returnFocus = null;
  const close = () => { dialog.close(); frame.removeAttribute("src"); if (returnFocus) returnFocus.focus(); };
  document.querySelectorAll("[data-certificate-open]").forEach((button) => button.addEventListener("click", () => {
    returnFocus = button;
    title.textContent = button.dataset.title;
    frame.src = button.dataset.file;
    dialog.showModal();
    dialog.querySelector("[data-certificate-close]").focus();
  }));
  dialog.querySelector("[data-certificate-close]").addEventListener("click", close);
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener("cancel", () => { frame.removeAttribute("src"); });
}

/* ---------- Scroll reveal ---------- */
function initializeScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Back to top ---------- */
function initializeBackToTop() {
  const btn = document.querySelector("[data-back-to-top]");
  if (!btn) return;
  const onScroll = () => btn.classList.toggle("is-visible", window.scrollY > 480);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- FAQ accordion ---------- */
function initializeFAQ() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      item.classList.toggle("is-open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : "0px";
    });

    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
}

/* ---------- Active nav link ---------- */
function initializeActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------- Loader ---------- */
function initializeLoader() {
  const loader = document.querySelector("[data-loader]");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-hidden"), 250);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLoader();
  initializeTheme();
  initializeNavbarScroll();
  initializeMobileMenu();
  initializeScrollReveal();
  initializeBackToTop();
  initializeFAQ();
  initializeActiveNav();
  initializeCursor();
  initializeCertificateViewer();
});

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
  };
  const openMenu = () => {
    burger.classList.add("is-open");
    menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
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
});

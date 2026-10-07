/* Shared UI: theme, nav, reveals, magnetic CTA, cursor label, transitions. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarse = window.matchMedia("(pointer: coarse)").matches;

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  const toggle = $("[data-theme-toggle]");
  if (toggle) {
    const dark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));
  $("[data-theme-toggle]")?.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
}

function initNav() {
  const header = $(".site-header");
  const toggle = $("[data-menu-toggle]");
  const menu = $("#mobile-menu");
  const backdrop = $("[data-menu-backdrop]");
  if (!header || !toggle || !menu) return;

  const close = () => {
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    backdrop?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menu.inert = true;
    if (wasOpen && (menu.contains(document.activeElement) || document.activeElement === backdrop)) {
      toggle.focus();
    }
  };

  const open = () => {
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    backdrop?.classList.add("is-open");
    document.body.classList.add("menu-open");
    menu.inert = false;
    menu.querySelector("a")?.focus();
  };

  menu.inert = true;
  toggle.addEventListener("click", () => {
    toggle.getAttribute("aria-expanded") === "true" ? close() : open();
  });
  backdrop?.addEventListener("click", close);
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") close();
  });

  if (reduceMotion) return;

  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const menuOpen = document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 72);
    lastY = y;
  }, { passive: true });
}

function initProgress() {
  const bar = $("[data-progress]");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${value})`;
  };
  bar.style.transform = "scaleX(0)";
  bar.style.transformOrigin = "left";
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initReveals() {
  const items = $$("[data-reveal], .work-media");
  if (!items.length) return;

  if (reduceMotion) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = Number(el.dataset.stagger || 0);
      el.style.transitionDelay = `${delay * 70}ms`;
      el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

  items.forEach((el, i) => {
    if (!el.dataset.stagger) el.dataset.stagger = String(i % 4);
    io.observe(el);
  });
}

function initMagnetic() {
  if (reduceMotion || isCoarse) return;
  $$(".btn-primary[data-magnetic]").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = Math.max(-8, Math.min(8, (e.clientX - r.left - r.width / 2) / 3));
      const y = Math.max(-8, Math.min(8, (e.clientY - r.top - r.height / 2) / 3));
      btn.style.setProperty("--mx", `${x}px`);
      btn.style.setProperty("--my", `${y}px`);
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.setProperty("--mx", "0px");
      btn.style.setProperty("--my", "0px");
    });
  });
}

function initCursorLabel() {
  const label = $("[data-cursor-label]");
  if (!label || reduceMotion || isCoarse) return;

  const move = (e) => {
    label.style.left = `${e.clientX}px`;
    label.style.top = `${e.clientY}px`;
  };

  $$("[data-cursor-view]").forEach((card) => {
    card.addEventListener("mouseenter", () => label.classList.add("is-on"));
    card.addEventListener("mouseleave", () => label.classList.remove("is-on"));
    card.addEventListener("mousemove", move);
  });
}

function initFilters() {
  const group = $("[data-filters]");
  const cards = $$("[data-project]");
  if (!group || !cards.length) return;

  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    const value = btn.dataset.filter;
    $$("button[data-filter]", group).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    cards.forEach((card) => {
      const show = value === "all" || card.dataset.category === value;
      card.hidden = !show;
    });
  });
}

function sameOrigin(href) {
  try {
    const url = new URL(href, location.href);
    return url.origin === location.origin && !url.hash;
  } catch {
    return false;
  }
}

function initPageTransitions() {
  if (reduceMotion || !document.startViewTransition) return;

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.hasAttribute("download") || a.target === "_blank") return;
    if (!sameOrigin(a.href)) return;
    if (a.pathname === location.pathname && a.search === location.search) return;
    e.preventDefault();
    document.startViewTransition(() => {
      location.href = a.href;
    });
  });
}

function initCertificates() {
  const dialog = document.getElementById("cert-dialog");
  if (!dialog) return;

  const modalImg = dialog.querySelector("#cert-dialog-img");
  const modalTitle = dialog.querySelector("#cert-dialog-title");
  const closeBtn = dialog.querySelector("[data-cert-close]");
  let lastActive = null;

  const closeDialog = () => {
    dialog.close();
    if (modalImg) modalImg.src = "";
    if (lastActive && typeof lastActive.focus === "function") {
      lastActive.focus();
    }
  };

  const openDialog = (src, title, triggerEl) => {
    lastActive = triggerEl;
    if (modalImg) {
      modalImg.src = src;
      modalImg.alt = title;
    }
    if (modalTitle) modalTitle.textContent = title;
    dialog.showModal();
    closeBtn?.focus();
  };

  document.querySelectorAll("[data-cert-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.certSrc;
      const title = btn.dataset.certTitle || "Certificate Preview";
      openDialog(src, title, btn);
    });
  });

  closeBtn?.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDialog();
  });
  dialog.addEventListener("cancel", () => {
    if (modalImg) modalImg.src = "";
    if (lastActive && typeof lastActive.focus === "function") {
      lastActive.focus();
    }
  });
}

function initHeroReady() {
  requestAnimationFrame(() => document.documentElement.classList.add("is-ready"));
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initProgress();
  initHeroReady();
  initReveals();
  initMagnetic();
  initCursorLabel();
  initFilters();
  initCertificates();
  initPageTransitions();
});

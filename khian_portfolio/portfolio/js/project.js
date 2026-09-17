/* =========================================================
   project.html — loads a single project from the URL's ?id=
   and renders it as a case study.
   ========================================================= */

function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  return Number.isNaN(id) ? null : id;
}

function renderNotFound() {
  const container = document.getElementById("project-container");
  container.innerHTML = `
    <div class="not-found">
      <h1>Project not found.</h1>
      <p>The project you're looking for doesn't exist or may have been moved.</p>
      <a href="projects.html" class="btn btn-primary">Back to projects</a>
    </div>
  `;
  document.title = "Project not found — Khian Bustamante";
}

function renderProject(p) {
  document.title = `${p.title} — Khian Bustamante`;

  const idx = projects.findIndex((proj) => proj.id === p.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const container = document.getElementById("project-container");
  container.innerHTML = `
    <section class="page-hero" style="padding-bottom: 0;">
      <div class="wrap reveal">
        <div class="project-hero-meta">
          <span>${p.category}</span>
          <span class="dot-sep"></span>
          <span>${p.year}</span>
        </div>
        <h1>${p.title}</h1>
        <p>${p.description}</p>
        ${
          p.live && p.live !== "#"
            ? `
        <div class="project-live-embed">
          <div class="live-embed-bar">
            <div class="dev-card-dots"><span></span><span></span><span></span></div>
            <span class="live-embed-url">${p.live.replace(/^https?:\/\//, "")}</span>
            <a href="${p.live}" target="_blank" rel="noopener" class="live-embed-open">Open live site ↗</a>
          </div>
          <iframe class="live-embed-frame" src="${p.live}" title="Live preview of ${p.title}" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>`
            : `<div class="project-cover">${p.title}</div>`
        }
      </div>
    </section>

    <section class="section">
      <div class="wrap case-grid">
        <aside class="case-sidebar reveal">
          <div class="sidebar-block">
            <h5>Technology</h5>
            <div class="sidebar-tags">${p.technologies.map((t) => `<span>${t}</span>`).join("")}</div>
          </div>
          <div class="sidebar-block">
            <h5>Year</h5>
            <p style="font-size: 14.5px;">${p.year}</p>
          </div>
          <div class="sidebar-block">
            <h5>Links</h5>
            <div class="sidebar-links">
              <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-small">GitHub</a>
              <a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary btn-small">Live site</a>
            </div>
          </div>
        </aside>

        <div class="case-body">
          <div class="case-section reveal">
            <span class="num">01 — Overview</span>
            <h2>Overview</h2>
            <p>${p.longDescription}</p>
          </div>
          <div class="case-section reveal">
            <span class="num">02 — The problem</span>
            <h2>The problem</h2>
            <p>${p.problem}</p>
          </div>
          <div class="case-section reveal">
            <span class="num">03 — The solution</span>
            <h2>The solution</h2>
            <p>${p.solution}</p>
          </div>
          <div class="case-section reveal">
            <span class="num">04 — Features</span>
            <h2>Features</h2>
            <ul class="case-list">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
          </div>
          <div class="case-section reveal">
            <span class="num">05 — Challenges</span>
            <h2>Challenges</h2>
            <ul class="case-list">${p.challenges.map((c) => `<li>${c}</li>`).join("")}</ul>
          </div>
          <div class="case-section reveal">
            <span class="num">06 — What I learned</span>
            <h2>What I learned</h2>
            <ul class="case-list">${p.learned.map((l) => `<li>${l}</li>`).join("")}</ul>
          </div>

          <div class="project-nav-row reveal">
            <a href="project.html?id=${prev.id}">← ${prev.title}</a>
            <a href="projects.html">All projects</a>
            <a href="project.html?id=${next.id}">${next.title} →</a>
          </div>
        </div>
      </div>
    </section>
  `;

  initializeScrollReveal();
}

document.addEventListener("DOMContentLoaded", () => {
  const id = getProjectIdFromUrl();
  const project = projects.find((p) => p.id === id);
  if (!project) {
    renderNotFound();
  } else {
    renderProject(project);
  }
});

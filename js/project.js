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
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;
  const technologies = p.technologies || [];
  const githubLink = p.github && p.github !== "#"
    ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-small">GitHub</a>`
    : "";
  const liveLink = p.live && p.live !== "#"
    ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-small">Open Live Website ↗</a>`
    : "";
  const caseSections = [
    ["01 — Overview", "Overview", p.longDescription],
    ["02 — The problem", "The problem", p.problem],
    ["03 — The solution", "The solution", p.solution],
    ["04 — Features", "Features", p.features],
    ["05 — Technology", "Technology", technologies],
    ["06 — Development details", "Development details", p.developmentDetails],
    ["07 — Development process", "Development process", p.process],
    ["08 — Challenges", "Challenges", p.challenges],
    ["09 — What I learned", "What I learned", p.learned]
  ].filter(([, , content]) => Array.isArray(content) ? content.length : Boolean(content));

  const renderSection = ([number, heading, content]) => `
    <section class="case-section reveal">
      <span class="num">${number}</span>
      <h2>${heading}</h2>
      ${heading === "Technology" ? `<div class="case-tech-tags">${content.map((item) => `<span>${item}</span>`).join("")}</div>` : Array.isArray(content) ? `<ul class="case-list">${content.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<p>${content}</p>`}
    </section>`;

  const liveProject = p.live && p.live !== "#"
    ? `<section class="live-project-section reveal" aria-labelledby="live-project-heading">
        <div class="live-project-heading"><div><span class="eyebrow">Try the project</span><h2 id="live-project-heading">Live Project</h2></div><a class="btn btn-primary" href="${p.live}" target="_blank" rel="noopener noreferrer">Open Live Website ↗</a></div>
        ${p.liveEmbed === false
          ? `<div class="live-project-fallback"><p>This website refuses to load inside an embedded preview. Use the button above to open the live project directly.</p></div>`
          : `<p class="live-project-note">Explore the live site below. If the embedded preview is blocked or doesn’t load in your browser, use the button to open it in a new tab.</p><div class="live-project-wrapper"><iframe class="live-project-frame" src="${p.live}" title="${p.title} live website" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" scrolling="yes"></iframe></div>`}
      </section>`
    : `<section class="live-project-section reveal" aria-labelledby="live-project-heading"><span class="eyebrow">Try the project</span><h2 id="live-project-heading">Live Project</h2><p>Live demo not currently deployed.</p></section>`;

  const sidebarBlocks = [
    p.year ? `<div class="sidebar-block"><h5>Year</h5><p style="font-size:14.5px;">${p.year}</p></div>` : "",
    githubLink ? `<div class="sidebar-block"><h5>Links</h5><div class="sidebar-links">${githubLink}</div></div>` : ""
  ].join("");

  const container = document.getElementById("project-container");
  container.innerHTML = `
    <section class="page-hero" style="padding-bottom: 0;">
      <div class="wrap reveal">
        <div class="project-hero-meta">
          <span>${p.category}</span>
          ${p.year ? `<span class="dot-sep"></span><span>${p.year}</span>` : ""}
        </div>
        <h1>${p.title}</h1>
        <p>${p.description}</p>
        ${p.image ? `<img class="project-case-image" src="${p.image}" alt="${p.title} preview">` : `<div class="project-cover">${p.title}</div>`}
        ${liveLink || githubLink ? `<div class="project-detail-links">${liveLink}${githubLink}</div>` : ""}
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="case-grid${sidebarBlocks ? "" : " case-grid--single"}">
          ${sidebarBlocks ? `<aside class="case-sidebar reveal">${sidebarBlocks}</aside>` : ""}
          <div class="case-body">
            ${caseSections.length ? caseSections.map(renderSection).join("") : `<p class="section-sub">More project details will be added here.</p>`}
            <div class="project-nav-row reveal">
              ${prev ? `<a href="project.html?id=${prev.id}">← ${prev.title}</a>` : `<span></span>`}
              <a href="projects.html">All projects</a>
              ${next ? `<a href="project.html?id=${next.id}">${next.title} →</a>` : `<span></span>`}
            </div>
          </div>
        </div>
        ${liveProject}
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

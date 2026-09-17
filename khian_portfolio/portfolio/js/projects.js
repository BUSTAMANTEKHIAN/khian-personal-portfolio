/* =========================================================
   projects.html — filtering + search
   Relies on the shared `projects` array from projects-data.js
   ========================================================= */

let activeFilter = "All";
let activeQuery = "";

function getCategories() {
  const cats = new Set(projects.map((p) => p.category));
  return ["All", ...Array.from(cats)];
}

function projectCardHTML(p) {
  return `
    <div class="project-card reveal is-visible">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title} preview">
      </div>
      <div class="project-body">
        <span class="project-cat">${p.category}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.technologies.slice(0, 3).map((t) => `<span>${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="project.html?id=${p.id}">View project →</a>
          ${p.live && p.live !== "#" ? `<a href="${p.live}" target="_blank" rel="noopener">Live site</a>` : ""}
        </div>
      </div>
    </div>
  `;
}

function matchesQuery(p, query) {
  const haystack = [p.title, p.description, p.category, ...p.technologies].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const countEl = document.getElementById("results-count");
  if (!grid) return;

  let filtered = projects.filter((p) => activeFilter === "All" || p.category === activeFilter);
  if (activeQuery.trim()) {
    filtered = filtered.filter((p) => matchesQuery(p, activeQuery.trim()));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>No projects match your search.</p>
        <button class="btn btn-secondary btn-small" id="clear-filters">View all projects</button>
      </div>
    `;
    document.getElementById("clear-filters").addEventListener("click", () => {
      activeFilter = "All";
      activeQuery = "";
      document.getElementById("project-search").value = "";
      syncActiveTab();
      renderProjects();
    });
  } else {
    grid.innerHTML = filtered.map(projectCardHTML).join("");
  }

  if (countEl) {
    countEl.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"}`;
  }
}

function syncActiveTab() {
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.category === activeFilter);
  });
}

function initializeProjectFilters() {
  const tabsWrap = document.getElementById("filter-tabs");
  if (!tabsWrap) return;

  tabsWrap.innerHTML = getCategories()
    .map((cat) => `<button class="filter-tab${cat === "All" ? " is-active" : ""}" data-category="${cat}">${cat}</button>`)
    .join("");

  tabsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-tab");
    if (!btn) return;
    activeFilter = btn.dataset.category;
    syncActiveTab();
    renderProjects();
  });
}

function initializeProjectSearch() {
  const input = document.getElementById("project-search");
  if (!input) return;
  input.addEventListener("input", (e) => {
    activeQuery = e.target.value;
    renderProjects();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeProjectFilters();
  initializeProjectSearch();
  renderProjects();
});

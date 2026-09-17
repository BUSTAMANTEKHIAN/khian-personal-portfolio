# Khian Bustamante — Developer Portfolio

A multi-page personal developer portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- Responsive design from 320px to 1920px+
- Dark mode by default, with a light mode toggle that persists via `localStorage`
- Sticky navbar with scroll state, mobile hamburger menu (closes on link click, outside click, or Escape)
- Data-driven project system — one array in `js/projects-data.js` powers the homepage preview, the filterable project grid, and individual project case-study pages
- Project filtering by category and live search (title, description, category, technology)
- Dynamic project detail page (`project.html?id=1`) with a "Project not found" state for invalid IDs
- FAQ accordion, scroll-reveal animations (`IntersectionObserver`), back-to-top button
- Contact form with client-side validation (required fields, email format, minimum message length)
- Respects `prefers-reduced-motion` and `prefers-color-scheme`
- Basic SEO: titles, meta descriptions, Open Graph tags, canonical URLs, inline SVG favicon

## Project structure

```
portfolio/
├── index.html
├── about.html
├── services.html
├── projects.html
├── project.html
├── contact.html
├── css/
│   ├── styles.css       (tokens, reset, shared components)
│   ├── responsive.css
│   ├── about.css
│   ├── services.css
│   ├── projects.css
│   ├── project.css
│   └── contact.css
├── js/
│   ├── script.js         (nav, theme, reveal, back-to-top, FAQ — shared)
│   ├── projects-data.js  (single source of truth for all projects)
│   ├── projects.js       (filter + search logic for projects.html)
│   ├── project.js        (renders a single project as a case study)
│   └── contact.js        (form validation)
└── assets/
    ├── images/
    └── icons/
```

## Running it

No build step or server required — this is a static site. Open `index.html` directly in a browser, or serve the folder locally:

```bash
npx serve portfolio
cd "C:\Users\sajoy\OneDrive\Desktop\khian_portfolio\portfolio"
npm start
```

## Customizing

### Change your info
Search for these and replace with your own details:
- Name/brand: `Khian Bustamante` (navbar, footer, page titles)
- Email: `khianbustamante1@gmail.com`
- Social links: `https://github.com`, `https://linkedin.com` (in `index.html`, `contact.html`, and the shared nav/footer markup repeated on every page)
- Bio copy in the hero section of `index.html` and the About page

### Add a project
Add a new object to the `projects` array in `js/projects-data.js`:

```js
{
  id: 4,
  slug: "your-project",
  title: "Project Name",
  category: "Websites", // must match an existing category to appear under that filter, or introduces a new one automatically
  year: "2026",
  description: "Short one-line summary.",
  longDescription: "A few sentences for the case study overview.",
  image: "assets/images/project-4.jpg",
  technologies: ["HTML", "CSS", "JavaScript"],
  features: ["Feature one", "Feature two"],
  problem: "What problem this solved.",
  solution: "How you solved it.",
  challenges: ["Challenge one"],
  learned: ["What you learned"],
  github: "#",
  live: "#"
}
```

That's it — it will automatically appear on the homepage (if in the first three), in the projects grid, in the category filters, and be viewable at `project.html?id=4`.

### Change colors
All colors are CSS custom properties at the top of `css/styles.css` under `:root` (dark theme) and `[data-theme="light"]` (light theme). Change the values there to restyle the whole site.

### Add real project images
Replace the placeholder thumbnail (`.thumb-fill`, a styled text block) with an `<img>` tag once you have real screenshots, and drop images into `assets/images/`.

### Contact form
The contact form posts to the configured Formspree endpoint through `js/contact.js`. It validates required fields, email format, and message length before sending. If you change providers, update both the form `action` in `contact.html` and the submission logic as needed; keep credentials and API keys server-side.

## Deployment

Works as a static site on any of these:
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch
- **Netlify**: drag-and-drop the `portfolio/` folder, or connect the repo
- **Vercel**: import the repo, no build command needed (static)

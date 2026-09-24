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
- Basic SEO: titles, meta descriptions, Open Graph tags, and inline SVG favicon

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
│   ├── polish.css       (shared visual refinements)
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

### Certificates
Add the original certificate PDFs to `assets/certificates/` with these filenames so the About page viewer can preview them:
- `netacad-networking-cybersecurity.pdf`
- `nc2-mechatronics.pdf`

The page intentionally does not include certificate dates, verification links, or identifiers until those details and documents are provided.

## Running it

No build step or package installation is needed. To serve it locally:

```powershell
cd "C:\Users\sajoy\OneDrive\Desktop\khian_portfolio\khian-personal-portfolio\khian_portfolio\portfolio"
npm start
```

Then visit `http://127.0.0.1:3000`. The included `server.js` uses only Node.js built-in modules.

## Customizing

### Change your info
Search for these and replace with your own details:
- Name/brand: `Khian Bustamante` (navbar, footer, page titles)
- Email and social links are listed on the Contact page and repeated in the homepage/footer markup.
- Bio copy in the hero section of `index.html` and the About page

### Add a project
Add a new object to the `projects` array in `js/projects-data.js`:

```js
{
  id: 4,
  slug: "your-project",
  title: "Project Name",
  category: "Websites", // must match an existing category to appear under that filter, or introduces a new one automatically
  year: "", // omit when unknown
  description: "Short one-line summary.",
  longDescription: "A few sentences for the case study overview.",
  image: "assets/images/project-4.jpg",
  technologies: ["HTML", "CSS", "JavaScript"],
  features: ["Feature one", "Feature two"],
  problem: "What problem this solved.",
  solution: "How you solved it.",
  challenges: ["Challenge one"],
  learned: ["What you learned"],
  github: "", // leave empty when no public repository exists
  live: "" // leave empty when no deployed site exists
}
```

That's it — it will automatically appear on the homepage (if in the first three), in the projects grid, in the category filters, and be viewable at `project.html?id=4`.

### Change colors
All colors are CSS custom properties at the top of `css/styles.css` under `:root` (dark theme) and `[data-theme="light"]` (light theme). Change the values there to restyle the whole site.

### Add real project images
Add a real screenshot under `assets/images/` or `assets/project/`, then set the matching `image` path in `js/projects-data.js`. Projects without screenshots use a labeled placeholder.

### Contact form
The form validates on the client and submits to the Formspree endpoint in `contact.html`. Change that endpoint if the form is moved to a different Formspree account.

## Deployment

Works as a static site on any of these:
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch
- **Netlify**: drag-and-drop the `portfolio/` folder, or connect the repo
- **Vercel**: import the repo, no build command needed (static)

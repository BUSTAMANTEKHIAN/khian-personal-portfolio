# Khian Bustamante — Portfolio

Responsive, multi-page portfolio built with vanilla HTML, CSS, and JavaScript. The active site is the repository root and deploys as a static site to Cloudflare Pages; there is no framework or build step.

## Pages and features

- Home, About, Services, Projects, project case studies, Contact, Privacy, and a custom 404 page
- Shared project data for the homepage cards, searchable/filterable project list, and `project.html?id=...` case studies
- Yankiii Barber Co. is featured first and links to its public site. Its case study uses the real screenshot and describes only behavior visible on the public deployment.
- Keyboard-operable navigation and FAQs, visible focus treatment, skip links, reduced-motion support, responsive layouts, and light/dark themes
- Client-side contact validation; messages are submitted to the configured Formspree endpoint
- Page metadata, canonical links, Open Graph/Twitter metadata, a social preview, sitemap, and robots rules
- Cloudflare Pages response headers in `_headers`

## Run locally

From this repository root:

```powershell
npm start
```

Then open <http://127.0.0.1:3000>. Node.js is the only local requirement; the server uses built-in modules and `package.json` has no dependencies.

## Project structure

```text
index.html, about.html, services.html, projects.html, project.html, contact.html
privacy.html, 404.html, _headers, robots.txt, sitemap.xml
css/      shared, page-specific, responsive, and refinement styles
js/       shared behavior, contact form, project data/list/detail, home cards
media/    original profile and project images plus the social preview PNG (SVG source)
server.js dependency-free local static server
```

To add a project, add a truthful entry to `js/projects-data.js` and place any real screenshot in `media/`. Do not add private repository links or features that cannot be verified.

## Contact and privacy

The contact form sends the submitted name, email, optional organization, inquiry type, and message to the Formspree endpoint in `contact.html`. The site does not run analytics scripts or intentionally set analytics or advertising cookies. See [privacy.html](privacy.html) for the site's data-handling summary.

## Deploy to Cloudflare Pages

Use the repository root as the output directory and leave the build command empty. Deploy the updated root files after reviewing the Git diff. The `_headers` file applies the static-site security headers on Cloudflare Pages.

# Khian Bustamante — Portfolio

A polished, responsive developer portfolio showcasing full-stack web applications built with Node.js, Express, MySQL, and modern JavaScript. Deployed on Cloudflare Pages.

## Shipped Projects

1. **YKB Clothing** — Full-stack clothing e-commerce platform with authentication, catalog, cart, checkout, orders, wishlist, reviews, and admin dashboard. (Node.js, Express, MySQL, JWT, bcrypt, Multer, Cloudinary, CORS, Nodemailer on Render).
2. **Yankiii Barber Co.** — Full-stack barbershop booking platform with service browsing, barber selection, availability management, customer accounts, appointment booking, and admin management. (Node.js, Express, MySQL, JWT, bcrypt, Nodemailer, Express Rate Limit, CORS on Vercel).

## Pages & Structure

- `index.html`: Hero, Selected Work, Capabilities/Stack, Short About, Contact CTA.
- `projects.html`: Work overview with case study links and live project buttons.
- `projects/ykb-clothing.html`: Comprehensive case study for YKB Clothing (problem, role, key features, stack, architecture, challenges, learnings).
- `projects/yankiii-barber.html`: Comprehensive case study for Yankiii Barber Co. (problem, role, key features, stack, architecture, challenges, learnings).
- `about.html`: Background, education (Computer Engineering Technology at PUP), core stack, and verified certifications (TESDA, Cybersecurity, Networking).
- `contact.html`: Contact form supporting project type, budget, and timeline, submitting to Formspree, plus direct email and social links.
- `privacy.html`: Data handling and privacy policy.
- `404.html`: Custom 404 error page.

## Local Development

Run the lightweight local server:

```powershell
npm start
```

Then navigate to `http://localhost:3000`.

## Deployment

Configured for static hosting on Cloudflare Pages with HTTP headers in `_headers`, redirect rules in `_redirects`, and search indexing via `robots.txt` and `sitemap.xml`.

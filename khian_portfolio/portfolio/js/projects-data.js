/* =========================================================
   Centralized project data
   Add a new project by adding an object to this array — every
   page (home preview, projects grid, filters, detail view)
   reads from this single source.
   ========================================================= */

const projects = [
  {
    id: 1,
    slug: "ykb-clothing",
    title: "YKB Clothing",
    category: "E-Commerce",
    year: "2026",

    description:
      "A full-stack clothing e-commerce site with a product catalog, cart, and checkout flow.",

    longDescription:
      "YKB Clothing is a full-stack online store built with vanilla JavaScript on the frontend and a Node.js/Express backend. The goal was to build a real, working e-commerce flow end to end — product browsing, cart state, and checkout — without leaning on a framework, so every interaction is handled with plain DOM logic and REST calls.",

    image: "assets/project/ykb_home.png",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL"
    ],

    features: [
      "Product catalog with category browsing",
      "Persistent shopping cart",
      "Checkout flow",
      "Express REST API backing the storefront",
      "MySQL-backed product and order data"
    ],

    problem:
      "Most starter e-commerce demos stop at a static product grid. The goal here was a store that actually tracks cart state and talks to a real backend and database, the way a client-facing shop would need to.",

    solution:
      "Built the storefront in vanilla JS with a clear separation between UI rendering and API calls, and a Node/Express backend exposing REST endpoints for products, cart, and orders, backed by a MySQL schema for catalog and order data.",

    challenges: [
      "Keeping cart state in sync between the client and the server without a frontend framework",
      "Designing a MySQL schema that could support categories, variants, and orders cleanly"
    ],

    learned: [
      "How to structure a REST API for a real storefront, not just a demo endpoint",
      "Patterns for managing client-side state by hand that a framework would normally handle"
    ],

    github: "#",
    live: "https://ykb-ecommerce.onrender.com"
  },

  {
    id: 2,
    slug: "digital-builders-portfolio",
    title: "Digital Builders Team Portfolio",
    category: "Websites",
    year: "2026",

    description:
      "A multi-page portfolio site built collaboratively for the Digital Builders dev team.",

    longDescription:
      "A multi-page vanilla HTML, CSS, and JavaScript site built to showcase the Digital Builders development team — their members, process, and shared work — as a group project for a web development class.",

    image: "assets/images/project-2.jpg",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],

    features: [
      "Multiple linked pages sharing a consistent design system",
      "Team member profiles",
      "Responsive layout across breakpoints",
      "Reusable CSS components across pages"
    ],

    problem:
      "The team needed one site to represent everyone's work consistently, without every page being built and styled from scratch by a different person.",

    solution:
      "Set up a shared CSS structure and page template so every team member's page followed the same visual language, then split up page ownership while keeping the design system centralized.",

    challenges: [
      "Coordinating a consistent design system across multiple contributors",
      "Keeping navigation and layout consistent across every page"
    ],

    learned: [
      "How to structure a multi-page vanilla site so it stays maintainable across contributors",
      "Working with version control on a shared frontend codebase"
    ],

    github: "#",
    live: "#"
  }
];
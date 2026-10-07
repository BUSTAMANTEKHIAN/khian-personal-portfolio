/* =========================================================
   Centralized project data
   Khian Bustamante - Full-Stack Developer Portfolio
   Only shipped full-stack portfolio projects.
   ========================================================= */

const projects = [
  {
    id: 1,
    slug: "ykb-clothing",
    title: "YKB Clothing",
    category: "Full-Stack E-Commerce",
    year: "2026",

    description:
      "A full-stack clothing e-commerce platform with authentication, cart, checkout, orders, wishlist, reviews, and admin management.",

    longDescription:
      "A full-stack clothing e-commerce platform with authentication, product management, cart, checkout, orders, wishlist, reviews, and administrative management.",

    image: "media/project/ykb-01.webp",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "JWT",
      "bcrypt",
      "Multer",
      "Cloudinary",
      "CORS",
      "Nodemailer"
    ],

    features: [
      "User authentication",
      "Product catalog",
      "Shopping cart",
      "Checkout",
      "Order management",
      "Wishlist",
      "Product reviews",
      "Admin dashboard",
      "MySQL database"
    ],

    architecture: {
      frontend: "HTML / CSS / JavaScript",
      backend: "Node.js / Express.js",
      database: "MySQL",
      authentication: "JWT / bcrypt",
      media: "Multer / Cloudinary",
      deployment: "Render"
    },

    problem:
      "Most starter e-commerce demos stop at a static product grid. YKB Clothing was engineered as a complete full-stack shopping platform with persistent user sessions, realistic catalog filtering, dynamic cart calculations, checkout processing, user reviews, and an administrative panel for catalog management.",

    solution:
      "Built the storefront with vanilla JavaScript with a clean separation between UI rendering and API interactions, backed by a Node.js/Express REST backend, JWT authentication, and a normalized MySQL schema for catalog, user, and order data.",

    challenges: [
      "Keeping client-side cart and wishlist state synchronized with authenticated user records and database inventory without using a heavy frontend framework",
      "Structuring relational MySQL schemas to support product variants, categories, customer reviews, and order line items cleanly"
    ],

    learned: [
      "How to architect production-ready REST APIs for e-commerce with proper error handling and token verification",
      "Techniques for reliable state management and DOM updates using native browser APIs"
    ],

    github: "",
    live: "https://ykb-ecommerce.onrender.com"
  },

  {
    id: 2,
    slug: "yankiii-barber-co",
    title: "Yankiii Barber Co.",
    category: "Full-Stack Web Application",
    year: "2026",

    description:
      "A full-stack barbershop booking platform with services, barber selection, availability, customer accounts, appointment booking, and administrative tools.",

    longDescription:
      "A full-stack barbershop booking platform with service browsing, barber selection, availability, customer authentication, appointment booking, customer dashboard, and administrative management.",

    image: "media/project/yankiii-01.webp",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "JWT",
      "bcrypt",
      "Nodemailer",
      "Express Rate Limit",
      "CORS"
    ],

    features: [
      "Service browsing",
      "Barber selection",
      "Availability",
      "Appointment booking",
      "Customer authentication",
      "Customer dashboard",
      "Admin dashboard",
      "Booking management",
      "Responsive mobile UI"
    ],

    architecture: {
      frontend: "HTML / CSS / JavaScript",
      backend: "Node.js / Express.js",
      database: "MySQL",
      authentication: "JWT / bcrypt",
      email: "Nodemailer",
      security: "Express Rate Limit / CORS",
      deployment: "Vercel"
    },

    problem:
      "Booking a barbershop appointment involves multiple coordinated decisions: selecting a service, choosing a barber, checking real-time availability, and confirming the appointment schedule. Yankiii Barber Co. brings these steps into a unified full-stack application while providing an administrative management interface for barbershop staff to manage services, barbers, and bookings.",

    solution:
      "Engineered an end-to-end booking platform pairing responsive customer interfaces with a Node.js/Express backend and MySQL database. The system handles customer authentication, schedule validation, appointment creation, customer dashboards, and staff administrative tools.",

    challenges: [
      "Coordinating appointment availability across individual barbers and business hours while preventing double-bookings",
      "Separating business concerns into modular controllers, routes, and middleware for booking logic, authentication, and admin access"
    ],

    learned: [
      "How to model appointment scheduling logic and database relationships in MySQL",
      "Implementing secure customer and administrative authentication with rate limiting and input validation"
    ],

    github: "",
    live: "https://yankiii-barber-co.vercel.app/"
  }
];

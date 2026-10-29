import { PortfolioData } from "./models/Portfolio.modes";

const SHARED_LINKS = [
  { label: "GitHub", href: "https://github.com/mateovranych" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mateovranych/" },
  { label: "Email", href: "mailto:mvranych@gmail.com" },
  { label: "Whatsapp", href: "https://wa.me/5493512836055" },
];

const SHARED_IMAGES = {
  azavnia: [
    "assets/projects/azavnia/1.png",
    "assets/projects/azavnia/2.png",
    "assets/projects/azavnia/3.png",
    "assets/projects/azavnia/4.png",
  ],
  scdental: [
    "assets/projects/scdental/scdentallogo.jpg",
    "assets/projects/scdental/cal.jpg",
    "assets/projects/scdental/obras.jpg",
  ],
  bassino: [
    "assets/projects/bassino/bassinologo.jpg",
    "assets/projects/bassino/pr.jpg",
    "assets/projects/bassino/cc.jpg",
    "assets/projects/bassino/facturas.jpg",
  ],
  lnb: [
    "assets/projects/lnb/1.jpg",
    "assets/projects/lnb/2.jpg",
    "assets/projects/lnb/3.jpg",
    "assets/projects/lnb/5.jpg",
    "assets/projects/lnb/6.jpg",
    "assets/projects/lnb/7.jpg",
  ],
  ecommerce: [
    "assets/projects/ecommerce/1.png",
  ],
};

export const PORTFOLIO_ES: PortfolioData = {
  name: "Mateo Vranych",
  headline: "Diseño y construyo sistemas de negocio de punta a punta con .NET y Angular",
  summary:
    "Desarrollador Full Stack con 4+ años de experiencia diseñando sistemas de negocio críticos (POS, ERP, SaaS) sobre .NET y Angular. Trabajo end-to-end: arquitectura backend con ASP.NET Core y EF Core, interfaces en Angular con TypeScript y despliegues sobre Azure y AWS. Integro IA en flujos de negocio y automatizo procesos con n8n, con foco en performance, código mantenible y software que resuelve problemas reales.",
  location: "Córdoba, Argentina",
  links: SHARED_LINKS,

  ui: {
    nav: { projects: "Proyectos", experience: "Experiencia", skills: "Habilidades", contact: "Contacto", cta: "Contactame", downloadCv: "Descargar CV", home: "Inicio", mobileCta: "Hagamos un proyecto" },
    hero: { viewProjects: "Ver proyectos", contact: "Contacto" },
    projects: { title: "Proyectos", subtitle: "Sistemas en producción — .NET, Angular y arquitectura escalable.", view: "Ver", whatIDid: "Qué hice", challenges: "Retos / decisiones", viewDemo: "Ver demo" },
    experience: { title: "Experiencia", subtitle: "Desarrollo full-stack, arquitectura y docencia." },
    skills: { title: "Habilidades", subtitle: "Stack principal." },
    contact: { title: "Contacto", subtitle: "Contame qué necesitás y te respondo por WhatsApp.", name: "Nombre", namePlaceholder: "Tu nombre", message: "Mensaje", messagePlaceholder: "¿Qué sistema o aplicación necesitás?", sendEmail: "Enviar por Email", sendWhatsapp: "Enviar por WhatsApp", whatsappTemplate: "Hola Mateo! Mi nombre es {name}. {message}. Vengo desde tu portfolio." },
    cvPath: "assets/cv/cv.pdf",
  },

  projects: [
    {
      title: "Azavnia · Sistema de Gimnasios",
      route: "gestion",
      description: "Plataforma SaaS multi-tenant para centros de entrenamiento. Control de acceso, gestión de clientes, pases y asistencias, construida con Angular y TypeScript.",
      images: SHARED_IMAGES.azavnia,
      summary: "SaaS multi-rol con control de acceso por DNI, historial de asistencias y gestión de clientes y pases. Desplegado con Docker.",
      highlights: [
        "Control de acceso por DNI con registro de asistencias en tiempo real",
        "Gestión de clientes, tipos de pase, vencimientos y exportación a Excel",
        "Arquitectura frontend multi-rol en Angular con componentes reutilizables",
      ],
      challenges: [
        "Modelado multi-tenant con aislamiento de datos por gimnasio",
        "Historial de asistencias sobre 1300+ ingresos con búsqueda y paginado eficientes",
        "Diseño de permisos por rol sin duplicar lógica",
      ],
      stack: ["Angular", "TypeScript", "Docker", "CI/CD", "Tailwind CSS"],
      links: [],
    },
    {
      title: "SC Dental · Gestión Clínica + Landing",
      route: "agenda",
      description: "Sistema Cloud desplegado en Azure: landing pública y sistema interno de agenda y fichas clínicas, construido con Angular y ASP.NET Core.",
      images: SHARED_IMAGES.scdental,
      summary: "En producción en Azure con SQL Server. Autenticación con Identity Server e integración de IA para sugerencias de turnos.",
      highlights: [
        "Backend en ASP.NET Core con SQL Server desplegado sobre Azure",
        "Autenticación con Identity Server e integración de IA para sugerencias de turnos",
        "Separación entre web pública y sistema interno con seguridad end-to-end",
      ],
      challenges: [
        "Modelado de agenda, fichas clínicas y flujos de atención",
        "Seguridad end-to-end entre web pública y sistema interno",
        "Integración de IA para sugerencias de turnos",
      ],
      stack: ["Angular", "ASP.NET Core", "SQL Server", "Azure", "Identity Server"],
      links: [{ label: "Ver", href: "https://scdental.com.ar/inicio" }],
    },
    {
      title: "POS/ERP · Ventas, Stock y Cuenta Corriente",
      route: "facturacion",
      description: "Sistema modular completo con ventas, caja, stock, proveedores, cuenta corriente, reportes y automatizaciones, desplegado y monitoreado en producción.",
      images: SHARED_IMAGES.bassino,
      summary: "Angular + .NET en producción. Cuenta corriente con pagos FIFO, trazabilidad de stock y automatizaciones con n8n.",
      highlights: [
        "Cuenta corriente con pagos FIFO, saldos consistentes y trazabilidad de cada movimiento",
        "Ventas, caja, stock, proveedores y reportes generados con QuestPDF",
        "Automatizaciones con n8n para alertas de stock bajo y sincronización entre módulos",
      ],
      challenges: [
        "Optimización de queries con DTO projection y AsNoTracking",
        "Trazabilidad de cada movimiento y operación sensible",
        "Consistencia de saldos en cuenta corriente con pagos FIFO",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "n8n", "QuestPDF"],
      links: [],
    },
    {
      title: "Retail y Gestión de Pedidos",
      route: "retail",
      description: "Solución para gastronomía y retail (La Nueva Bodega) en uso diario, con integración nativa de posnet Clover y foco en performance bajo alto volumen.",
      images: SHARED_IMAGES.lnb,
      summary: "Sistema en producción con integración de posnet Clover (Cloud Pay Display y QR personalizado) y optimización de performance para alto volumen.",
      highlights: [
        "Integración nativa con posnet Clover (Cloud Pay Display y QR personalizado)",
        "Optimización de queries e índices para catálogos grandes en producción",
        "Flujos de facturación electrónica e integración de tickets",
      ],
      challenges: [
        "Integración de tenders personalizados (QR) con posnet Clover",
        "Performance en catálogos grandes (búsqueda, paginado, índices)",
        "Estabilidad del sistema bajo carga real y continua",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "Clover"],
      links: [],
    },
    {
      title: "E-commerce · Plataforma de Ventas Online",
      route: "ecommerce",
      description: "Plataforma de comercio electrónico con integración de pagos, geolocalización y arquitectura escalable, desplegada en AWS.",
      images: SHARED_IMAGES.ecommerce,
      summary: "Integración segura con MercadoPago y Google Maps. Arquitectura escalable preparada para alto tráfico sobre AWS.",
      highlights: [
        "Integración segura de pagos con MercadoPago",
        "Geolocalización con Google Maps",
        "Arquitectura escalable desplegada en AWS con Docker",
      ],
      challenges: [
        "Seguridad en integración con APIs externas de pago",
        "Sincronización entre catálogo, stock y pedidos en tiempo real",
        "Despliegue escalable en AWS",
      ],
      stack: [".NET", "Angular", "AWS", "Docker", "MercadoPago"],
      links: [],
    },
  ],

  experience: [
    {
      company: "Proyectos Propios / Freelance",
      role: "Full Stack Developer",
      period: "2023 — Presente",
      location: "Córdoba, AR",
      bullets: [
        "Diseño y despliegue de 5+ sistemas en producción con .NET y Angular sobre Azure y AWS: POS/ERP, SaaS de gimnasios y e-commerce con integración MercadoPago.",
        "Backend con ASP.NET Core y EF Core aplicando Clean Architecture, SOLID y optimización de queries con DTO projection y AsNoTracking.",
        "Frontend completo en Angular: arquitectura modular, RxJS, formularios reactivos, lazy loading y consumo de APIs REST.",
        "Integración con posnet Clover: Cloud Pay Display, tenders personalizados (QR) y app propia dentro de Clover.",
        "Integración de IA (OpenAI, Anthropic) y automatización con n8n: chatbots, clasificación de documentos y orquestación de APIs.",
        "Módulos de cuenta corriente con pagos FIFO, trazabilidad de stock auditable y reportes con QuestPDF.",
        "Contenedorización con Docker y administración de recursos en Azure (App Service, SQL Server, PostgreSQL).",
      ],
      stack: ["ASP.NET Core", "Angular", "EF Core", "SQL Server", "Docker", "Azure", "n8n"],
    },
    {
      company: "Instituto Técnico Superior (ITS)",
      role: "Profesor — Programación III e Ingeniería de Software",
      period: "2026 — Presente",
      location: "Córdoba, AR",
      bullets: [
        "Estructuras de datos, POO y diseño de sistemas con foco en metodologías ágiles y patrones de arquitectura.",
        "Mentoría de proyectos integradores aplicando Clean Architecture y buenas prácticas.",
        "Incorporación de IA y herramientas de automatización al plan de estudios.",
      ],
      stack: ["Arquitectura", "Software Engineering", "Agile", "IA"],
    },
    {
      company: "No Country",
      role: "Backend Developer — Simulación laboral",
      period: "2023",
      location: "Remoto",
      bullets: [
        "APIs REST en ASP.NET Core dentro de equipo Scrum, aplicando SOLID y Clean Architecture sobre PostgreSQL.",
      ],
      stack: ["ASP.NET Core", "PostgreSQL", "Scrum", "Clean Architecture"],
    },
  ],

  skills: [
    { title: "Backend & Arquitectura", items: ["C#", "ASP.NET Core", "EF Core", "LINQ", "Clean Architecture", "SOLID", "Design Patterns"] },
    { title: "Frontend", items: ["Angular", "TypeScript", "RxJS", "Angular Material", "Tailwind CSS", "React"] },
    { title: "Bases de Datos", items: ["SQL Server", "PostgreSQL", "Redis", "Optimización de Queries", "DTO Projection"] },
    { title: "Cloud & DevOps", items: ["Azure (App Service / SQL / Redis)", "AWS", "Docker", "CI/CD", "Identity Server"] },
    { title: "Integraciones & POS", items: ["Posnet Clover", "Cloud Pay Display", "Tenders (QR)", "MercadoPago API"] },
    { title: "IA & Automatización", items: ["OpenAI API", "Anthropic Claude", "n8n", "LLM Integration", "Prompt Engineering"] },
  ],
};

export const PORTFOLIO_EN: PortfolioData = {
  name: "Mateo Vranych",
  headline: "I design and build business-critical systems end to end with .NET and Angular",
  summary:
    "Full Stack Developer with 4+ years of experience designing business-critical systems (POS, ERP, SaaS) on .NET and Angular. I work end-to-end: backend architecture with ASP.NET Core and EF Core, Angular interfaces with TypeScript, and deployments on Azure and AWS. I integrate AI into business flows and automate processes with n8n, focused on performance, maintainable code, and software that solves real problems.",
  location: "Córdoba, Argentina",
  links: SHARED_LINKS,

  ui: {
    nav: { projects: "Projects", experience: "Experience", skills: "Skills", contact: "Contact", cta: "Get in touch", downloadCv: "Download CV", home: "Home", mobileCta: "Let's build something" },
    hero: { viewProjects: "View projects", contact: "Contact" },
    projects: { title: "Projects", subtitle: "Production systems — .NET, Angular, and scalable architecture.", view: "View", whatIDid: "What I did", challenges: "Challenges / decisions", viewDemo: "View demo" },
    experience: { title: "Experience", subtitle: "Full-stack development, architecture, and teaching." },
    skills: { title: "Skills", subtitle: "Core stack." },
    contact: { title: "Contact", subtitle: "Tell me what you need and I'll get back to you.", name: "Name", namePlaceholder: "Your name", message: "Message", messagePlaceholder: "What system or app do you need?", sendEmail: "Send Email", sendWhatsapp: "Send via WhatsApp", whatsappTemplate: "Hi Mateo! My name is {name}. {message}. I found you through your portfolio." },
    cvPath: "assets/cv/cv-en.pdf",
  },

  projects: [
    {
      title: "Azavnia · Gym Management System",
      route: "gestion",
      description: "Multi-tenant SaaS platform for fitness centers. Access control, client, pass, and attendance management, built with Angular and TypeScript.",
      images: SHARED_IMAGES.azavnia,
      summary: "Multi-role SaaS with DNI-based access control, attendance history, and client and pass management. Deployed with Docker.",
      highlights: [
        "DNI-based access control with real-time attendance logging",
        "Client, pass type, and expiration management with Excel export",
        "Multi-role frontend architecture in Angular with reusable components",
      ],
      challenges: [
        "Multi-tenant modeling with per-gym data isolation",
        "Attendance history over 1300+ check-ins with efficient search and pagination",
        "Role-based permissions design without duplicating logic",
      ],
      stack: ["Angular", "TypeScript", "Docker", "CI/CD", "Tailwind CSS"],
      links: [],
    },
    {
      title: "SC Dental · Clinic Management + Landing",
      route: "agenda",
      description: "Cloud system deployed on Azure: public landing and internal scheduling and clinical records system, built with Angular and ASP.NET Core.",
      images: SHARED_IMAGES.scdental,
      summary: "In production on Azure with SQL Server. Identity Server authentication and AI integration for scheduling suggestions.",
      highlights: [
        "ASP.NET Core backend with SQL Server deployed on Azure",
        "Identity Server authentication and AI integration for scheduling suggestions",
        "Public website and internal system separation with end-to-end security",
      ],
      challenges: [
        "Modeling scheduling, clinical records, and patient-care flows",
        "End-to-end security between public website and internal system",
        "AI integration for scheduling suggestions",
      ],
      stack: ["Angular", "ASP.NET Core", "SQL Server", "Azure", "Identity Server"],
      links: [{ label: "View", href: "https://scdental.com.ar/inicio" }],
    },
    {
      title: "POS/ERP · Sales, Inventory & Accounts",
      route: "facturacion",
      description: "Complete modular system with sales, cash register, inventory, suppliers, accounts receivable, reports, and automations, deployed and monitored in production.",
      images: SHARED_IMAGES.bassino,
      summary: "Angular + .NET in production. Accounts receivable with FIFO payments, inventory traceability, and n8n automations.",
      highlights: [
        "Accounts receivable with FIFO payments, consistent balances, and full traceability of every movement",
        "Sales, cash register, inventory, suppliers, and reporting with QuestPDF",
        "n8n automations for low-stock alerts and cross-module synchronization",
      ],
      challenges: [
        "Query optimization with DTO projection and AsNoTracking",
        "Full traceability for every movement and sensitive operation",
        "Balance consistency in accounts receivable with FIFO payments",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "n8n", "QuestPDF"],
      links: [],
    },
    {
      title: "Retail & Order Management",
      route: "retail",
      description: "Solution for food service and retail (La Nueva Bodega) in daily use, with native Clover POS integration and a focus on performance under high volume.",
      images: SHARED_IMAGES.lnb,
      summary: "Production system with Clover POS integration (Cloud Pay Display and custom QR) and performance tuning for high-volume operations.",
      highlights: [
        "Native integration with Clover POS (Cloud Pay Display and custom QR)",
        "Query and index optimization for large production catalogs",
        "Electronic invoicing flows and ticket integration",
      ],
      challenges: [
        "Custom tender (QR) integration with Clover POS",
        "Performance on large catalogs (search, pagination, indexing)",
        "System stability under real and continuous load",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "Clover"],
      links: [],
    },
    {
      title: "E-commerce · Online Sales Platform",
      route: "ecommerce",
      description: "E-commerce platform with payment integration, geolocation, and scalable architecture, deployed on AWS.",
      images: SHARED_IMAGES.ecommerce,
      summary: "Secure integration with MercadoPago and Google Maps. Scalable architecture ready for high traffic on AWS.",
      highlights: [
        "Secure payment integration with MercadoPago",
        "Geolocation with Google Maps",
        "Scalable architecture deployed on AWS with Docker",
      ],
      challenges: [
        "Security in external payment API integration",
        "Real-time synchronization between catalog, inventory, and orders",
        "Scalable deployment on AWS",
      ],
      stack: [".NET", "Angular", "AWS", "Docker", "MercadoPago"],
      links: [],
    },
  ],

  experience: [
    {
      company: "Own Projects / Freelance",
      role: "Full Stack Developer",
      period: "2023 — Present",
      location: "Córdoba, AR",
      bullets: [
        "Design and deployment of 5+ production systems with .NET and Angular on Azure and AWS: POS/ERP, gym management SaaS, and e-commerce with MercadoPago integration.",
        "Backend with ASP.NET Core and EF Core applying Clean Architecture, SOLID, and query optimization with DTO projection and AsNoTracking.",
        "Full frontend development in Angular: modular architecture, RxJS, reactive forms, lazy loading, and REST API consumption.",
        "Integration with Clover POS: Cloud Pay Display, custom tenders (QR), and a custom Clover app.",
        "AI integration (OpenAI, Anthropic) and automation with n8n: chatbots, document classification, and API orchestration.",
        "Accounts receivable modules with FIFO payments, auditable inventory traceability, and reporting with QuestPDF.",
        "Containerization with Docker and resource administration on Azure (App Service, SQL Server, PostgreSQL).",
      ],
      stack: ["ASP.NET Core", "Angular", "EF Core", "SQL Server", "Docker", "Azure", "n8n"],
    },
    {
      company: "Instituto Técnico Superior (ITS)",
      role: "Programming III & Software Engineering Professor",
      period: "2026 — Present",
      location: "Córdoba, AR",
      bullets: [
        "Data structures, OOP, and system design with focus on agile methodologies and architecture patterns.",
        "Capstone project mentoring applying Clean Architecture and engineering best practices.",
        "Integration of AI and automation tools into the curriculum.",
      ],
      stack: ["Architecture", "Software Engineering", "Agile", "AI"],
    },
    {
      company: "No Country",
      role: "Backend Developer — Lab Simulation",
      period: "2023",
      location: "Remote",
      bullets: [
        "REST APIs in ASP.NET Core within a Scrum team, applying SOLID and Clean Architecture on PostgreSQL.",
      ],
      stack: ["ASP.NET Core", "PostgreSQL", "Scrum", "Clean Architecture"],
    },
  ],

  skills: [
    { title: "Backend & Architecture", items: ["C#", "ASP.NET Core", "EF Core", "LINQ", "Clean Architecture", "SOLID", "Design Patterns"] },
    { title: "Frontend", items: ["Angular", "TypeScript", "RxJS", "Angular Material", "Tailwind CSS", "React"] },
    { title: "Databases", items: ["SQL Server", "PostgreSQL", "Redis", "Query Optimization", "DTO Projection"] },
    { title: "Cloud & DevOps", items: ["Azure (App Service / SQL / Redis)", "AWS", "Docker", "CI/CD", "Identity Server"] },
    { title: "Integrations & POS", items: ["Clover POS", "Cloud Pay Display", "Custom Tenders (QR)", "MercadoPago API"] },
    { title: "AI & Automation", items: ["OpenAI API", "Anthropic Claude", "n8n", "LLM Integration", "Prompt Engineering"] },
  ],
};

export const PORTFOLIO = PORTFOLIO_ES;

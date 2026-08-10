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
    "assets/projects/azavnia/5.png",
    "assets/projects/azavnia/6.png",
    "assets/projects/azavnia/7.png",
    "assets/projects/azavnia/8.png",
    "assets/projects/azavnia/9.png",
    "assets/projects/azavnia/10.png",
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
  headline: "Administro infraestructura y construyo los sistemas que corren en ella",
  summary:
    "Sysadmin & Developer con 4+ años combinando operación de infraestructura cloud/on-premise y desarrollo full-stack. Administro entornos en AWS y Azure, orquesto contenedores con Docker y Kubernetes, implemento pipelines CI/CD y monitoreo para garantizar disponibilidad. Mi background de desarrollo me da visión completa del ciclo de vida de las aplicaciones — desde el código hasta la infraestructura que las sostiene.",
  location: "Córdoba, Argentina",
  links: SHARED_LINKS,

  ui: {
    nav: { projects: "Proyectos", experience: "Experiencia", skills: "Habilidades", contact: "Contacto", cta: "Contactame", downloadCv: "Descargar CV", home: "Inicio", mobileCta: "Hagamos un proyecto" },
    hero: { viewProjects: "Ver proyectos", contact: "Contacto" },
    projects: { title: "Proyectos", subtitle: "Sistemas en producción — infraestructura, CI/CD y rendimiento.", view: "Ver", whatIDid: "Qué hice", challenges: "Retos / decisiones", viewDemo: "Ver demo" },
    experience: { title: "Experiencia", subtitle: "Infraestructura cloud, desarrollo y docencia." },
    skills: { title: "Habilidades", subtitle: "Stack principal." },
    contact: { title: "Contacto", subtitle: "Contame qué necesitás y te respondo por WhatsApp.", name: "Nombre", namePlaceholder: "Tu nombre", message: "Mensaje", messagePlaceholder: "¿Qué infraestructura o sistema necesitás?", sendEmail: "Enviar por Email", sendWhatsapp: "Enviar por WhatsApp", whatsappTemplate: "Hola Mateo! Mi nombre es {name}. {message}. Vengo desde tu portfolio." },
    cvPath: "assets/cv/cv.pdf",
  },

  projects: [
    {
      title: "Azavnia — Sistema de Gimnasios",
      route: "gestion",
      description: "Plataforma SaaS multi-tenant para centros de entrenamiento. Gestión de planes, profesores, facturación y métricas, con despliegue containerizado y CI/CD.",
      images: SHARED_IMAGES.azavnia,
      summary: "SaaS multi-rol (admin/prof/cliente) desplegado con Docker y pipelines CI/CD. Monitoreo de estado y métricas en tiempo real.",
      highlights: [
        "Despliegue containerizado con Docker y orquestación para alta disponibilidad",
        "Pipeline CI/CD para build, testing y deploy continuo",
        "Panel de métricas y estado del sistema para diferentes roles (admin, prof, cliente)",
      ],
      challenges: [
        "Dimensionamiento de recursos y optimización de costos cloud",
        "Monitoreo y alertas para detección temprana de anomalías",
        "Diseño de permisos por rol sin duplicar lógica",
      ],
      stack: ["React", "TypeScript", "Docker", "CI/CD", "Tailwind CSS"],
      links: [],
    },
    {
      title: "SC Dental — Gestión Clínica + Landing",
      route: "agenda",
      description: "Ecosistema digital con landing pública y sistema interno de agenda y fichas clínicas, desplegado en Azure con monitoreo de disponibilidad.",
      images: SHARED_IMAGES.scdental,
      summary: "En producción en Azure con administración de recursos, monitoreo de disponibilidad y autenticación con Identity Server.",
      highlights: [
        "Arquitectura sobre Azure con SQL Server y administración de recursos cloud",
        "Monitoreo de disponibilidad y performance del servicio",
        "Autenticación con Identity Server e integración de IA para sugerencias de turnos",
      ],
      challenges: [
        "Administración de costos y dimensionamiento en Azure",
        "Separación entre web pública y sistema interno con seguridad end-to-end",
        "Alta disponibilidad para servicio en producción 24/7",
      ],
      stack: ["Angular", "ASP.NET Core", "SQL Server", "Azure", "Identity Server"],
      links: [{ label: "Ver", href: "https://scdental.com.ar/inicio" }],
    },
    {
      title: "POS/ERP — Ventas, Stock y Cuenta Corriente",
      route: "facturacion",
      description: "Sistema modular completo desplegado y monitoreado en producción. Ventas, caja, stock, proveedores, cuenta corriente, reportes y automatizaciones.",
      images: SHARED_IMAGES.bassino,
      summary: "Desplegado con CI/CD, monitoreado en producción. Automatizaciones con n8n para alertas de stock bajo y sincronización entre módulos.",
      highlights: [
        "Pipeline CI/CD para deploy continuo y rollback rápido",
        "Monitoreo de logs, métricas y alertas sobre el estado del sistema",
        "Automatizaciones con n8n para alertas de stock y sincronización entre módulos",
      ],
      challenges: [
        "Cuenta corriente con pagos FIFO y saldos consistentes",
        "Trazabilidad de cada movimiento y operación sensible",
        "Optimización de queries con DTO projection y AsNoTracking",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "n8n", "QuestPDF"],
      links: [],
    },
    {
      title: "Retail y Gestión de Pedidos",
      route: "retail",
      description: "Solución para gastronomía y retail en uso diario, con foco en performance bajo alto volumen y operación estable en producción.",
      images: SHARED_IMAGES.lnb,
      summary: "Sistema en producción con optimización de queries, índices y performance para operación de alto volumen en comercios reales.",
      highlights: [
        "Optimización de queries e índices para catálogos grandes en producción",
        "Flujos de facturación electrónica e integración de tickets",
        "Soporte técnico y resolución de incidentes minimizando downtime",
      ],
      challenges: [
        "Performance en catálogos grandes (búsqueda, paginado, índices)",
        "Estabilidad del sistema bajo carga real y continua",
        "Integración de impresión/tickets sin fricción",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server"],
      links: [],
    },
    {
      title: "E-commerce — Plataforma de Ventas Online",
      route: "ecommerce",
      description: "Plataforma de comercio electrónico desplegada en AWS con integración de pagos, geolocalización y arquitectura escalable.",
      images: SHARED_IMAGES.ecommerce,
      summary: "Infraestructura en AWS con escalabilidad para alto tráfico. Integración segura con MercadoPago y Google Maps.",
      highlights: [
        "Despliegue y administración de infraestructura en AWS",
        "Integración segura de pagos con MercadoPago",
        "Arquitectura escalable preparada para alto tráfico",
      ],
      challenges: [
        "Dimensionamiento y optimización de recursos en AWS",
        "Seguridad en integración con APIs externas de pago",
        "Sincronización entre catálogo, stock y pedidos en tiempo real",
      ],
      stack: [".NET", "Angular", "AWS", "Docker", "MercadoPago"],
      links: [],
    },
  ],

  experience: [
    {
      company: "Proyectos Propios / Freelance",
      role: "Desarrollador & Administrador de Sistemas",
      period: "2023 — Presente",
      location: "Córdoba, AR",
      bullets: [
        "Administración de infraestructura cloud (Azure, AWS) y on-premise: dimensionamiento, redes, bases de datos y balanceo de carga.",
        "Orquestación de contenedores con Docker y Kubernetes para despliegue, escalado y alta disponibilidad.",
        "Pipelines CI/CD para automatizar build, testing y deploy continuo de 5+ sistemas en producción.",
        "Monitoreo y observabilidad (logs, métricas, alarmas) para detección temprana de anomalías e incidentes.",
        "Gestión de accesos, seguridad de datos y hardening en entornos cloud y on-premise.",
        "Diseño y despliegue de 5+ sistemas con .NET y Angular: POS/ERP, SaaS y e-commerce.",
      ],
      stack: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", ".NET", "Angular"],
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
    { title: "DevOps & Infraestructura", items: ["Kubernetes", "Docker", "CI/CD Pipelines", "Monitoreo & Logs", "Gestión de Accesos", "Incident Response", "Infraestructura On-Premise"] },
    { title: "Cloud", items: ["AWS", "Azure (App Service / SQL / Redis)", "Balanceo de Carga", "Optimización de Costos"] },
    { title: "Backend & Arquitectura", items: ["C#", "ASP.NET Core", "EF Core", "LINQ", "Clean Architecture", "SOLID", "Design Patterns"] },
    { title: "Frontend", items: ["Angular", "React", "TypeScript", "RxJS", "Tailwind CSS"] },
    { title: "Bases de Datos", items: ["SQL Server", "PostgreSQL", "Redis", "Optimización de Queries", "DTO Projection"] },
    { title: "IA & Automatización", items: ["OpenAI API", "Anthropic Claude", "n8n", "LLM Integration", "Prompt Engineering"] },
  ],
};

export const PORTFOLIO_EN: PortfolioData = {
  name: "Mateo Vranych",
  headline: "I manage infrastructure and build the systems that run on it",
  summary:
    "Sysadmin & Developer with 4+ years combining cloud/on-premise infrastructure operations and full-stack development. I manage AWS and Azure environments, orchestrate containers with Docker and Kubernetes, implement CI/CD pipelines, and set up monitoring to ensure availability. My development background gives me a complete view of the application lifecycle — from code to the infrastructure that supports it.",
  location: "Córdoba, Argentina",
  links: SHARED_LINKS,

  ui: {
    nav: { projects: "Projects", experience: "Experience", skills: "Skills", contact: "Contact", cta: "Get in touch", downloadCv: "Download CV", home: "Home", mobileCta: "Let's build something" },
    hero: { viewProjects: "View projects", contact: "Contact" },
    projects: { title: "Projects", subtitle: "Production systems — infrastructure, CI/CD, and performance.", view: "View", whatIDid: "What I did", challenges: "Challenges / decisions", viewDemo: "View demo" },
    experience: { title: "Experience", subtitle: "Cloud infrastructure, development, and teaching." },
    skills: { title: "Skills", subtitle: "Core stack." },
    contact: { title: "Contact", subtitle: "Tell me what you need and I'll get back to you.", name: "Name", namePlaceholder: "Your name", message: "Message", messagePlaceholder: "What infrastructure or system do you need?", sendEmail: "Send Email", sendWhatsapp: "Send via WhatsApp", whatsappTemplate: "Hi Mateo! My name is {name}. {message}. I found you through your portfolio." },
    cvPath: "assets/cv/cv-en.pdf",
  },

  projects: [
    {
      title: "Azavnia — Gym Management System",
      route: "gestion",
      description: "Multi-tenant SaaS platform for fitness centers. Plan, trainer, billing, and metrics management with containerized deployment and CI/CD.",
      images: SHARED_IMAGES.azavnia,
      summary: "Multi-role SaaS (admin/trainer/client) deployed with Docker and CI/CD pipelines. Real-time system status and metrics monitoring.",
      highlights: [
        "Containerized deployment with Docker and orchestration for high availability",
        "CI/CD pipeline for continuous build, testing, and deployment",
        "System metrics and status dashboard for different roles (admin, trainer, client)",
      ],
      challenges: [
        "Resource sizing and cloud cost optimization",
        "Monitoring and alerting for early anomaly detection",
        "Role-based permissions design without duplicating logic",
      ],
      stack: ["React", "TypeScript", "Docker", "CI/CD", "Tailwind CSS"],
      links: [],
    },
    {
      title: "SC Dental — Clinic Management + Landing",
      route: "agenda",
      description: "Digital ecosystem with public landing and internal scheduling and clinical records system, deployed on Azure with availability monitoring.",
      images: SHARED_IMAGES.scdental,
      summary: "In production on Azure with resource administration, availability monitoring, and Identity Server authentication.",
      highlights: [
        "Azure architecture with SQL Server and cloud resource administration",
        "Service availability and performance monitoring",
        "Identity Server authentication and AI integration for scheduling suggestions",
      ],
      challenges: [
        "Cost management and resource sizing on Azure",
        "Public website and internal system separation with end-to-end security",
        "High availability for 24/7 production service",
      ],
      stack: ["Angular", "ASP.NET Core", "SQL Server", "Azure", "Identity Server"],
      links: [{ label: "View", href: "https://scdental.com.ar/inicio" }],
    },
    {
      title: "POS/ERP — Sales, Inventory & Accounts",
      route: "facturacion",
      description: "Complete modular system deployed and monitored in production. Sales, cash register, inventory, suppliers, accounts receivable, reports, and automations.",
      images: SHARED_IMAGES.bassino,
      summary: "Deployed with CI/CD, monitored in production. n8n automations for low-stock alerts and cross-module synchronization.",
      highlights: [
        "CI/CD pipeline for continuous deployment and fast rollback",
        "Log, metrics, and alert monitoring on system health",
        "n8n automations for stock alerts and cross-module sync",
      ],
      challenges: [
        "Accounts receivable with FIFO payments and consistent balances",
        "Full traceability for every movement and sensitive operation",
        "Query optimization with DTO projection and AsNoTracking",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "n8n", "QuestPDF"],
      links: [],
    },
    {
      title: "Retail & Order Management",
      route: "retail",
      description: "Solution for food service and retail in daily use, focused on performance under high volume and stable production operations.",
      images: SHARED_IMAGES.lnb,
      summary: "Production system with query optimization, indexing, and performance tuning for high-volume operations in real businesses.",
      highlights: [
        "Query and index optimization for large production catalogs",
        "Electronic invoicing flows and ticket integration",
        "Technical support and incident resolution minimizing downtime",
      ],
      challenges: [
        "Performance on large catalogs (search, pagination, indexing)",
        "System stability under real and continuous load",
        "Frictionless printing/ticket integration",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server"],
      links: [],
    },
    {
      title: "E-commerce — Online Sales Platform",
      route: "ecommerce",
      description: "E-commerce platform deployed on AWS with payment integration, geolocation, and scalable architecture.",
      images: SHARED_IMAGES.ecommerce,
      summary: "AWS infrastructure with scalability for high traffic. Secure integration with MercadoPago and Google Maps.",
      highlights: [
        "AWS infrastructure deployment and administration",
        "Secure payment integration with MercadoPago",
        "Scalable architecture ready for high traffic",
      ],
      challenges: [
        "Resource sizing and optimization on AWS",
        "Security in external payment API integration",
        "Real-time synchronization between catalog, inventory, and orders",
      ],
      stack: [".NET", "Angular", "AWS", "Docker", "MercadoPago"],
      links: [],
    },
  ],

  experience: [
    {
      company: "Own Projects / Freelance",
      role: "Developer & Systems Administrator",
      period: "2023 — Present",
      location: "Córdoba, AR",
      bullets: [
        "Cloud (Azure, AWS) and on-premise infrastructure administration: sizing, networking, databases, and load balancing.",
        "Container orchestration with Docker and Kubernetes for deployment, scaling, and high availability.",
        "CI/CD pipelines to automate build, testing, and continuous deployment of 5+ production systems.",
        "Monitoring and observability (logs, metrics, alerts) for early anomaly and incident detection.",
        "Access management, data security, and system hardening across cloud and on-premise environments.",
        "Design and deployment of 5+ systems with .NET and Angular: POS/ERP, SaaS, and e-commerce.",
      ],
      stack: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", ".NET", "Angular"],
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
    { title: "DevOps & Infrastructure", items: ["Kubernetes", "Docker", "CI/CD Pipelines", "Monitoring & Logs", "Access Management", "Incident Response", "On-Premise Infrastructure"] },
    { title: "Cloud", items: ["AWS", "Azure (App Service / SQL / Redis)", "Load Balancing", "Cost Optimization"] },
    { title: "Backend & Architecture", items: ["C#", "ASP.NET Core", "EF Core", "LINQ", "Clean Architecture", "SOLID", "Design Patterns"] },
    { title: "Frontend", items: ["Angular", "React", "TypeScript", "RxJS", "Tailwind CSS"] },
    { title: "Databases", items: ["SQL Server", "PostgreSQL", "Redis", "Query Optimization", "DTO Projection"] },
    { title: "AI & Automation", items: ["OpenAI API", "Anthropic Claude", "n8n", "LLM Integration", "Prompt Engineering"] },
  ],
};

export const PORTFOLIO = PORTFOLIO_ES;

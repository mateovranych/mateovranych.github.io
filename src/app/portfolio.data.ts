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
    projects: { title: "Proyectos", subtitle: "Sistemas en producción · .NET, Angular y arquitectura escalable.", view: "Ver", whatIDid: "Qué hice", challenges: "Retos / decisiones", viewDemo: "Ver demo" },
    experience: { title: "Experiencia", subtitle: "Desarrollo full-stack, arquitectura y docencia." },
    skills: { title: "Habilidades", subtitle: "Stack principal." },
    contact: { title: "Contacto", subtitle: "Contame qué necesitás y te respondo por WhatsApp.", name: "Nombre", namePlaceholder: "Tu nombre", message: "Mensaje", messagePlaceholder: "¿Qué sistema o aplicación necesitás?", sendEmail: "Enviar por Email", sendWhatsapp: "Enviar por WhatsApp", whatsappTemplate: "Hola Mateo! Mi nombre es {name}. {message}. Vengo desde tu portfolio." },
    cvPath: "assets/cv/cv.pdf",
  },

  projects: [
    {
      title: "Azavnia · Sistema de Gimnasios",
      route: "gestion",
      description: "Sistema de gestión y control de acceso para gimnasio y natación. Acceso por DNI con apertura de molinete, asistencias en tiempo real, clientes y pases. Angular + ASP.NET Core corriendo on-premise.",
      images: SHARED_IMAGES.azavnia,
      summary: "Control de acceso por DNI con apertura de molinete y registro de ingresos en tiempo real (SignalR). Corre como servicio de Windows on-premise con base SQLite.",
      highlights: [
        "Control de acceso por DNI con apertura de molinete/torniquete vía puerto serie (System.IO.Ports)",
        "Historial de asistencias en tiempo real (SignalR), gestión de clientes, tipos de pase y vencimientos",
        "Exportación a Excel (ClosedXML) y reportes en PDF (QuestPDF); autenticación con ASP.NET Identity + JWT",
      ],
      challenges: [
        "Integración con hardware de acceso (molinete) a través del puerto serie",
        "Operación on-premise confiable como servicio de Windows con base SQLite",
        "Sincronización de ingresos en tiempo real entre la terminal de acceso y el panel de administración",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQLite", "SignalR"],
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
      title: "Agenda Peluquería · SaaS de Turnos",
      description: "Plataforma SaaS multi-tenant de gestión de turnos para peluquerías y negocios por cita, con agenda, clientes, pagos y recordatorios. Angular + ASP.NET Core sobre PostgreSQL. En producción.",
      images: [],
      summary: "Agenda con calendario interactivo (FullCalendar), gestión de clientes y pagos, y recordatorios automáticos por WhatsApp. Multi-tenant con planes por cliente.",
      highlights: [
        "Agenda de turnos con calendario interactivo (FullCalendar) y tipos de servicio",
        "Gestión de clientes, pagos y reportes (QuestPDF / Excel)",
        "Recordatorios y mensajería automática por WhatsApp (webhooks)",
      ],
      challenges: [
        "Arquitectura multi-tenant con planes por cliente (tenant) y aislamiento de datos",
        "Autenticación con ASP.NET Identity + JWT y autorización por roles",
        "Integración de WhatsApp (webhooks) para recordatorios de turnos",
      ],
      stack: ["Angular", "ASP.NET Core", "PostgreSQL", "FullCalendar", "Identity + JWT"],
      links: [],
    },
    {
      title: "POS/ERP · Ventas, Stock y Cuenta Corriente",
      route: "facturacion",
      description: "Sistema de gestión comercial con facturación electrónica AFIP, ventas, stock, cuenta corriente, presupuestos y listas de precios. Angular + ASP.NET Core sobre SQL Server.",
      images: SHARED_IMAGES.bassino,
      summary: "Facturación electrónica AFIP (CAE) con firma de certificados, cuenta corriente con recibos FIFO y reportes. Tiempo real con SignalR y monitoreo con Prometheus/Grafana.",
      highlights: [
        "Facturación electrónica AFIP (WSFE/CAE) con firma de certificados y notas de crédito",
        "Cuenta corriente con pagos FIFO, recibos, presupuestos y múltiples listas de precios",
        "Exportación PDF (QuestPDF) y Excel (ClosedXML), auditoría y tiempo real con SignalR",
      ],
      challenges: [
        "Integración SOAP con AFIP (WSFE) y firma digital de comprobantes (PKCS)",
        "Snapshot de datos fiscales en la factura para integridad histórica",
        "Monitoreo en producción con Prometheus y Grafana",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "SignalR", "AFIP", "Docker"],
      links: [],
    },
    {
      title: "Retail y Gestión de Pedidos",
      route: "retail",
      description: "Sistema integral para comercio/almacén (La Nueva Bodega): ventas, caja, stock, facturación AFIP e integración con posnet Clover. Angular + ASP.NET Core sobre SQL Server.",
      images: SHARED_IMAGES.lnb,
      summary: "Punto de venta con integración posnet Clover (Cloud Pay Display y QR), impresión térmica de tickets (ESC/POS) y sincronización con base legacy. Tiempo real con SignalR.",
      highlights: [
        "Integración de pagos con posnet Clover: librería cliente propia y agente local con descubrimiento de dispositivos y comunicación mTLS",
        "Punto de venta con caja, stock, facturación AFIP, notas de crédito e impresión térmica de tickets (ESC/POS en impresoras Epson)",
        "Reportes, roles/permisos, auditoría e integración con base de datos legacy (MoviSql)",
      ],
      challenges: [
        "Comunicación segura (mTLS) con terminales Clover a través de un agente local",
        "Impresión térmica de tickets con ESC/POS en impresoras Epson",
        "Integración con una base de datos legacy preexistente sin interrumpir la operación",
      ],
      stack: ["Angular", "ASP.NET Core", "SQL Server", "Clover", "SignalR", "ESC/POS", "Epson"],
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
    {
      title: "Idade de Ouro · Automatizaciones",
      description: "Automatización de procesos para Idade de Ouro, un servicio de Prevención de Riesgos Laborales (PRL) en España: escaneo de correos de Gmail, distribución de personal con Odoo y un dashboard interactivo de seguimiento.",
      images: [],
      summary: "Flujos que leen y clasifican correos de Gmail, automatizan la distribución de personal en Odoo y exponen todo en un dashboard interactivo en tiempo real.",
      highlights: [
        "Escaneo y clasificación automática de correos de Gmail",
        "Distribución y gestión de personal integrada con Odoo",
        "Dashboard interactivo para monitorear los procesos y métricas en tiempo real",
      ],
      challenges: [
        "Integración con la API de Gmail para lectura y procesamiento de correos",
        "Automatización de la asignación de personal en Odoo",
        "Visualización en tiempo real del estado de las automatizaciones",
      ],
      stack: ["n8n", "Odoo", "Gmail API", "React"],
      links: [],
    },
    {
      title: "Sistema Panadería · POS con Balanza",
      description: "Punto de venta para panadería con integración de balanza Systel Cuora Max: lectura de etiquetas de pesaje, productos a granel por kg, caja, stock e impresión de tickets. Angular + ASP.NET Core sobre PostgreSQL.",
      images: [],
      summary: "Decodifica las etiquetas EAN-13 de la balanza Systel Cuora Max para cargar productos a granel (peso × precio/kg) directo a la venta. Caja ágil por teclado, tickets ESC/POS y gráficos en tiempo real.",
      highlights: [
        "Integración con balanza Systel Cuora Max: decodificación de EAN-13 de pesaje (PLU + gramos) para agregar productos a granel a la venta",
        "Punto de venta con caja optimizada por teclado, stock e impresión térmica de tickets (ESC/POS en impresoras Xprinter)",
        "Gráficos y métricas con Chart.js, tiempo real con SignalR y exportación a Excel",
      ],
      challenges: [
        "Decodificación de códigos EAN-13 de balanza (prefijo, PLU y peso en gramos) y cálculo del subtotal por kg",
        "Flujo de caja rápido operable 100% por teclado para alto volumen",
        "Impresión térmica de tickets con ESC/POS en impresoras Xprinter",
      ],
      stack: ["Angular", "ASP.NET Core", "PostgreSQL", "PrimeNG", "SignalR", "Cuora Max", "Xprinter"],
      links: [],
    },
  ],

  experience: [
    {
      company: "Proyectos Propios / Freelance",
      role: "Full Stack Developer",
      period: "2023 · Presente",
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
      role: "Profesor · Programación III e Ingeniería de Software",
      period: "2026 · Presente",
      location: "Córdoba, AR",
      bullets: [
        "Dictado de desarrollo full stack con ASP.NET Core y Angular: APIs REST, arquitectura en capas, Entity Framework Core, LINQ e inyección de dependencias.",
        "Seguridad de aplicaciones web: autenticación con JWT y BCrypt, autorización por roles, interceptors, guards, middleware y CORS.",
        "Patrones aplicados de producción: paginación y filtrado server-side, manejo global de errores, programación asíncrona y componentes standalone.",
        "Elaboración de material propio (apuntes técnicos y evaluaciones) que conecta cada concepto de backend con su equivalente en frontend.",
      ],
      stack: ["ASP.NET Core", "Angular", "EF Core", "JWT", "Seguridad Web"],
    },
    {
      company: "No Country",
      role: "Backend Developer · Simulación laboral",
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
    projects: { title: "Projects", subtitle: "Production systems · .NET, Angular, and scalable architecture.", view: "View", whatIDid: "What I did", challenges: "Challenges / decisions", viewDemo: "View demo" },
    experience: { title: "Experience", subtitle: "Full-stack development, architecture, and teaching." },
    skills: { title: "Skills", subtitle: "Core stack." },
    contact: { title: "Contact", subtitle: "Tell me what you need and I'll get back to you.", name: "Name", namePlaceholder: "Your name", message: "Message", messagePlaceholder: "What system or app do you need?", sendEmail: "Send Email", sendWhatsapp: "Send via WhatsApp", whatsappTemplate: "Hi Mateo! My name is {name}. {message}. I found you through your portfolio." },
    cvPath: "assets/cv/cv-en.pdf",
  },

  projects: [
    {
      title: "Azavnia · Gym Management System",
      route: "gestion",
      description: "Management and access control system for a gym and swimming facility. DNI access with turnstile control, real-time attendance, clients, and passes. Angular + ASP.NET Core running on-premise.",
      images: SHARED_IMAGES.azavnia,
      summary: "DNI access control with turnstile opening and real-time check-in logging (SignalR). Runs as an on-premise Windows Service with a SQLite database.",
      highlights: [
        "DNI access control with turnstile opening over serial port (System.IO.Ports)",
        "Real-time attendance history (SignalR), client, pass type, and expiration management",
        "Excel export (ClosedXML) and PDF reports (QuestPDF); authentication with ASP.NET Identity + JWT",
      ],
      challenges: [
        "Access hardware (turnstile) integration over the serial port",
        "Reliable on-premise operation as a Windows Service with a SQLite database",
        "Real-time check-in sync between the access terminal and the admin panel",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQLite", "SignalR"],
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
      title: "Agenda Peluquería · SaaS Scheduling",
      description: "Multi-tenant SaaS scheduling platform for salons and appointment-based businesses, with calendar, clients, payments, and reminders. Angular + ASP.NET Core on PostgreSQL. In production.",
      images: [],
      summary: "Scheduling with an interactive calendar (FullCalendar), client and payment management, and automatic WhatsApp reminders. Multi-tenant with per-client plans.",
      highlights: [
        "Appointment scheduling with an interactive calendar (FullCalendar) and service types",
        "Client, payment, and reporting management (QuestPDF / Excel)",
        "Automatic WhatsApp reminders and messaging (webhooks)",
      ],
      challenges: [
        "Multi-tenant architecture with per-tenant plans and data isolation",
        "Authentication with ASP.NET Identity + JWT and role-based authorization",
        "WhatsApp integration (webhooks) for appointment reminders",
      ],
      stack: ["Angular", "ASP.NET Core", "PostgreSQL", "FullCalendar", "Identity + JWT"],
      links: [],
    },
    {
      title: "POS/ERP · Sales, Inventory & Accounts",
      route: "facturacion",
      description: "Business management system with AFIP electronic invoicing, sales, inventory, accounts receivable, quotes, and price lists. Angular + ASP.NET Core on SQL Server.",
      images: SHARED_IMAGES.bassino,
      summary: "AFIP electronic invoicing (CAE) with certificate signing, accounts receivable with FIFO receipts and reporting. Real-time with SignalR and monitoring with Prometheus/Grafana.",
      highlights: [
        "AFIP electronic invoicing (WSFE/CAE) with certificate signing and credit notes",
        "Accounts receivable with FIFO payments, receipts, quotes, and multiple price lists",
        "PDF (QuestPDF) and Excel (ClosedXML) exports, audit logging, and real-time updates with SignalR",
      ],
      challenges: [
        "SOAP integration with AFIP (WSFE) and digital signing of invoices (PKCS)",
        "Fiscal-data snapshot on the invoice for historical integrity",
        "Production monitoring with Prometheus and Grafana",
      ],
      stack: ["Angular", "ASP.NET Core", "EF Core", "SQL Server", "SignalR", "AFIP", "Docker"],
      links: [],
    },
    {
      title: "Retail & Order Management",
      route: "retail",
      description: "End-to-end system for retail/grocery (La Nueva Bodega): sales, cash register, inventory, AFIP invoicing, and Clover POS integration. Angular + ASP.NET Core on SQL Server.",
      images: SHARED_IMAGES.lnb,
      summary: "Point of sale with Clover POS integration (Cloud Pay Display and QR), thermal ticket printing (ESC/POS), and legacy-database sync. Real-time with SignalR.",
      highlights: [
        "Payment integration with Clover POS: a custom client library and a local agent with device discovery and mTLS communication",
        "Point of sale with cash register, inventory, AFIP invoicing, credit notes, and thermal ticket printing (ESC/POS on Epson printers)",
        "Reporting, roles/permissions, audit logging, and integration with a legacy database (MoviSql)",
      ],
      challenges: [
        "Secure (mTLS) communication with Clover terminals through a local agent",
        "Thermal ticket printing with ESC/POS on Epson printers",
        "Integrating with a pre-existing legacy database without disrupting operations",
      ],
      stack: ["Angular", "ASP.NET Core", "SQL Server", "Clover", "SignalR", "ESC/POS", "Epson"],
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
    {
      title: "Idade de Ouro · Automations",
      description: "Process automation for Idade de Ouro, an occupational risk prevention (PRL) company in Spain: Gmail inbox scanning, staff distribution with Odoo, and an interactive monitoring dashboard.",
      images: [],
      summary: "Workflows that read and classify Gmail emails, automate staff distribution in Odoo, and surface everything in a real-time interactive dashboard.",
      highlights: [
        "Automatic scanning and classification of Gmail emails",
        "Staff distribution and management integrated with Odoo",
        "Interactive dashboard to monitor processes and metrics in real time",
      ],
      challenges: [
        "Gmail API integration for reading and processing emails",
        "Automating staff assignment in Odoo",
        "Real-time visualization of automation status",
      ],
      stack: ["n8n", "Odoo", "Gmail API", "React"],
      links: [],
    },
    {
      title: "Bakery POS · Scale Integration",
      description: "Point of sale for a bakery with Systel Cuora Max scale integration: weighing-label scanning, bulk products by kg, cash register, inventory, and ticket printing. Angular + ASP.NET Core on PostgreSQL.",
      images: [],
      summary: "Decodes the Systel Cuora Max scale's EAN-13 labels to add bulk products (weight × price/kg) straight to the sale. Keyboard-driven cash register, ESC/POS tickets, and real-time charts.",
      highlights: [
        "Systel Cuora Max scale integration: EAN-13 weighing-label decoding (PLU + grams) to add bulk products to the sale",
        "Point of sale with keyboard-optimized cash register, inventory, and thermal ticket printing (ESC/POS on Xprinter printers)",
        "Charts and metrics with Chart.js, real-time updates with SignalR, and Excel export",
      ],
      challenges: [
        "Decoding scale EAN-13 barcodes (prefix, PLU, and weight in grams) and computing the per-kg subtotal",
        "Fast, fully keyboard-operable checkout flow for high volume",
        "Thermal ticket printing with ESC/POS on Xprinter printers",
      ],
      stack: ["Angular", "ASP.NET Core", "PostgreSQL", "PrimeNG", "SignalR", "Cuora Max", "Xprinter"],
      links: [],
    },
  ],

  experience: [
    {
      company: "Own Projects / Freelance",
      role: "Full Stack Developer",
      period: "2023 · Present",
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
      role: "Professor · Programming III & Software Engineering",
      period: "2026 · Present",
      location: "Córdoba, AR",
      bullets: [
        "Teaching full-stack development with ASP.NET Core and Angular: REST APIs, layered architecture, Entity Framework Core, LINQ, and dependency injection.",
        "Web application security: authentication with JWT and BCrypt, role-based authorization, interceptors, guards, middleware, and CORS.",
        "Production-grade patterns: server-side pagination and filtering, global error handling, asynchronous programming, and standalone components.",
        "Authoring my own material (technical notes and assessments) connecting each backend concept with its frontend equivalent.",
      ],
      stack: ["ASP.NET Core", "Angular", "EF Core", "JWT", "Web Security"],
    },
    {
      company: "No Country",
      role: "Backend Developer · Lab Simulation",
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

export type Link = { label: string; href: string };

export interface Project {
  title: string;
  route?:string;
  description: string;
  images: string[];
  summary?: string;
  highlights: string[];
  challenges?: string[];
  stack: string[];
  links: Link[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  stack: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface UILabels {
  nav: { projects: string; experience: string; skills: string; contact: string; cta: string; downloadCv: string; home: string; mobileCta: string };
  hero: { viewProjects: string; contact: string };
  projects: { title: string; subtitle: string; view: string; whatIDid: string; challenges: string; viewDemo: string };
  experience: { title: string; subtitle: string };
  skills: { title: string; subtitle: string };
  contact: { title: string; subtitle: string; name: string; namePlaceholder: string; message: string; messagePlaceholder: string; sendEmail: string; sendWhatsapp: string; whatsappTemplate: string };
  cvPath: string;
}

export interface PortfolioData {
  name: string;
  headline: string;
  summary: string;
  location: string;
  links: Link[];
  projects: Project[];
  experience: Experience[];
  skills: SkillGroup[];
  ui: UILabels;
}
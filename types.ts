export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  period: string;
  achievements: string[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email';
  url: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  gpa?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date?: string;
}

export interface UILabels {
  available: string;
  intro: string;
  capabilities: string;
  technical: string;
  coreStack: string;
  current: string;
  works: string;
  experience: string;
  academics: string;
  education: string;
  certifications: string;
  contact: string;
  footer: string;
  nav: {
    about: string;
    projects: string;
    experience: string;
    contact: string;
  }
}

export interface PortfolioContent {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    brandLogo?: string;
  };
  summary: string;
  skills: string[];
  currentlyLearning: string[];
  projects: Project[];
  experience: Experience[];
  education: EducationItem[];
  certifications: CertificationItem[];
  social: SocialLink[];
  labels: UILabels;
}

export interface PortfolioData {
  en: PortfolioContent;
  id: PortfolioContent;
}
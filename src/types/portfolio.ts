export interface NavItem {
  label: string;
  href: string;
}

export interface CtaButton {
  text: string;
  href: string;
  variant: 'primary' | 'outline' | 'secondary';
}

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  email?: string;
  location?: string;
  ctaButtons: CtaButton[];
}

export interface AboutSectionPart {
  title: string;
  content: string[];
}

export interface AboutData {
  title: string;
  subtitle: string;
  sections: AboutSectionPart[];
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface ContactFormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  rows?: number;
}

export interface ContactData {
  title: string;
  subtitle: string;
  formFields: ContactFormField[];
  submitButtonText: string;
  successMessage: string;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

export interface FooterData {
  author: string;
  tagline: string;
  socialLinks: SocialLink[];
  copyright: string;
}

export interface PortfolioData {
  meta: {
    title: string;
    version: string;
    language: string;
    lastUpdated?: string;
  };
  navigation: NavItem[];
  profile: Profile;
  about: AboutData;
  skills: SkillItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  contact: ContactData;
  footer: FooterData;
}

export interface JsonResume {
  $schema?: string;
  basics: {
    name: string;
    label: string;
    image?: string;
    email: string;
    phone?: string;
    url?: string;
    summary: string;
    location?: {
      city?: string;
      countryCode?: string;
      region?: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  education: Array<{
    institution: string;
    url?: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score?: string;
    courses?: string[];
    description?: string;
  }>;
  skills: Array<{
    name: string;
    level?: string;
    keywords: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    highlights?: string[];
    keywords: string[];
    roles?: string[];
    url?: string;
  }>;
}

export interface DomAstNode {
  type: 'element' | 'text' | 'comment';
  tagName?: string;
  attributes?: Record<string, string>;
  textContent?: string;
  children?: DomAstNode[];
}

export interface ContentBlock {
  id: string;
  type: 'navigation' | 'hero' | 'about' | 'skills' | 'education' | 'projects' | 'contact' | 'footer';
  title?: string;
  data: Record<string, unknown>;
}

export type ExportFormat = 'portfolio-schema' | 'json-resume' | 'headless-blocks' | 'dom-ast';

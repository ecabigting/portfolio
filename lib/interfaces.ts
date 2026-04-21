import { PortableTextBlock } from "next-sanity";

export interface SiteSettings {
  mainTitle: string | null;
  subTitle: string | null,
  profileImage: {
    url: string | null;
    assetId: string | null;
    crop: { top: number; bottom: number; left: number; right: number } | null;
    hotspot: { x: number; y: number; height: number; width: number } | null;
    dimensions: { width: number; height: number } | null;
  } | null;
  aboutMe: string | null;
  location: string | null;
  currentStatus: 'open-to-work' | 'open-to-freelance' | 'open-to-fulltime' | 'not-available' | null;
  email: string | null;
  phone: string | null;
  experienceBanner: string | null,
  cvLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  skills: string[] | null;
  certifications: Array<{
    title: string | null;
    issuingBody: string | null;
    location: string | null;
  }> | null;
  experience: Array<{
    role: string | null;
    company: string | null;
    location: string | null;
    companyUrl: string | null
  }> | null;
  socialLinks: Array<{
    platform: string | null;
    url: string | null;
  }> | null;
}

export interface FooterContent {
  location: string | null;
  email: string | null;
  phone: string | null;
  cvLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  year: string | null;
  recentPosts: Array<{
    title: string | null;
    slug: string | null;
  }>;
}

export interface Project {
  _id: string;
  title: string | null;
  featured: boolean | null;
  date: string | null;
  role: string | null;
  technologies: string[] | null;
  company: string | null;
  description: string | null;
  projectType: string | null;
  link: string | null;
  tags: string[] | null;
}

export interface FooterContent {
  location: string | null;
  currentStatus: string | null;
  email: string | null;
  phone: string | null;
  cvLink: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  year: string | null;
}

export interface BlogPost {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage: string | null;
  categories: Array<{ title: string | null }> | null;
}

export interface BlogPostListItem {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  body: PortableTextBlock[] | null;
}

export interface Post {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage: string | null;
  body: PortableTextBlock[] | null;
  categories: Array<{ title: string | null }> | null;
  author: { name: string | null } | null;
}

export type CodeBlock = {
  _type: 'code';
  language?: string;
  code: string;
  _highlightedHtml?: string;
}

export interface RelatedPost {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  mainImage: string | null;
  categories: Array<{ title: string | null }> | null;
}


import imageUrlBuilder from '@sanity/image-url'

import { createHighlighter } from 'shiki';

import { createClient, type PortableTextBlock } from "next-sanity";
import { cacheLife } from "next/cache";
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-01-05',
  useCdn: false,
});
// Define the interface based on your siteSettings schema
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
/**
 * Reusable function to fetch site settings.
 * Can be called from any Server Component.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "siteSettings"][0]{
    mainTitle,
    subTitle,
    "profileImage": {
    "url": profileImage.asset->url,
    "assetId": profileImage.asset._ref,
    "crop": profileImage.crop,
    "hotspot": profileImage.hotspot,
    "dimensions": profileImage.asset->metadata.dimensions
    },
    "experienceBanner": experienceBanner.asset->url,
    aboutMe,
    location,
    currentStatus,
    email,
    phone,
    cvLink,
    githubLink,
    linkedinLink,
    "certifications": certifications[]{
      title,
      issuingBody,
      location
    },
    "experience": experience[]{
      role,
      company,
      location,
      companyUrl
    },
    "socialLinks": socialLinks[]{
      platform,
      url
    }
  }`;
  const data = await client.fetch(query);
  // Final Safety Check: Return a base object if the document itself is missing
  return data || {
    mainTitle: null,
    subTitle: null,
    profileImage: null,
    aboutMe: null,
    location: null,
    currentStatus: null,
    email: null,
    phone: null,
    cvLink: null,
    githubLink: null,
    linkedinLink: null,
    skills: [],
    certifications: [],
    experience: [],
    socialLinks: [],
    experienceBanner: null
  };
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

export async function getFooterContent(): Promise<FooterContent> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "siteSettings"][0]{
    location,
    email,
    phone,
    cvLink,
    githubLink,
    linkedinLink,
    "year": now(),
    "recentPosts": *[_type == "post"] | order(_createdAt desc) [0...10] {
      "title": title,
      "slug": slug.current
    }
  }`;
  const footerData = await client.fetch(query);
  console.log('[DEBUG] getFooterContent:', JSON.stringify(footerData, (k, v) => k === 'recentPosts' ? `[${v?.length || 0} items]` : v, 2))
  return footerData || {
    location: null,
    email: null,
    phone: null,
    cvLink: null,
    githubLink: null,
    linkedinLink: null,
    year: null,
    recentPosts: []
  };
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

// Get footer for lazy loading (called from server action)
export async function getFooter(): Promise<FooterContent | null> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "siteSettings"][0]{
    location,
    currentStatus,
    email,
    phone,
    cvLink,
    githubLink,
    linkedinLink,
    "year": now(),
    "recentPosts": *[_type == "post"] | order(_createdAt desc) [0...10] {
      "title": title,
      "slug": slug.current
    }
  }`;
  const data = await client.fetch(query);
  return data || null;
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

// Get skills for lazy loading (called from server action)
export async function getSkills(): Promise<string[]> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "siteSettings"][0].skills`
  const data = await client.fetch(query)
  return data || []
}

export async function getProjects(): Promise<Project[]> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "project"] | order(date desc) {
    _id,
    title,
    featured,
    date,
    role,
    technologies,
    company,
    description,
    projectType,
    link,
    tags
  }`;
  const data = await client.fetch(query);
  return data || [];
}


// Blog post for home page cards
export interface BlogPost {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage: string | null;
  categories: Array<{ title: string | null }> | null;
}
// Get recent posts for home page
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "post" && featured == true ] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    "excerpt": excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{ title }
  }`;
  const data = await client.fetch(query);
  return data || [];
}
// Blog list item (for pagination)
export interface BlogPostListItem {
  _id: string;
  title: string | null;
  slug: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  body: PortableTextBlock[] | null;
}
// Get total blog post count
export async function getBlogPostCount(): Promise<number> {
  'use cache'
  cacheLife('hours')
  const query = `count(*[_type == "post"])`;
  const result = await client.fetch(query);
  return typeof result === 'number' ? result : 0;
}
// Get paginated blog posts
export async function getPaginatedBlogPosts(page: number = 1, limit: number = 10): Promise<BlogPostListItem[]> {
  'use cache'
  cacheLife('hours')
  const start = (page - 1) * limit;
  const query = `*[_type == "post"] | order(publishedAt desc) [${start}...${start + limit}] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body
  }`;
  const data = await client.fetch(query);
  return data || [];
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

type CodeBlock = {
  _type: 'code';
  language?: string;
  code: string;
  _highlightedHtml?: string;
};

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    body,
    "categories": categories[]->{ title },
    "author": author->{ name }
  }`;
  const data = await client.fetch(query, { slug });
if (data?.body) {
    // Initialize Shiki highlighter with both themes for dark/light mode
    const highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['javascript', 'typescript', 'python', 'go', 'rust', 'bash', 'json', 'css', 'html', 'jsx']
    });
    
    // Map Sanity language names to Shiki language IDs
    const langMap: Record<string, string> = {
      javascript: 'javascript',
      js: 'javascript',
      typescript: 'typescript',
      ts: 'typescript',
      python: 'python',
      py: 'python',
      go: 'go',
      golang: 'go',
      rust: 'rust',
      rs: 'rust',
      bash: 'bash',
      sh: 'bash',
      shell: 'bash',
      json: 'json',
      css: 'css',
      html: 'html',
      jsx: 'jsx',
      text: 'text',
      plaintext: 'text'
    };
    
    data.body = data.body.map((block: CodeBlock) => {
      if (block._type === 'code' && block.code) {
        const rawLang = block.language?.toLowerCase() || 'text';
        const lang = langMap[rawLang] || 'text';
        try {
          // Generate both light and dark theme HTML with data-theme attributes
          const darkHtml = highlighter.codeToHtml(block.code, { lang, theme: 'github-dark' });
          const lightHtml = highlighter.codeToHtml(block.code, { lang, theme: 'github-light' });
          block._highlightedHtml = `<div data-theme="dark">${darkHtml}</div><div data-theme="light" class="hidden">${lightHtml}</div>`;
        } catch {
          block._highlightedHtml = block.code.replace(/[&<]/g, (c: string): string => c === '&' ? '&amp;' : '&lt;');
        }
      }
      return block;
    });
  }
  return data || null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "post"]{ "slug": slug.current }`;
  const data = await client.fetch(query);
  return data.map((post: { slug: string | null }) => post.slug).filter(Boolean) as string[];
}

const builder = imageUrlBuilder(client)

export function getCroppedProfileImageUrl(image: SiteSettings['profileImage']): string | null {
  if (!image?.url || !image.crop || !image.assetId) {
    return image?.url ?? null
  }
  const { width, height } = image.dimensions || { width: 1000, height: 1000 }
  const { top, bottom, left, right } = image.crop

  return builder
    .image({
      _type: 'image',
      asset: { _ref: image.assetId },
    })
    .rect(
      Math.round(left * width),
      Math.round(top * height),
      Math.round((1 - left - right) * width),
      Math.round((1 - top - bottom) * height)
    )
    .url()
}

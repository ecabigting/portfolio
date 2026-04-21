import imageUrlBuilder from '@sanity/image-url'
import { createHighlighter } from 'shiki';
import { createClient } from "next-sanity";
import { cacheLife } from "next/cache";
import { Project, BlogPost, BlogPostListItem, CodeBlock, FooterContent, Post, RelatedPost, SiteSettings } from './interfaces';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-01-05',
  useCdn: false,
});

const builder = imageUrlBuilder(client)

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
    "recentPosts": *[_type == "post" && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) [0...10] {
      "title": title,
      "slug": slug.current
    }
  }`;
  const footerData = await client.fetch(query);
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
    "recentPosts": *[_type == "post" && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) [0...10] {
      "title": title,
      "slug": slug.current
    }
  }`;
  const data = await client.fetch(query);
  return data || null;
}

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

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "post" && featured == true && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    "excerpt": excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{ title },
    "todayIsNow": now()
  }`;
  const data = await client.fetch(query, { limit });
  return (data || []);
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<RelatedPost[]> {
  'use cache'
  cacheLife('hours')
  const query = `*[_type == "post" && featured == true && slug.current != $currentSlug && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{ title }
  }`;
  const data = await client.fetch(query, { currentSlug, limit });
  return (data || []);
}

export async function getBlogPostCount(): Promise<number> {
  'use cache'
  cacheLife('hours')
  const query = `count(*[_type == "post" && dateTime(publishedAt) <= dateTime(now())])`;
  const data = await client.fetch(query);
  return data || 0;
}

export async function getPaginatedBlogPosts(page: number = 1, limit: number = 10): Promise<BlogPostListItem[]> {
  'use cache'
  cacheLife('hours')
  const start = (page - 1) * limit;
  const end = start + limit;
  const query = `*[_type == "post" && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) [${start}...${end}] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body
  }`;
  const data = await client.fetch(query);
  return (data || []);
}

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
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "alt": alt
      }
    },
    "categories": categories[]->{ title },
    "author": author->{ name }
  }`;
  const data = await client.fetch(query, { slug });
  if (data?.body) {
    const highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['javascript', 'typescript', 'python', 'go', 'rust', 'bash', 'json', 'css', 'html', 'jsx', 'cpp', 'c', 'scss', 'sql', 'tsx', 'xml', 'yaml', 'csharp', 'java', 'markdown', 'php', 'ruby', 'sass', 'text']
    });
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
      terminal: 'bash',
      batchfile: 'bash',
      json: 'json',
      css: 'css',
      scss: 'scss',
      sass: 'scss',
      html: 'html',
      jsx: 'jsx',
      tsx: 'tsx',
      xml: 'xml',
      yaml: 'yaml',
      sql: 'sql',
      mysql: 'sql',
      csharp: 'csharp',
      CSHARP: 'csharp',
      c: 'c',
      'c++': 'cpp',
      cpp: 'cpp',
      java: 'java',
      ruby: 'ruby',
      php: 'php',
      markdown: 'markdown',
      text: 'text',
      plaintext: 'text',
      'Plain text': 'text'
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
          block._highlightedHtml = block.code.replace(/[&<]/g, (c: string): string => c === '&' ? '&' : '<');
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
  const query = `*[_type == "post" && dateTime(publishedAt) <= dateTime(now())]{ "slug": slug.current }`;
  const data = await client.fetch(query);
  return data.map((post: { slug: string | null }) => post.slug).filter(Boolean) as string[];
}


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

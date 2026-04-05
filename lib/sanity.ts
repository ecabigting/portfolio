import { createClient } from "next-sanity";
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-01-05',
  useCdn: false,
});
// Define the interface based on your siteSettings schema
export interface SiteSettings {
  mainTitle: string | null;
  subTitle: string | null;
  profileImage: string | null; // Projected to URL string
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
  const query = `*[_type == "siteSettings"][0]{
    mainTitle,
    subTitle,
    "profileImage": profileImage.asset->url,
    "experienceBanner": experienceBanner.asset->url,
    aboutMe,
    location,
    currentStatus,
    email,
    phone,
    cvLink,
    githubLink,
    linkedinLink,
    skills,
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

export interface Project {
  title: string | null;
  link: string | null;
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(date desc) {
    title,
    link
  }`;
  const data = await client.fetch(query);
  return data || [];
}

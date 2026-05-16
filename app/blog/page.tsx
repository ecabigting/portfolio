import { getPaginatedBlogPosts, getBlogPostCount, getSiteSettings } from "@/lib/sanity";
import BlogList from "@/components/blogPage/BlogList";
import Pagination from "@/components/blogPage/Pagination";
import { Metadata } from "next";

const POSTS_PER_PAGE = 10;
export default async function BlogPage() {
  const [posts, totalCount] = await Promise.all([
    getPaginatedBlogPosts(1, POSTS_PER_PAGE),
    getBlogPostCount(),
  ]);
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
        <span
          className="text-transparent bg-clip-text bg-linear-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white"
        >
          Blog
        </span>
      </h1>
      <BlogList posts={posts} />

      <Pagination currentPage={1} totalPages={totalPages} />
      <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
          Disclaimer: All content reflects my personal views only and does not represent the positions, strategies, or opinions of any entity I am or have been associated with.
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: "Blog | ecabigting",
    description: "Thoughts on AI, software engineering, and building at scale.",
    alternates: {
      canonical: "https://ericcabigting.dev/blog",
    },
    openGraph: {
      title: "Blog | ecabigting",
      description: "Thoughts on AI, software engineering, and building at scale.",
      url: "https://ericcabigting.dev/blog",
      siteName: "ecabigting",
      locale: "en_US",
      type: "website",
      images: site.profileImage?.url ? [
        {
          url: site.profileImage.url,
          width: 800,
          height: 800,
          alt: "ecabigting",
        },
      ] : undefined,
    },
    twitter: {
      card: "summary",
      title: "Blog | ecabigting",
      description: "Thoughts on AI, software engineering, and building at scale.",
    },
  };
}

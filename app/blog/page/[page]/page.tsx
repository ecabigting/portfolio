import { getPaginatedBlogPosts, getBlogPostCount, getSiteSettings } from "@/lib/sanity";
import BlogList from "@/components/blogPage/BlogList";
import Pagination from "@/components/blogPage/Pagination";
import { Metadata } from "next";

export const revalidate = 3600

const POSTS_PER_PAGE = 10;
export default async function BlogPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  const [posts, totalCount] = await Promise.all([
    getPaginatedBlogPosts(currentPage, POSTS_PER_PAGE),
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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
export async function generateStaticParams() {
  const totalCount = await getBlogPostCount();
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const site = await getSiteSettings();

  return {
    title: `Blog Page ${page} | ecabigting`,
    description: "Thoughts on AI, software engineering, and building at scale.",
    alternates: {
      canonical: `https://ericcabigting.dev/blog/page/${page}`,
    },
    openGraph: {
      title: `Blog Page ${page} | ecabigting`,
      description: "Thoughts on AI, software engineering, and building at scale.",
      url: `https://ericcabigting.dev/blog/page/${page}`,
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
      title: `Blog Page ${page} | ecabigting`,
      description: "Thoughts on AI, software engineering, and building at scale.",
    },
  };
}

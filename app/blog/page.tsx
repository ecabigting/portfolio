import { getPaginatedBlogPosts, getBlogPostCount } from "@/lib/sanity";
import BlogList from "@/components/blogPage/BlogList";
import Pagination from "@/components/blogPage/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | ecabigting",
  description: "Thoughts on AI, software engineering, and building at scale.",
};

const POSTS_PER_PAGE = 10;
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page ?? "1", 10);
  const [posts, totalCount] = await Promise.all([
    getPaginatedBlogPosts(currentPage, POSTS_PER_PAGE),
    getBlogPostCount(),
  ]);
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
        Blog
      </h1>
      <BlogList posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

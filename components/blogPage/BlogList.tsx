import Link from "next/link";
import { BlogPostListItem, extractExcerpt } from "@/lib/sanity";
interface BlogListProps {
  posts: BlogPostListItem[];
}
export default function BlogList({ posts }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-zinc-500">No posts yet.</p>;
  }
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post._id} className="group py-4">
          <Link href={`/blog/${post.slug}`} className="block">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
              {post.title}
            </h2>
            {post.publishedAt && (
              <time className="text-sm text-zinc-500 py-2 block">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
            <p className="text-zinc-600 dark:text-zinc-400 py-2">
              {extractExcerpt(post.body, 200)}
            </p>
            <span className="text-sm text-zinc-500 mt-2 inline-block group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
              Read more →
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}

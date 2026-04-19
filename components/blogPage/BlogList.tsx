import { BlogPostListItem } from "@/lib/interfaces";
import Link from "next/link";
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
            <h2 className="text-xl font-semibold text-zinc-600 dark:text-zinc-600 dark:group-hover:text-white group-hover:text-zinc-900 transition-colors">
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
            <p className="text-zinc-600  py-2">
              {post.excerpt}
            </p>
            <span className="text-sm mt-2 inline-block text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white-400 to-yellow-400 bg-white">
              Read more →
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}

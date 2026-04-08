import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
interface PostPageProps {
  params: Promise<{ slug: string }>;
}
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blog"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <header className="mb-8">
        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.categories.map((cat, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          {post.publishedAt && (
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
          {post.author?.name && (
            <span>by {post.author.name}</span>
          )}
        </div>
      </header>
      {post.mainImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.mainImage}
            alt={post.title ?? "Post cover"}
            width={800}
            height={450}
            className="w-full h-auto"
            priority
          />
        </div>
      )}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-zinc-600 dark:text-zinc-400">
          No posts.
        </p>
      </div>
    </article>
  );
}
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.title} | ecabigting`,
    description: post.title ?? undefined,
  };
}
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

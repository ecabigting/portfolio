import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
interface PostPageProps {
  params: Promise<{ slug: string }>;
}
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3)
  ]);
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
        {post.body ? (
          <PortableText value={post.body} components={portableTextComponents} />) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No content available for this post.
          </p>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8">
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-red-400 via-orange-400 to-yellow-400 mb-6 text-center">
            Continue Reading.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost._id}
                href={`/blog/${relatedPost.slug}`}
                className="flex flex-col bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                {relatedPost.mainImage && (
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={relatedPost.mainImage}
                      alt={relatedPost.title ?? "Blog post cover"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {relatedPost.title}
                  </h3>
                  {relatedPost.categories && relatedPost.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedPost.categories.slice(0, 3).map((cat, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    {relatedPost.publishedAt && (
                      <time className="text-xs text-zinc-500">
                        {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    <span className="text-sm text-transparent bg-clip-text bg-linear-to-r from-red-400 via-orange-400 to-yellow-400">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}


export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const ogImage = post.mainImage
    ? [{ url: post.mainImage, width: 800, height: 450, alt: post.title ?? "Blog post" }]
    : undefined;

  return {
    title: `${post.title} | ecabigting`,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `https://ericcabigting.dev/blog/${slug}`,
    },
    openGraph: {
      title: post.title ?? "Blog Post",
      description: post.excerpt ?? undefined,
      url: `https://ericcabigting.dev/blog/${slug}`,
      siteName: "ecabigting",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title ?? "Blog Post",
      description: post.excerpt ?? undefined,
      images: ogImage?.map(img => img.url),
    },
  };
}


export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

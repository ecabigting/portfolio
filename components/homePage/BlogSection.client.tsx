'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentBlogPosts } from '@/actions/getBlogPosts'

interface BlogPost {
  _id: string
  title: string | null
  slug: string | null
  excerpt: string | null
  publishedAt: string | null
  mainImage: string | null
  categories: Array<{ title: string | null }> | null
}

export default function BlogSectionClient() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getRecentBlogPosts(3)
        setPosts(data)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-2 md:py-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-3 text-center">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white-400 to-yellow-400 mr-4 bg-white">
            Recent Posts.
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800"
            >
              <div className="aspect-video w-full bg-zinc-800 animate-pulse" />
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div className="h-6 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 bg-zinc-800 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-2 md:py-4">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-3 text-center">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white-400 to-yellow-400 mr-4 bg-white">
          Recent Posts.
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="flex flex-col bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            {post.mainImage && (
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={post.mainImage}
                  alt={post.title ?? "Blog post cover"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col flex-1 p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {post.title}
              </h3>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 3).map((cat, i) => (
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
                {post.publishedAt && (
                  <time className="text-xs text-zinc-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                )}
                {post.slug && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-transparent bg-clip-text bg-linear-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white"
                  >
                    Read more →
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

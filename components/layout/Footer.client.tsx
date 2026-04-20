'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFooter } from '@/actions/getFooter'
import { FooterContent } from '@/lib/interfaces'

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

function splitForBotProtection(text: string): Array<{ text: string; reversed: boolean }> {
  const parts = text.split("").map((char, i) => ({
    text: char,
    reversed: i % 2 === 1,
  }))
  return parts
}

function renderProtectedText(text: string) {
  const parts = splitForBotProtection(text)
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={{ display: "inline-block", unicodeBidi: "bidi-override", direction: part.reversed ? "rtl" : "ltr" }}
        >
          {part.text}
        </span>
      ))}
    </span>
  )
}

export default function FooterClient() {
  const [footerData, setFooterData] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFooter() {
      try {
        const data = await getFooter()
        setFooterData(data)
      } catch (error) {
        console.error('Failed to load footer:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFooter()
  }, [])

  if (loading) {
    return (
      <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </footer>
    )
  }

  if (!footerData) {
    return null
  }

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        {/* Column 1: Recent Blog Posts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Recent Posts
          </h3>
          <ul className="flex flex-col gap-2">
            {footerData.recentPosts?.slice(0, 5).map((post) =>
              post.slug ? (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    {post.title || "Untitled"}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Column 2: Quick Nav */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/blog"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Projects
              </Link>
            </li>
            {footerData.cvLink && (
              <li>
                <a
                  href={footerData.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Download My CV
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Contact
          </h3>
          <div className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            {footerData.email && (
              <div className="flex items-center gap-2">
                <span className="shrink-0">
                  <EmailIcon />
                </span>
                <span>{renderProtectedText(footerData.email)}</span>
              </div>
            )}
            {footerData.phone && (
              <div className="flex items-center gap-2">
                <span className="shrink-0">
                  <PhoneIcon />
                </span>
                <span>{renderProtectedText(footerData.phone)}</span>
              </div>
            )}
            {footerData.location && (
              <div className="flex items-center gap-2">
                <span className="shrink-0">
                  <LocationIcon />
                </span>
                <span>{footerData.location}</span>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-2 flex gap-4">
            {footerData.githubLink && (
              <a
                href={footerData.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <Image
                  src="/images/github-icon.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                />
              </a>
            )}
            {footerData.linkedinLink && (
              <a
                href={footerData.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <Image
                  src="/images/linkedin-icon.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  style={{ fill: "currentColor" }}
                  unoptimized={true}
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-8 max-w-5xl border-t border-zinc-200 px-6 pt-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        © {footerData.year?.split("T")[0].split("-")[0]} ecabigting. All rights reserved.
      </div>
    </footer>
  )
}

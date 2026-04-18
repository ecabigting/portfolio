'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getFooter } from '@/actions/getFooter'
import type { FooterContent } from '@/lib/sanity'

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
      <footer className="w-full border-t border-zinc-200 py-4 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-6 md:flex-row">
          <p className="text-sm">Loading...</p>
        </div>
      </footer>
    )
  }

  if (!footerData) {
    return null
  }

  return (
    <footer className="w-full border-t border-zinc-200 py-4 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-6 md:flex-row">
        <p className="text-sm">
          © {footerData.year?.split('T')[0].split('-')[0]} ecabigting. All Rights Reserved.
        </p>
        <div className="mt-2 flex gap-4 md:mt-0">
          {footerData.githubLink && (
            <a
              href={footerData.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub"
              className="transition-opacity hover:opacity-70 text-zinc-900 dark:text-white"
            >
              <Image
                src="/images/github-icon.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>
          )}
          {footerData.linkedinLink && (
            <a
              href={footerData.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
              className="transition-opacity hover:opacity-70 text-zinc-900 dark:text-white"
            >
              <Image
                src="/images/linkedin-icon.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                style={{ fill: 'currentColor' }}
                unoptimized={true}
              />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
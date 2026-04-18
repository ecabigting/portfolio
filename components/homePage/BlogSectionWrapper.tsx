'use client'

import dynamic from 'next/dynamic'

const BlogSection = dynamic(
  () => import('@/components/homePage/BlogSection.client'),
  { ssr: false }
)

export default function BlogSectionWrapper() {
  return <BlogSection />
}
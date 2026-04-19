'use client'

import dynamic from 'next/dynamic'

const Footer = dynamic(
  () => import('@/components/layout/Footer.client'),
  { ssr: false }
)

export default function FooterWrapper() {
  return <Footer />
}
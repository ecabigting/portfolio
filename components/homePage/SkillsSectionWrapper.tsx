'use client'

import dynamic from 'next/dynamic'

const SkillsSection = dynamic(
  () => import('@/components/homePage/SkillsSection.client'),
  { ssr: false }
)

export default function SkillsSectionWrapper() {
  return <SkillsSection />
}
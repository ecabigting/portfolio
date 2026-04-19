'use client'

import { useEffect, useState } from 'react'
import { getSkills } from '@/actions/getSkills'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function SkillsSectionClient() {
  const [skills, setSkills] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await getSkills()
        setSkills(data)
      } catch (error) {
        console.error('Failed to load skills:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSkills()
  }, [])

  if (loading) {
    return (
      <section className="py-2 md:py-4">
        <h2 className="text-xl text-center font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-6">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white-400 to-yellow-400 mr-4 bg-white">
            Skill set.
          </span>
        </h2>
        <div className="flex flex-wrap gap-3 justify-center-safe">
          <div className="px-3 py-1 rounded-md bg-zinc-700 animate-pulse">
            <span className="text-sm font-medium text-white">Loading...</span>
          </div>
        </div>
      </section>
    )
  }

  if (!skills || skills.length === 0) {
    return null
  }

  const shuffledSkills = shuffleArray(skills)

  return (
    <section className="py-2 md:py-4">
      <h2 className="text-xl text-center font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-6">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white-400 to-yellow-400 mr-4 bg-white">
          Skill set.
        </span>
      </h2>
      <div className="flex flex-wrap gap-3 justify-center-safe">
        {shuffledSkills.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="px-3 py-1 rounded-md bg-zinc-700"
          >
            <span className="text-sm font-medium text-white ">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
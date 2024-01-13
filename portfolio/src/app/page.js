import Image from 'next/image'
import { HeroSection } from './components/HeroSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] container mx-auto p-4 px-12 py-4">
      <div className="container"><HeroSection/></div>
    </main>
  )
}
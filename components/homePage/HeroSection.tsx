import Image from "next/image";
import { getCroppedProfileImageUrl } from "@/lib/sanity";
import { SiteSettings } from "@/lib/interfaces";

interface HeroSectionProps {
  title: string | null;
  subtitle: string | null;
  email: string | null;
  cvLink: string | null;
  profileImage: SiteSettings['profileImage'];
}
export default function HeroSection({
  title,
  subtitle,
  email,
  cvLink,
  profileImage
}: HeroSectionProps) {
  const croppedUrl = getCroppedProfileImageUrl(profileImage);
  const displayUrl = croppedUrl ?? "/images/actual-hero-image.webp";

  return (
    <section className="flex flex-col items-center gap-8 py-6 md:flex-row md:justify-between md:py-12">
      {/* 1. Content Area (Stacked on Mobile) */}
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          <span
            className='text-transparent bg-clip-text bg-linear-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white'
          >
            {title ?? "Hi, I'm Eric"}
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
        {/* 2. Actions: Email & CV Link */}
        <div className="mt-10 flex flex-col w-full gap-4 sm:flex-row sm:justify-center md:justify-start">
          {email && (
            <a
              href={`mailto:${email}?subject=Testing out mailto!`}
            >
              <button
                className='px-6 py-3 w-full sm:w-fit rounded-full 
            bg-linear-to-br from-red-500 via-white-500 to-yellow-500 
            mr-4 bg-white hover:bg-slate-200 text-white font-bold'
              >
                Say hi!
              </button>
            </a>
          )}

          {cvLink && (
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className='px-1 py-1 w-full sm:w-fit rounded-full 
            bg-linear-to-br from-red-500 via-white-500 to-yellow-500 
            hover:bg-slate-800 text-white font-bold'
              >
                <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-2'>
                  Download my CV!</span>
              </button>
            </a>
          )}
        </div>
      </div>
      {/* 3. Profile Image (Last in order on Mobile, Right side on Desktop) */}
      <div className='col-span-5 place-self-center mt-4 lg:mt-0'>
        <div className='rounded-full w-62.5 h-62.5 lg:w-62.5 lg:h-62.5 relative mt-4
            bg-linear-to-r from-red-400 via-white-400 to-yellow-400 bg-[#181818] '>
          <Image
            src={displayUrl}
            alt={title ?? "Profile Image"}
            fill
            priority
            className='rounded-full object-cover'
            sizes="(max-width: 768px) 256px, 320px"
          />
        </div>
      </div>
    </section>
  );
}

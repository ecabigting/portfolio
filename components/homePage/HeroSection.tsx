import Image from "next/image";

interface HeroSectionProps {
  title: string | null;
  subtitle: string | null;
  email: string | null;
  cvLink: string | null;
  profileImage: string | null;
}
export default function HeroSection({
  title,
  subtitle,
  email,
  cvLink,
  profileImage
}: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center gap-8 py-12 md:flex-row md:justify-between md:py-24">
      {/* 1. Content Area (Stacked on Mobile) */}
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          {title ?? "Hi, I'm Eric"}
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
        {/* 2. Actions: Email & CV Link */}
        <div className="mt-10 flex flex-col w-full gap-4 sm:flex-row sm:justify-center md:justify-start">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Say hi!
            </a>
          )}

          {cvLink && (
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              My CV
            </a>
          )}
        </div>
      </div>
      {/* 3. Profile Image (Last in order on Mobile, Right side on Desktop) */}
      <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-zinc-900 md:h-80 md:w-80">
        <Image
          src={profileImage ?? "/images/actual-hero-image.webp"}
          alt={title ?? "Profile Image"}
          fill
          priority
          className="object-cover scale-110"
          sizes="(max-width: 768px) 256px, 320px"
        />
      </div>
    </section>
  );
}

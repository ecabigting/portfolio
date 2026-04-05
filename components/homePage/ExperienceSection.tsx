import Image from "next/image";
interface ExperienceSectionProps {
  experienceBanner: string | null;
  experience: Array<{
    role: string | null;
    company: string | null;
    location: string | null;
    companyUrl: string | null;
  }> | null;
}
export default function ExperienceSection({
  experienceBanner,
  experience,
}: ExperienceSectionProps) {
  const sorted = experience ? [...experience].reverse() : [];
  return (
    <section className="py-8 md:py-16" >
      <h2 className="text-xl font-bold tracking-tight text-right text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        <span
          className='text-transparent bg-clip-text bg-linear-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white'
        >
          Working with the best teams.
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left: Banner Image */}
        <div className="relative w-full overflow-hidden rounded-lg">
          <Image
            src={experienceBanner ?? "/images/experience-banner.webp"}
            alt="Experience"
            width={800}
            height={1200}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Right: Experience List */}
        <div className="flex flex-col" >
          {
            sorted.map((exp, i) => (
              <div
                key={i}
                className={`py-6 ${i > 0 ? "border-t border-zinc-200 dark:border-zinc-800" : ""}`}
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                    >
                      <span className="ml-1 inline-block text-2xl text-transparent bg-clip-text bg-linear-to-r from-red-400 via-white-400 to-yellow-400">
                        ↗
                      </span>{" "}
                      {exp.company}

                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400" > {exp.role} </p>
                {
                  exp.location && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-500" >
                      {exp.location}
                    </p>
                  )
                }
              </div>
            ))
          }
        </div>

      </div>
    </section>
  );
}

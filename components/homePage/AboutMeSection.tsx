import { Project } from "@/lib/sanity";
import Link from "next/link";
interface AboutMeSectionProps {
  aboutMe: string | null;
  projects: Project[];
}
export default function AboutMeSection({ aboutMe, projects }: AboutMeSectionProps) {
  const paragraphs = aboutMe ? aboutMe.replace("\n\n", " ") : "";
  return (
    <section className="py-2 md:py-4">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        <span
          className='text-transparent bg-clip-text bg-linear-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white'
        >
          Code. Cloud. AI.
        </span>
      </h2>
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
          {paragraphs}
        </p>
      </div>
      {projects && projects.length > 0 && (
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400 text-justify">
          Some of the projects I worked on are{" "}
          {projects.map((project, i) => (
            <span key={i}>
              {project.link ? (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 dark:text-zinc-50 underline hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
                >
                  {project.title}
                </Link>
              ) : (
                <span className="text-zinc-900 dark:text-zinc-50">{project.title}</span>
              )}
              {i < projects.length - 2
                ? ", "
                : i === projects.length - 2
                  ? ", and "
                  : ""}
            </span>
          ))}
          .
        </p>
      )}
    </section>
  );
}

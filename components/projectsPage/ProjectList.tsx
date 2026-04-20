import { Project } from "@/lib/interfaces";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (!projects || projects.length === 0) {
    return <p className="text-zinc-500">No projects yet.</p>;
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="break-inside-avoid mb-6">
      <article className="group relative flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
        {/* Title & Link */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {project.title}
          </h2>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              ↗
            </a>
          )}
        </div>

        {/* Type Badge */}
        {project.projectType && (
          <span className="inline-block w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {project.projectType}
          </span>
        )}

        {/* Company / Role */}
        {(project.company || project.role) && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {project.role}
            {project.role && project.company && " at "}
            {project.company}
          </p>
        )}

        {/* Description */}
        {project.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4">
            {project.description}
          </p>
        )}

        {/* Date */}
        {project.date && (
          <time className="text-xs text-zinc-500">
            {new Date(project.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </time>
        )}

        {/* Technologies (Tags) */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Custom Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

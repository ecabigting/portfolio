import { getProjects } from "@/lib/sanity";
import ProjectList from "@/components/projectsPage/ProjectList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | ecabigting",
  description: "Projects and applications built by Eric Cabigting - Fullstack Engineer.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
        <span
          className="text-transparent bg-clip-text bg-linear-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white"
        >
          Projects
        </span>
      </h1>
      <ProjectList projects={projects} />
    </div>
  );
}
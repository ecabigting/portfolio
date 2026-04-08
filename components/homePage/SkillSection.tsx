import { headers } from "next/headers";
interface SkillsSectionProps {
  skills: string[] | null;
}
const BORDER_COLORS = [
  "border-red-600",
  "border-red-500",
  "border-orange-500",
  "border-orange-400",
  "border-amber-500",
  "border-amber-400",
  "border-yellow-500",
  "border-yellow-300",
];
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function getBorderByIndex(index: number): string {
  return BORDER_COLORS[index % BORDER_COLORS.length];
}
export default async function SkillsSection({ skills }: SkillsSectionProps) {
  await headers(); // Satisfy Next.js requirement

  if (!skills || skills.length === 0) return null;

  const shuffledSkills = shuffleArray(skills);
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
            className={`px-3 py-1 rounded-md bg-zinc-950 border-l-4 ${getBorderByIndex(index)}`}
          >
            <span className="text-sm font-medium text-white ">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

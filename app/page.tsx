import { getProjects, getSiteSettings } from "@/lib/sanity";
import HeroSection from "@/components/homePage/HeroSection";
import AboutMeSection from "@/components/homePage/AboutMeSection";
import ExperienceSection from "@/components/homePage/ExperienceSection";
import SkillsSection from "@/components/homePage/SkillSection";
import { Suspense } from "react";
export default async function Home() {
  const [data, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  return (
    <div className="mx-auto max-w-5xl px-6">
      <HeroSection
        title={data.mainTitle}
        subtitle={data.subTitle}
        email={data.email}
        cvLink={data.cvLink}
        profileImage={data.profileImage}
      />
      <AboutMeSection
        aboutMe={data.aboutMe}
        projects={projects}
      />
      <ExperienceSection
        experienceBanner={data.experienceBanner}
        experience={data.experience}
      />
      <Suspense fallback={null}>
        <SkillsSection skills={data.skills} />
      </Suspense>
    </div>
  );
}

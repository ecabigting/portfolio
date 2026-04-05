import { getProjects, getSiteSettings } from "@/lib/sanity";
import HeroSection from "@/components/homePage/HeroSection";
import AboutMeSection from "@/components/homePage/AboutMeSection";
import ExperienceSection from "@/components/homePage/ExperienceSection";
export default async function Home() {
  const [data, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  console.log(JSON.stringify({ data }))
  console.log(JSON.stringify({ projects }))
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
    </div>
  );
}

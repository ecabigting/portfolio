import { getSiteSettings } from "@/lib/sanity";
import HeroSection from "@/components/homePage/HeroSection";
export default async function Home() {
  const data = await getSiteSettings();
  return (
    <div className="mx-auto max-w-5xl px-6">
      <HeroSection
        title={data.mainTitle}
        subtitle={data.subTitle}
        email={data.email}
        cvLink={data.cvLink}
        profileImage={data.profileImage}
      />
    </div>
  );
}

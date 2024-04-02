import { HeroSection } from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import AchievementsSection from "./components/AchievementsSection";

export default function Home() {
	return (
		<>
			<HeroSection />
			<AchievementsSection />
			<AboutSection />
			<ProjectsSection />
		</>
	);
}

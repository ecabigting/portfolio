import React from "react";
import { HeroSection } from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import AchievementsSection from "./components/AchievementsSection";
import Navbar from "./components/Navbar";

export default function Home() {
	console;
	return (
		<>
			<Navbar />
			<HeroSection />
			<AchievementsSection />
			<AboutSection />
			<ProjectsSection />
		</>
	);
}

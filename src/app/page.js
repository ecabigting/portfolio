import Script from "next/script";
import { HeroSection } from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col bg-[#121212] '>
			{/* Global Site Tag (gtag.js) - Google Analytics */}
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_KEY}`}
			/>
			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.REACT_APP_GA_KEY}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
			<Navbar />
			<div className='mt-24 p-4 py-4'>
				<HeroSection />
				<AchievementsSection />
				<AboutSection />
				<ProjectsSection />
				<EmailSection />
			</div>
			<Footer />
		</main>
	);
}

import React from "react";
import ProjectCard from "./ProjectCard";

const projectData = [
	{
		id: 8,
		title: "Wild Wadi Waterpark™",
		description: "E-commerce website for the Wild Wadi Waterpark™",
		image: "/images/projects/thumbs/proj-wildwadi.webp",
		tag: ["ALL,WEB"],
		gitHub: "",
		projectURL: "https://wildwadi.com/",
	},
	{
		id: 7,
		title: "Inside Burj Al Arab",
		description: "E-commerce website for Inside Burj Al Arab Tours",
		image: "/images/projects/thumbs/proj-ibaa.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "",
		projectURL: "https://insideburjalarab.com/",
	},
	{
		id: 6,
		title: "The Original Barracuda",
		description: "E-commerce and reward app for The Originall Barrcuda Bottle Shop",
		image: "/images/projects/thumbs/proj-barracuda.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "",
		projectURL: "https://www.originalbarracuda.com/",
	},
	{
		id: 5,
		title: "MovieAPP",
		description: "Website for searching movies using TheMovieDB API",
		image: "/images/projects/thumbs/proj-movieapp.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "https://github.com/ecabigting/movieapp",
		projectURL: "https://ecabigting-movieapp.netlify.app/",
	},
	{
		id: 4,
		title: "DCIAA-IIAN",
		description: "Mobile app and dashboard investigation and Notification system for Dubai Civil Aviation Authority",
		image: "/images/projects/thumbs/proj-dcaaiian.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "",
		projectURL: "https://apps.apple.com/us/app/dcaa-iian/id1466031139",
	},
	{
		id: 3,
		title: "Al Mawashi",
		description: "E-commerce and Mobile app with backend store management system for Al Mawashi Meat Shop in MENA",
		image: "/images/projects/thumbs/proj-mawashi.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "",
		projectURL: "https://www.almawashistore.com/",
	},
	{
		id: 2,
		title: "Al Dhafra Private Schools",
		description: "School Management Portal for Al Dhafra Private Schools",
		image: "/images/projects/thumbs/proj-dhafra.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "",
		projectURL: "https://dhafraschools.com/",
	},
	{
		id: 1,
		title: "nextSpot",
		description: "Private online media sharing and review system for Fotokem Industries INC.",
		image: "/images/projects/thumbs/proj-nextspot.webp",
		tag: ["ALL,WEB,MOBILE"],
		gitHub: "",
		projectURL: "https://nextspot.fotokem.com/",
	},
];
const ProjectsSection = () => {
	return (
		<>
			<h2 className='text-center text-4xl font-bold text-white mt-4 mb-4'>Projects</h2>
			<div className='grid md:grid-cols-3 gap-8 md:gap-12'>
				{projectData.map((project) => (
					<ProjectCard
						key={project.id}
						title={project.title}
						description={project.description}
						imgUrl={project.image}
						gitHub={project.gitHub}
						projectURL={project.projectURL}
					/>
				))}
			</div>
		</>
	);
};

export default ProjectsSection;

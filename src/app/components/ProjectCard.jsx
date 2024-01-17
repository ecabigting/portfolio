import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitHub, projectURL }) => {
	return (
		<div>
			<div
				className='h-52 md:h-72 rounded-t-xl relative group'
				style={{ background: `url(${imgUrl})`, backgroundPosition: "center", backgoundSize: "cover" }}
			>
				<div
					className='overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden 
				group-hover:flex group-hover:bg-opacity-80 transition-all duration-1000'
				>
					{gitHub ? (
						<Link
							href={gitHub}
							className='mr-2 h-14 w-14 border-2 relative rounded-full flex items-center justify-center border-[#ADB7BE] hover:border-white'
						>
							<CodeBracketIcon className='h-10 w-10 text-[#ADB7BE] cursor-pointer hover:text-white'></CodeBracketIcon>
						</Link>
					) : (
						""
					)}
					{projectURL ? (
						<Link
							rel='nofollow noreferrer noopener'
							href={projectURL}
							className='h-14 w-14 border-2 relative rounded-full flex items-center justify-center border-[#ADB7BE] hover:border-white'
						>
							<EyeIcon className='h-10 w-10 text-[#ADB7BE] cursor-pointer hover:text-white'></EyeIcon>
						</Link>
					) : (
						""
					)}
				</div>
			</div>
			<div className='text-white rounded-b-xl bg-[#181818] py-6 px-4 border-t-2 border-t-orange-500'>
				<h5 className='font-xl font-semibold mb-2'>{title}</h5>
				<p className='h-16 text-[#ADB7BE] text-sm'>{description}</p>
			</div>
		</div>
	);
};

export default ProjectCard;

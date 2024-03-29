"use client";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const TAB_DATA = [
	{
		title: "Experience",
		id: "experience",
		content: (
			<ul className='list-disc pl-2 '>
				<li>
					<h3 className='text-md font-bold'>Digital Product Manager (Jul 2021 - Present)</h3>
					<p className='text-sm font-light'>
						Digital Qube Marketing Consultancy (formerly eWavelength Digital Marketing)
					</p>
					<p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
				</li>
				<li>
					<h3 className='text-md font-bold'>Senior Software Developer (Aug 2017 - Jun 2021)</h3>
					<p className='text-sm font-light'>Brixio (formerly ITFAQ Softwares)</p>
					<p className='text-xs font-extralight'>Dubai, United Arab Emirates</p>
				</li>
				<li>
					<h3 className='text-md font-bold'>Web Developer (Jun 2014 - Jul 2017)</h3>
					<p className='text-sm font-light'>Al Dhafra Private Schools</p>
					<p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
				</li>
				<li className='underline last:list-none mt-4'>
					<Link href='/EricThomasDCabitingCV.pdf' target='_blank' download>
						View full Resume
					</Link>
				</li>
			</ul>
		),
	},
	{
		title: "Skills",
		id: "skills",
		content: (
			<ul className='list-disc pl-2'>
				<li>Fullstack Web Development</li>
				<li>HTML, JS, CSS</li>
				<li>Rest API</li>
				<li>NodeJS, C#, .net</li>
				<li>React, NextJS, Angular</li>
				<li>PostgreSQL,MSSQL, MySQL, MongoDB</li>
				<li>AWS, Microsoft Azure, Netlify, Vercel</li>
				<li>Git, Docker, npm, shadcn/ui</li>
			</ul>
		),
	},
	{
		title: "Education",
		id: "education",
		content: (
			<ul className='list-disc pl-2'>
				<li>
					<h3 className='text-md font-black'>Bachelor of Science in Computer Science </h3>
					<p className='text-sm font-bold'>Angeles University Foundation </p>
					<p className='text-xs font-light'>Angeles City, Philippines</p>
				</li>
			</ul>
		),
	},
];

const AboutSection = () => {
	const [tab, setTab] = useState("experience");
	const [isPending, startTransition] = useTransition();

	const handleTabChange = (id) => {
		startTransition(() => {
			setTab(id);
		});
	};
	return (
		<section className='text-white'>
			<div className='m-2 md:grid md:grid-cols-2 gap-4 items-center py-8 px-4 xl:gap-8 sm:py-16 xl:px-16'>
				<Image
					alt='coding'
					src='/images/aboutme-image2.webp'
					width={400}
					height={400}
					className='max-auto place-self-center'
				/>
				<div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
					<h2 className='text-4xl font-bold text-white mt-4 mb-4' id='about'>
						about me
					</h2>
					<p className='text-base md:text-lg mb-3'>
						Hi! My name is Eric, and I am a full-stack developer. With passion for back-end development. You know that
						thing that happens in the background when you click a button? Thats what I love doing. That complex and
						intricate process of manipulating data and presenting it back to the user.
					</p>

					<p className='text-base md:text-lg'>
						With my experience in software development spanning over a decade. Working with different entities, from
						goverment, hospitality, and commerce. I can help you navigate the confusing world of building your own
						custom software, specifically tailored to help with your business needs. Starting from planning, designing,
						implementing beautiful and complex code to help you improve your processes.
					</p>

					<div className='flex flex-row mt-8'>
						<TabButton selectTab={() => handleTabChange("experience")} active={tab === "experience"}>
							{" "}
							Experience{" "}
						</TabButton>
						<TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>
							{" "}
							Skills{" "}
						</TabButton>
						<TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>
							{" "}
							Education{" "}
						</TabButton>
					</div>
					<div className='mt-8'>{TAB_DATA.find((t) => t.id === tab).content}</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;

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
					<h3 className='text-md font-bold'>Full Stack Web Developer (Jul 2021 - Present)</h3>
					<p className='text-sm font-light'>
						Digital Qube Marketing Consultancy (formerly eWavelength Digital Marketing)
					</p>
					<p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
				</li>
				<li>
					<h3 className='text-md font-bold'>Senior Software Developer (Aug 2017 - Jun 2021)</h3>
					<p className='text-sm font-light'>
						Digital Qube Marketing Consultancy(formerly eWavelength Digital Marketing)
					</p>
					<p className='text-xs font-extralight'>Dubai, United Arab Emirates</p>
				</li>
				<li>
					<h3 className='text-md font-bold'>Web Developer (Jun 2014 - Jul 2017)</h3>
					<p className='text-sm font-light'>Al Dhafra Private Schools</p>
					<p className='text-xs font-extralight'>Abu Dhabi, United Arab Emirates</p>
				</li>
				<li className='text-right last:list-none'>
					<Link href='#' className='text-md font-extralight'>
						.. read more
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
				<li>C#, .net</li>
				<li>HTML, JS, CSS</li>
				<li>Rest API</li>
				<li>NodeJS</li>
				<li>React, NextJS, Angular</li>
				<li>MSSQL, MySQL, MongoDB,</li>
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
				<Image src='/images/aboutme-image2.jpg' width={400} height={400} className='max-auto place-self-center' />
				<div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
					<h2 className='text-4xl font-bold text-white mt-4 mb-4'>about me</h2>
					<p className='text-base md:text-lg'>
						Do irure Lorem est veniam sunt velit aliquip dolor cupidatat cupidatat consectetur. Cillum commodo id
						nostrud elit ipsum culpa nisi Lorem. Ea magna anim minim incididunt consequat officia consequat do. Non
						voluptate ea eu officia magna. Duis do dolore qui sit sit voluptate velit ipsum minim aliquip aliquip. Ea
						minim culpa ex laboris esse sint veniam duis.
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

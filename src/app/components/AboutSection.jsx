"use client";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import Image from "next/image";

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
			<div className='m-2 md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
				<Image src='/images/aboutme-image2.jpg' width={400} height={400} className='max-auto place-self-center' />
				<div>
					<h2 className='text-4xl font-bold text-white mt-4'>about me</h2>
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
						<span className=''>Experience</span>
						<span className=''>Skills</span>
						<span className=''>Education</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;

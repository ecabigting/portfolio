"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

export const HeroSection = () => {
	const handleOnClick = (e, target) => {
		e?.preventDefault();
		const targetId = target.replace(/.*\#/, "");
		const elem = document.getElementById(targetId);
		console.log(targetId);
		window.scrollTo({
			top: elem?.getBoundingClientRect().top + window.scrollY - 100,
			behavior: "smooth",
		});
	};

	return (
		<section className='lg:py-14'>
			<div className='grid grid-cols-1 sm:grid-cols-12'>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className='col-span-7 place-self-center text-center pr-3 sm:text-left'
				>
					<h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-8xl font-extrabold'>
						<span
							className='text-transparent bg-clip-text bg-gradient-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white'
						>
							Hey! I&apos;m Eric!{" "}
						</span>
						<br />
						<TypeAnimation
							sequence={["Full-stack Dev", 1000, "more on back-end", 1000, "Lets Build!", 1000]}
							wrapper='span'
							speed={50}
							repeat={Infinity}
						/>
					</h1>
					<p className='text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl'>
						I&apos;m a Digital Product Manager for{" "}
						<Link href='https://www.digital-qube.com/' className='underline'>
							{" "}
							Digital Qube
						</Link>{" "}
						in Abu Dhabi, UAE. I have a passion for back-end development and building functionally rich software.
					</p>
					<div>
						<button
							className='px-6 py-3 w-full sm:w-fit rounded-full 
            bg-gradient-to-br from-red-500 via-white-500 to-yellow-500 
            mr-4 bg-white hover:bg-slate-200 text-white'
							onClick={(e) => handleOnClick(e, "#email")}
						>
							Let&apos;s talk!
						</button>
						<Link href='/EricThomasDCabitingResume.pdf' download target='_blank'>
							<button
								className='px-1 py-1 w-full sm:w-fit rounded-full 
            bg-gradient-to-br from-red-500 via-white-500 to-yellow-500 
            mt-3 hover:bg-slate-800 text-white'
							>
								<span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-3'>Download CV!</span>
							</button>
						</Link>
					</div>
				</motion.div>
				<div className='col-span-5 place-self-center mt-4 lg:mt-0'>
					<div
						className='rounded-full w-[250px] h-[250px] lg:w-[250px] lg:h-[250px] relative mt-4
            bg-gradient-to-r from-red-400 via-white-400 to-yellow-400 bg-[#181818] '
					>
						<Image
							src='/images/actual-hero-image.webp'
							alt='Hero'
							className=' mx-auto backdrop-blur-sm rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover'
							width={250}
							height={250}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

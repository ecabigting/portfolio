"use client";
import React, { useState } from "react";
import GitHubIcon from "../../../public/images/github-icon.svg";
import LinkedInIcon from "../../../public/images/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
	const [emailSubmitted, setEmailSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			email: e.target.email.value,
			subject: e.target.subject.value,
			message: e.target.message.value,
		};
		const JSONdata = JSON.stringify(data);
		const endpoint = "/api/send";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSONdata,
		};
		try {
			const response = await fetch(endpoint, options);
			const resData = await response.json();
			if (response.status === 200) {
				setEmailSubmitted(true);
				e.target.email.value = "";
				e.target.subject.value = "";
				e.target.message.value = "";
				console.log("Message sent.");
			} else {
				console.log("Failed!");
				console.log(response);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<section id='email' className='grid px-5 md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative'>
			<div className='bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-orange-900 to-transparent rounded-full h-80 w-80 z-0 top-3/4 blur-lg absolute --left-4 transform -translate-x-1/2 -translate-1/2'></div>
			<div>
				<h5 className='text-xl font-bold text-white my-2'>Let&apos;s Connect</h5>
				<p className='text-[#ADB7BE] mb-4 max-wd-md'>
					Hey! My inbox is always free! Currently looking for new opportunities. Email me even just to say Hi! or if you
					have questions! I will get back to you as soon as possible!
				</p>
				<div className='socials flex flex-row gap-2'>
					<Link href='https://github.com/ecabigting'>
						<Image src={GitHubIcon} alt='Github Icon' />
					</Link>
					<Link href='https://www.linkedin.com/in/ecabigting/'>
						<Image src={LinkedInIcon} alt='Linkedin icon' />
					</Link>
				</div>
			</div>
			<div>
				<form className='flex flex-col' onSubmit={handleSubmit}>
					<div className='mb-6'>
						<label htmlFor='email' className='text-white block text-sm font-medium mb-2'>
							Your Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							required
							placeholder='john@doe.com'
							className='bg-[#18191E] border border-[#33353F] text-gray-100 text-sm rounded-lg block w-full p-2.5'
						/>
					</div>
					<div className='mb-6'>
						<label htmlFor='subject' className='text-white block text-sm font-medium mb-2'>
							Subject
						</label>
						<input
							type='text'
							id='subject'
							name='subject'
							required
							placeholder='Come say hi!'
							className='bg-[#18191E] border border-[#33353F] text-gray-100 text-sm rounded-lg block w-full p-2.5'
						/>
					</div>
					<div className='mb-6'>
						<label htmlFor='message' className='text-white block text-sm font-medium mb-2'>
							Message
						</label>
						<textarea
							type='text'
							name='message'
							row='4'
							id='message'
							className='bg-[#18191E] border border-[#33353F] text-gray-100 text-sm rounded-lg block w-full p-2.5'
							placeholder='Message..'
						></textarea>
					</div>
					<button
						type='submit'
						className='bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-5 rounded-lg w-full '
					>
						Send Message
					</button>
					{emailSubmitted && (
						<p className='text-green-500 text-sm mt-2'>
							Thank you for your email! Will get back to you ASAP! Have a good one!
						</p>
					)}
				</form>
			</div>
		</section>
	);
};

export default EmailSection;

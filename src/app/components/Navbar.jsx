"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
	{
		title: "about",
		href: "#about",
	},
	{
		title: "projects",
		href: "#projects",
	},
	{
		title: "contact",
		href: "#email",
	},
];

const Navbar = () => {
	const [navBarOpen, setNavbarOpen] = useState(false);
	return (
		<nav className='fixed top-0 left-0 right-0 z-10 bg-[#121212]'>
			<div className='flex flex-wrap items-center justify-between mx-auto p-8 px-4'>
				<Link href={"/"} className='text-lg md:text-3xl text-white font-semibold'>
					ecabigting
				</Link>
				<div className='mobile-menu block md:hidden'>
					{!navBarOpen ? (
						<button
							onClick={() => setNavbarOpen(true)}
							className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
						>
							<Bars3Icon className='h-5 w-5' />
						</button>
					) : (
						<button
							onClick={() => setNavbarOpen(false)}
							className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
						>
							<XMarkIcon className='h-5 w-5' />
						</button>
					)}
				</div>
				<div className='menu hidden md:block md:w-auto' id='navbar'>
					<ul className='flex p4 md:p-0 md:flex-row md:space-x-8 mt-0'>
						{navLinks.map((link, index) => (
							<li key={index}>
								<NavLink target={link.href} title={link.title} />
							</li>
						))}
						<li>
							<Link
								href='/blog'
								className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
							>
								blog
							</Link>
						</li>
						<li>
							<a
								href='https://github.com/ecabigting'
								target='_blank'
								className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
							>
								github
							</a>
						</li>
					</ul>
				</div>
			</div>
			{navBarOpen ? <MenuOverlay links={navLinks} hideMainOverlay={() => setNavbarOpen(false)} /> : null}
		</nav>
	);
};

export default Navbar;

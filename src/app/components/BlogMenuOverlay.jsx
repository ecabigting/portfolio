import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";

const BlogMenuOverlay = ({ hideMainOverlay }) => {
	return (
		<ul className='flex flex-col py-4 items-center'>
			<li className='border-b border-b-slate-50'>
				<Link href='/#about' className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'>
					about
				</Link>
			</li>
			<li className='border-b border-b-slate-50'>
				<Link
					href='/#projects'
					className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
				>
					project
				</Link>
			</li>
			<li className='border-b border-b-slate-50'>
				<NavLink target='email' title='contact' hideMainOverLay={hideMainOverlay} />
			</li>

			<li className='border-b border-b-slate-50'>
				<Link href='/blog' className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'>
					blog
				</Link>
			</li>
			<li className='border-b border-b-slate-50'>
				<Link
					href='https://github.com/ecabigting'
					className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
				>
					github
				</Link>
			</li>
		</ul>
	);
};

export default BlogMenuOverlay;

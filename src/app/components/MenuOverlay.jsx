import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, hideMainOverlay }) => {
	return (
		<ul className='flex flex-col py-4 items-center'>
			{links.map((link, index) => (
				<li key={index} className='border-b border-b-slate-50'>
					<NavLink target={link.href} title={link.title} hideMainOverLay={hideMainOverlay} />
				</li>
			))}
			<li className='border-b border-b-slate-50'>
				<a
					href='https://github.com/ecabigting'
					target='_blank'
					className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
				>
					github
				</a>
			</li>
		</ul>
	);
};

export default MenuOverlay;

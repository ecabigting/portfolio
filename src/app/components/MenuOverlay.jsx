import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, hideMainOverlay }) => {
	return (
		<ul className='flex flex-col py-4 items-center'>
			{links.map((link, index) => (
				<li key={index} className='border-b border-b-slate-50'>
					<NavLink href={link.href} title={link.title} hideMainOverLay={hideMainOverlay} />
				</li>
			))}
		</ul>
	);
};

export default MenuOverlay;

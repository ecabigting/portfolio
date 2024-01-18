import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className='footer border z-10 border-t-[#33353F] boder-l-transparent border-r-transparent text-white'>
			<div className='container p-12 flex justify-between'>
				<Link href='/'>
					<span>ecabigting</span>
				</Link>
				<p className='text-slate-600'>All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;

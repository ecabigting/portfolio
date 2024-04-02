import React from "react";

const NavLink = ({ target, title, hideMainOverLay }) => {
	const handleOnClick = (e) => {
		e.preventDefault();
		const targetId = target.replace(/.*\#/, "");
		const elem = document.getElementById(targetId);
		// elem?.scrollIntoView({
		// 	behavior: "smooth",
		// });
		window.scrollTo({
			top: elem?.getBoundingClientRect().top + window.scrollY - 100,
			behavior: "smooth",
		});
		hideMainOverLay?.();
	};

	return (
		<div>
			<button
				className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
				onClick={(e) => {
					handleOnClick(e);
				}}
			>
				{title}
			</button>
		</div>
	);
};

export default NavLink;

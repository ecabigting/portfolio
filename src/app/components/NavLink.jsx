import Link from "next/link";

const NavLink = ({ target, title, hideMainOverLay }) => {
	const handleOnClick = (e) => {
		e.preventDefault();
		const targetId = target.replace(/.*\#/, "");
		const elem = document.getElementById(targetId);
		// elem?.scrollIntoView({
		// 	behavior: "smooth",
		// });
		console.log(targetId);
		window.scrollTo({
			top: elem?.getBoundingClientRect().top - 100,
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

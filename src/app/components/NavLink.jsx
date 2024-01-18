import Link from "next/link";

const NavLink = ({ href, title, hideMainOverLay }) => {
	const handleOnClick = (e) => {
		e.preventDefault();
		const href = e.currentTarget.href;
		const targetId = href.replace(/.*\#/, "");
		const elem = document.getElementById(targetId);
		elem?.scrollIntoView({
			behavior: "smooth",
		});
		hideMainOverLay();
	};

	return (
		<div>
			<Link
				href={href}
				className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
				onClick={(e) => {
					handleOnClick(e);
				}}
			>
				{title}
			</Link>
		</div>
	);
};

export default NavLink;

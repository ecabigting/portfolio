import React from "react";

function ProjectTag({ name, onClick, isSelected }) {
	const btnStyles = isSelected ? "text-white border-orange-500" : "text-[#ADB7BE] border-slate-600 hover:border-white";
	return (
		<button
			className={`'${btnStyles} rounded-full border-2 py-3 px-6 text-xl cursor-pointer'`}
			onClick={() => onClick(name)}
		>
			{name}
		</button>
	);
}

export default ProjectTag;

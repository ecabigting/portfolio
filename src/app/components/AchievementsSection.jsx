import React from "react";

const achievementsList = [
	{
		metric: "Experience",
		value: "10+",
	},
	{
		metric: "Projects",
		value: "15+",
	},
	{
		metric: "Users",
		value: "100k+",
	},
	{
		metric: "Teams",
		value: "10+",
	},
];

const AchievementsSection = () => {
	return (
		<div className='py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
			<div className='border-[#33353F] border rounded-md py-8 px-16 flex flex-row items-center justify-between'>
				{achievementsList.map((achi, index) => {
					return (
						<div key={index} className='flex flex-col items-center justify-center mx-4'>
							<h2 className='text-white text-4xl font-bold'>{achi.value}</h2>
							<p className='text-[#ADB7BE] text-base'>{achi.metric}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AchievementsSection;

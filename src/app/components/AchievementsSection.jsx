"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
	() => {
		return import("react-animated-numbers");
	},
	{ ssr: false }
);

const achievementsList = [
	{
		metric: "Years",
		value: "10",
		postfix: "+",
	},
	{
		metric: "Projects",
		value: "15",
		postfix: "+",
	},
	{
		prefix: "~",
		metric: "Users",
		value: "100000",
	},
	{
		metric: "Teams",
		value: "10",
		postfix: "+",
	},
];

const AchievementsSection = () => {
	return (
		<div className='py-8 px-4'>
			<div className='border-[#33353F] border rounded-md py-8 flex flex-row items-center justify-between'>
				{achievementsList.map((achi, index) => {
					return (
						<div key={index} className='flex flex-col items-center justify-center mx-2'>
							<h2 className='text-white font-bold flex flex-row text-sm px-2 md:text-4xl lg:px-16'>
								{achi.prefix}
								<AnimatedNumbers
									includeComma
									animateToNumber={parseInt(achi.value)}
									locale='en-US'
									className='sm:text-md'
									configs={(_, index) => {
										return {
											mass: 1,
											friction: 100,
											tensions: 140 * (index + 1),
										};
									}}
								/>
								{achi.postfix}
							</h2>
							<p className='text-[#ADB7BE] text-xs md:text-base'>{achi.metric}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AchievementsSection;

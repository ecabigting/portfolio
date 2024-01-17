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
		metric: "Year of Experience",
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
		metric: "Users Reached",
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
		<div className='py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
			<div className='border-[#33353F] border rounded-md py-8 px-16 flex flex-row items-center justify-between'>
				{achievementsList.map((achi, index) => {
					return (
						<div key={index} className='flex flex-col items-center justify-center mx-4'>
							<h2 className='text-white text-4xl font-bold flex flex-row'>
								{achi.prefix}
								<AnimatedNumbers
									includeComma
									animateToNumber={parseInt(achi.value)}
									locale='en-US'
									className='text-white text-4xl font-bold'
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
							<p className='text-[#ADB7BE] text-base'>{achi.metric}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AchievementsSection;

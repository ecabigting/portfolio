"use client";
import React from "react";
import Image from "next/image"
import { TypeAnimation } from 'react-type-animation';

export const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center pr-3 sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 
            via-white-400 to-yellow-400 mr-4 bg-white">Hey! I'm Eric!{" "}</span>
            <br/>
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'A Full-stack dev',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Lets code!',
                    1000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Nostrud adipisicing reprehenderit dolore in incididunt eu et elit sunt non ea.
          </p>
          <div>
            <button className="px-6 py-3 w-full sm:w-fit rounded-full 
            bg-gradient-to-br from-red-500 via-white-500 to-yellow-500 
            mr-4 bg-white hover:bg-slate-200 text-white">
              Hire me!
            </button>
            <button className="px-1 py-1 w-full sm:w-fit rounded-full 
            bg-gradient-to-br from-red-500 via-white-500 to-yellow-500 
            mt-3 hover:bg-slate-800 text-white">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-3">Download CV!</span>
            </button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full w-[250px] h-[250px] lg:w-[250px] lg:h-[250px] relative mt-4
            bg-gradient-to-r from-red-400 via-white-400 to-yellow-400 bg-[#181818] ">
            <Image 
            src="/images/hero-image.png" 
            alt="Hero"
            className=" rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
            width={250} 
            height={250}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
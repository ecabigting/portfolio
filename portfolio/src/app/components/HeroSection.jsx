import React from "react";
import Image from "next/image"

export const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-7 place-self-center">
          <h1 className="text-white mb-4 text-4xl lg:text-6xl font-extrabold">ecabigting</h1>
          <p className="text-[#ADB7BE] text-lg mb-5 lg:text-xl">
            Nostrud adipisicing reprehenderit dolore in incididunt eu et elit sunt non ea.
          </p>
          <div>
            <button className="px-6 py-3 rounded-full mr-4 bg-white hover:bg-slate-200 text-black">Hire me!</button>
            <button className="px-6 py-3 rounded-full bg-transparent hover:bg-slate-800 text-white border border-white mt-3">Download CV!</button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[300px] h-[300px] lg:w-[300px] lg:h-[300px] relative mt-4">
            <Image 
            src="/images/hero-image.png" 
            alt="Hero"
            className=" rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
            width={300} 
            height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

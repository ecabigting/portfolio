import React from "react"
import image from "../home-main-bg.jpg"

export default function Home() {
    return (
        <main>
            <img src={image} alt="lets code!" className="absolute object-cover w-full h-full"/>
            <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8 bg-black bg-opacity-40">
                <h1 className="text-9xl text-white regular-text lg:leading-snug">...lets &#123;code&#125;</h1>
            </section>
        </main>
    );
}
import React from "react"
import { NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

export default function NavBar() {
    return (
        <header className="bg-gray-800">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink to="/" 
                    exact 
                    activeClassName="text-white"
                    className="inflex-flex items-center py-8 px-3 mr-4 text-white font-bold regular-text text-4xl tracking-widest text-gray-100">
                        ecabigting
                    </NavLink>

                    <NavLink 
                    to="/post"
                    activeClassName="text-white"
                    className="inline-flex items-center py-4 px-3 my-6 text-gray-100 hover:underline">
                        Blog Posts
                    </NavLink>

                    <NavLink 
                    to="/project"
                    activeClassName="text-white"
                    className="inline-flex items-center py-4 px-3 my-6 text-gray-100 hover:underline">
                        Projects
                    </NavLink>

                    <NavLink 
                    to="/about"
                    activeClassName="text-white"
                    className="inline-flex items-center py-4 px-3 my-6 text-gray-100 hover:underline">
                        About
                    </NavLink>
                </nav>
                <div className="inline-flex py-4 px-3 my-6">
                    <SocialIcon url="mailto:ecabigting@outlook.com" className="mr-3" target="_blank" fgColor="#fff" style={{ height:35, width: 35}}/>
                    <SocialIcon url="https://www.github.com/ecabigting/" className="mr-3" target="_blank" fgColor="#000" bgColor="#fff" style={{ height:35, width: 35}}/>
                    <SocialIcon url="https://www.linkedin.com/in/ecabigting/" className="mr-3" target="_blank" fgColor="#fff" style={{ height:35, width: 35}}/>
                </div>
            </div>
        </header>
    );
}
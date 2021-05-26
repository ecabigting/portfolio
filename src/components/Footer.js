import React from "react"
import { NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

export default function Footer() {
    return (
        <footer className="bg-gray-800 w-full">
            <div className="container mx-auto flex justify-between">
                <nav className="flex flex-col my-6">
                    <NavLink to="/" 
                    exact 
                    activeClassName="text-white"
                    className="flex-col items-center px-3 my-1 text-gray-100 hover:underline">
                        ecabigting
                    </NavLink>

                    <NavLink 
                    to="/post"
                    activeClassName="text-white"
                    className="flex-col items-center px-3 my-1 text-gray-100 hover:underline">
                        Blog
                    </NavLink>

                    <NavLink 
                    to="/project"
                    activeClassName="text-white"
                    className="flex-col items-center px-3 my-1 text-gray-100 hover:underline">
                        Projects
                    </NavLink>

                    <NavLink 
                    to="/about"
                    activeClassName="text-white"
                    className="flex-col items-center px-3 my-1 text-gray-100 hover:underline">
                        About
                    </NavLink>
                </nav>
                <div className="inline-flex px-2 my-8 text-white text-xs lg:text-md">
                    Copyright &copy; - 2021
                </div>
                <div className="inline-flex px-3 my-6">
                    <SocialIcon url="mailto:ecabigting@outlook.com" className="mr-3" target="_blank" fgColor="#fff" style={{ height:35, width: 35}}/>
                    <SocialIcon url="https://www.github.com/ecabigting/" className="mr-3" rel="noopner noreferrer" target="_blank" fgColor="#000" bgColor="#fff" style={{ height:35, width: 35}}/>
                    <SocialIcon url="https://www.linkedin.com/in/ecabigting/" className="mr-3" rel="noopner noreferrer" target="_blank" fgColor="#fff" style={{ height:35, width: 35}}/>
                </div>
            </div>
        </footer>
    );
}
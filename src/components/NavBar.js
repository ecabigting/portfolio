import React from "react"
import { NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

export default function NavBar() {
    return (
        <header className="lg:px-16 px-6 bg-gray-800 flex flex-wrap items-center text-white lg:py-0 py-2">
            <div className="flex-1 flex justify-between items-center">
                <NavLink to="/" 
                exact 
                activeclassName="text-white"
                className="inflex-flex items-center py-8 px-3 mr-4 text-white font-bold regular-text text-4xl tracking-widest text-gray-100">
                ecabigting
                </NavLink>
            </div>
        
        <label for="menu-toggle" className="pointer-cursor lg:hidden block"><svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
        <input className="hidden" type="checkbox" id="menu-toggle"/>
        
        <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
            <nav>
                <div className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                    <NavLink 
                    to="/project"
                    activeClassName="text-white"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-white hover:underline ">
                        Projects
                    </NavLink>

                    <NavLink 
                    to="/post"
                    activeClassName="text-white"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-white hover:underline ">
                        Blog
                    </NavLink>

                    <NavLink 
                    to="/about"
                    activeClassName="text-white"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-white hover:underline ">
                        About
                    </NavLink>
                </div>
            </nav>
            <div className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor">
                <SocialIcon url="https://www.github.com/ecabigting/" className="mr-3 rounded-full border-2 border-transparent hover:border-white" target="_blank" fgColor="#000" bgColor="#fff" style={{ height:35, width: 35}}/>
                <SocialIcon url="https://www.linkedin.com/in/ecabigting/" className="mr-3 rounded-full border-2 border-transparent hover:border-white" target="_blank" fgColor="#fff" style={{ height:35, width: 35}}/>
            </div>
        </div>
        
        </header>
    );
}
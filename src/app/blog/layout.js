import React from "react";
import BlogNavbar from "../components/BlogNavbar";

export default function Layout({ children }) {
	return (
		<>
			<BlogNavbar />
			{children}
		</>
	);
}

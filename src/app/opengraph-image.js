import { ImageResponse } from "next/og";
import { Inter } from "next/font/google";
import React from "react";

const websiteURL = process.env.NODE_ENV === "production" ? "https://ericcabigting.dev/" : "http://localhost:3000/";

const inter = Inter({
	weight: "400",
	subsets: ["latin"],
});

export const contenType = "image/png";

export default async function Image() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 184,
					background: "black",
					color: "white",
					width: "100%",
					height: "100%",
					display: "block",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "black",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "350px 65px",
					backgroundSize: "cover",
					backgroundImage: `url(${websiteURL}images/actual-hero-image.png)`,
				}}
			></div>
		),
		// ImageResponse options
		{
			width: 1200,
			height: 630,
		}
	);
}

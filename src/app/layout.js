import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	metadataBase: new URL("https://ericcabigting.dev"),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-US",
			"de-DE": "/de-DE",
		},
	},
	title: "ecabigting",
	description:
		"With my experience in software development spanning over a decade.  I can help you navigate the confusing world of building your own custom software. From planning, designing, to deployment!",
	openGraph: {
		title: "Eric Thomas D. Cabigting",
		description:
			"With my experience in software development spanning over a decade.  I can help you navigate the confusing world of building your own custom software. From planning, designing, to deployment!",
		url: "https://ericcabigting.dev",
		siteName: "ecabigting - developer portfolio",
		images: [
			{
				url: "https://ericcabigting.dev/_ipx/w_256,q_75/%2Fimages%2Fhero-image.png", // Must be an absolute URL
				width: 800,
				height: 600,
			},
			{
				url: "https://ericcabigting.dev/_ipx/w_256,q_75/%2Fimages%2Fhero-image.png", // Must be an absolute URL
				width: 1800,
				height: 1600,
				alt: "eric thomas cabigting, developer portfolio",
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}

import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import EmailSection from "./components/EmailSection";
import Script from "next/script";
import "./globals.css";
import React from "react";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://ericcabigting.dev"),
  alternates: {
    canonical: "/",
  },
  title: "ecabigting",
  description: "Experienced full-stack developer specializing in building efficient, scalable software solutions. Proficient in Golang, C#.NET, TypeScript, JavaScript, ReactJS, and various databases. With a track record of delivering successful projects across government, hospitality, and e-commerce industries, I'm dedicated to crafting innovative software that drives business growth.",
  openGraph: {
    title: "Eric Thomas D. Cabigting",
    description:
      "Experienced full-stack developer specializing in building efficient, scalable software solutions. Proficient in Golang, C#.NET, TypeScript, JavaScript, ReactJS, and various databases. With a track record of delivering successful projects across government, hospitality, and e-commerce industries, I'm dedicated to crafting innovative software that drives business growth.",
    url: "https://ericcabigting.dev",
    siteName: "ecabigting - fullstack dev",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_KEY}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.REACT_APP_GA_KEY}', {
            page_path: window.location.pathname,
            });
			`,
        }}
      />
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col bg-[#121212] '>
          <div className='mt-24 p-4 py-4'>{children}</div>
          <EmailSection />
          <Footer />
        </main>
      </body>
    </html>
  );
}

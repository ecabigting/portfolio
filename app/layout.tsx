import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Suspense } from "react";



export const metadata: Metadata = {
  metadataBase: new URL("https://ericcabigting.dev"),
  alternates: {
    canonical: "/",
  },
  title: "ecabigting",
  description: "Experienced full-stack developer specializing in building efficient, scalable software solutions. Proficient in Python, Golang, C#.NET, TypeScript, JavaScript, ReactJS, and various databases. With a track record of delivering successful projects across government, hospitality, and e-commerce industries, I'm dedicated to crafting innovative software that drives business growth.",
  openGraph: {
    title: "Eric Thomas D. Cabigting",
    description:
      "Experienced full-stack developer specializing in building efficient, scalable software solutions. Proficient in Python, Go lang, C#.NET, TypeScript, JavaScript, ReactJS, and various databases. With a track record of delivering successful projects across government, hospitality, and e-commerce industries, I'm dedicated to crafting innovative software that drives business growth.",
    url: "https://ericcabigting.dev",
    siteName: "ecabigting - fullstack dev",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-zinc-950 dark:bg-black dark:text-zinc-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}><Footer /></Suspense>

      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}

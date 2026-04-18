import Image from "next/image";
import { getFooterContent } from "@/lib/sanity";
export default async function Footer() {

  const footerData = await getFooterContent();
  return (
    <footer className="w-full border-t border-zinc-200 py-4 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between px-6 md:flex-row">
        {/* Copyright - Left on Desktop, Center on Mobile */}
        <p className="text-sm">
          ©  {footerData.year?.split("T")[0].split("-")[0]} ecabigting. All Rights Reserved.
        </p>
        {/* Social Icons - Right on Desktop, Center on Mobile */}
        <div className="mt-2 flex gap-4 md:mt-0">
          {footerData.githubLink && (
            <a
              href={footerData.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub"
              className="transition-opacity hover:opacity-70 text-zinc-900 dark:text-white"
            >
              <Image
                src="/images/github-icon.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>)}
          {footerData.linkedinLink && (
            <a
              href={footerData.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
              className="transition-opacity hover:opacity-70 text-zinc-900 dark:text-white"
            >
              <Image
                src="/images/linkedin-icon.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                style={{ fill: 'currentColor' }}
                unoptimized={true}
              />
            </a>)}
        </div>
      </div>
    </footer>
  );
}

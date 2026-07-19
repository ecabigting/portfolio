import Link from "next/link";
import { getFooterContent } from "@/lib/sanity";

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="currentColor">
    <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 31.66536 35.956939 38.122519 29 40.251953 L 29 35.136719 C 29 33.226635 27.899316 31.588619 26.308594 30.773438 A 10 8 0 0 0 32.4375 18.720703 C 32.881044 17.355414 33.376523 14.960672 32.199219 13.076172 C 29.929345 13.076172 28.464667 14.632086 27.765625 15.599609 A 10 8 0 0 0 24 15 A 10 8 0 0 0 20.230469 15.59375 C 19.529731 14.625773 18.066226 13.076172 15.800781 13.076172 C 14.449711 15.238817 15.28492 17.564557 15.732422 18.513672 A 10 8 0 0 0 21.681641 30.779297 C 20.3755 31.452483 19.397283 32.674042 19.097656 34.15625 L 17.783203 34.15625 C 16.486203 34.15625 15.98225 33.629234 15.28125 32.740234 C 14.58925 31.851234 13.845172 31.253859 12.951172 31.005859 C 12.469172 30.954859 12.144453 31.321484 12.564453 31.646484 C 13.983453 32.612484 14.081391 34.193516 14.650391 35.228516 C 15.168391 36.160516 16.229687 37 17.429688 37 L 19 37 L 19 40.251953 C 12.043061 38.122519 7 31.66536 7 24 C 7 14.593391 14.593385 7 24 7 z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z" />
  </svg>
);

function splitForBotProtection(text: string): Array<{ text: string; reversed: boolean }> {
  const parts = text.split("").map((char, i) => ({
    text: char,
    reversed: i % 2 === 1,
  }));
  return parts;
}

function renderProtectedText(text: string) {
  const parts = splitForBotProtection(text);
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={{ display: "inline-block", unicodeBidi: "bidi-override", direction: part.reversed ? "rtl" : "ltr" }}
        >
          {part.text}
        </span>
      ))}
    </span>
  );
}

// function renderProtectedHref(href: string) {
//   const parts = splitForBotProtection(href);
//   return (
//     <a href={`${parts.map((p) => p.text).join("")}`}>
//       {parts.map((part, i) => (
//         <span
//           key={i}
//           style={{ display: "inline-block", unicodeBidi: "bidi-override", direction: part.reversed ? "rtl" : "ltr" }}
//         >
//           {part.text}
//         </span>
//       ))}
//     </a>
//   );
// }

export default async function Footer() {
  const footerData = await getFooterContent();

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        {/* Column 1: Recent Blog Posts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Recent Posts
          </h3>
          <ul className="flex flex-col gap-2">
            {footerData.recentPosts?.slice(0, 5).map((post) =>
              post.slug ? (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    {post.title || "Untitled"}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Column 2: Quick Nav */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/blog"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Projects
              </Link>
            </li>
            {footerData.cvLink && (
              <li>
                <a
                  href={footerData.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Download My CV
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Contact
          </h3>
          <div className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            {footerData.email && (
              <div className="flex items-center gap-2">
                <span className="shrink-0">
                  <EmailIcon />
                </span>
                <span>{renderProtectedText(footerData.email)}</span>
              </div>
            )}
            {footerData.phone && (
              <div className="flex items-center gap-2">
                <span className="shrink-0">
                  <PhoneIcon />
                </span>
                <span>{renderProtectedText(footerData.phone)}</span>
              </div>
            )}
            {footerData.location && (
              <div className="flex items-center gap-2">
                <span className="shrink-0">
                  <LocationIcon />
                </span>
                <span>{footerData.location}</span>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-2 flex gap-4">
            {footerData.githubLink && (
              <a
                href={footerData.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <GitHubIcon />
              </a>
            )}
            {footerData.linkedinLink && (
              <a
                href={footerData.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-8 max-w-5xl border-t border-zinc-200 px-6 pt-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        © {footerData.year?.split("T")[0].split("-")[0]} ecabigting. All rights reserved.
      </div>
    </footer>
  );
}

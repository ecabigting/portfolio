"use client";
import { useState } from "react";
import Link from "next/link";
interface NavLink {
  href: string;
  label: string;
}
interface MobileNavProps {
  links: NavLink[];
}
export default function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-zinc-900 dark:text-zinc-50 outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-16 z-40 w-full border-b border-zinc-200 bg-white/95 p-6 backdrop-blur-md dark:border-zinc-800 dark:bg-black/95">
          <nav className="flex flex-col gap-4 text-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

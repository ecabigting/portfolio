import Link from "next/link";
import MobileNav from "./MobileNav";
// Single Source of Truth for navigation
const navLinks = [
  { href: "/blog", label: "blog" },
  // { href: "/projects", label: "projects" },
  // { href: "/about", label: "about" },
  // { href: "/contact", label: "contact" },
];
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          ecabigting
        </Link>

        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* <MobileNav links={navLinks} /> */}
      </div>
    </header>
  );
}

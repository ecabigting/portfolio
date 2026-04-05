export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 py-4 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 text-center md:text-left">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} ecabigting. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;
  const getPageUrl = (page: number) => {
    if (page === 1) return "/blog";
    return `/blog/page/${page}`;
  };
  const maxPagesToShow = 5;
  const pagesToShow = Math.min(totalPages, maxPagesToShow);
  return (
    <nav className="flex items-center justify-center gap-4 mt-12" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Previous page"
        >
          ←
        </Link>
      ) : (
        <span className="p-2 text-zinc-300 cursor-not-allowed" aria-hidden="true">←</span>
      )}
      <div className="flex gap-1">
        {Array.from({ length: pagesToShow }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`w-10 h-10 p-4 flex items-center justify-center text-sm rounded ${page === currentPage
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
          >
            {page}
          </Link>
        ))}
      </div>
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Next page"
        >
          →
        </Link>
      ) : (
        <span className="p-2 text-zinc-300 cursor-not-allowed" aria-hidden="true">→</span>
      )}
    </nav>
  );
}

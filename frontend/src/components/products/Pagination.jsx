import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getPageNumbers = (currentPage, totalPages) => {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const adjustedStart = Math.max(1, end - 4);

  return Array.from({ length: end - adjustedStart + 1 }, (_, index) => adjustedStart + index);
};

const Pagination = ({ meta, isLoading, onPageChange }) => {
  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;
  const total = meta?.total || 0;
  const limit = meta?.limit || 10;
  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);
  const pages = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages]);

  if (totalPages <= 1 && total <= limit) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-slate-600">
        Showing <span className="text-slate-950">{startItem}-{endItem}</span> of{' '}
        <span className="text-slate-950">{total}</span> products
      </p>
      <div className="flex items-center gap-2">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || currentPage <= 1}
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1">
          {pages.map(pageNumber => (
            <button
              className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-bold transition ${
                pageNumber === currentPage
                  ? 'border-teal-700 bg-teal-700 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
              type="button"
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={isLoading || pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || currentPage >= totalPages}
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

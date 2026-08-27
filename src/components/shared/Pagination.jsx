import React from 'react'

function Pagination({
  page = 1,
  totalPages = 1,
  itemsCount = 0,
  totalCount = 0,
  onPageChange,
}) {
  const isFirstPage = page <= 1
  const isLastPage = page >= totalPages || totalPages === 0

  const btnClass =
    'px-3 py-1.5 rounded-xl border border-sand-200 text-sand-700 transition-colors hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-sand-200 bg-sand-50/80 px-6 py-4 text-sand-700 sm:flex-row">
      <p className="text-sm text-sand-600">
        نمایش{' '}
        <span className="font-semibold text-sand-800">{itemsCount}</span> از{' '}
        <span className="font-semibold text-sand-800">{totalCount}</span> درخواست
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          title="صفحه اول"
          className={btnClass}
        >
          <i className="bi bi-chevron-double-right" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={isFirstPage}
          title="صفحه قبلی"
          className={btnClass}
        >
          <i className="bi bi-chevron-right" />
        </button>

        <span className="min-w-[70px] rounded-xl border border-sand-200 bg-sand-100 px-4 py-1.5 text-center text-sm font-medium text-sand-800">
          {totalPages === 0 ? '۰ / ۰' : `${page} / ${totalPages}`}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={isLastPage}
          title="صفحه بعدی"
          className={btnClass}
        >
          <i className="bi bi-chevron-left" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          title="صفحه آخر"
          className={btnClass}
        >
          <i className="bi bi-chevron-double-left" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
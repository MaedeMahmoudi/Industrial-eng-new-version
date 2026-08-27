import React from 'react'
import { motion } from 'framer-motion'
import { typeFilterOptions } from '../../requests/constants'

const statusButtonOptions = [
  { value: 'all', label: 'همه وضعیت‌ها', icon: 'bi-files' },
  { value: 'pending', label: 'منتظر تأیید', icon: 'bi-clock-history' },
  { value: 'approved', label: 'تأیید شده', icon: 'bi-check-circle-fill' },
  { value: 'rejected', label: 'رد شده', icon: 'bi-x-circle-fill' },
]

const baseFilterButtonClass = `
  inline-flex items-center justify-center gap-2
  rounded-xl
  px-4 py-2
  text-sm font-medium
  transition-all duration-200
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-500/30
`

function RequestsPageFilters({
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  searchTerm,
  onSearch,
  isExporting,
  hasRequests,
  onExportExcel,
  onExportPDF,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4">
        {/* Status Filters */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-slate-500">وضعیت درخواست</span>

          <div className="flex flex-wrap gap-2">
            {statusButtonOptions.map((opt) => {
              const isActive = statusFilter === opt.value

              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStatusChange(opt.value)}
                  className={`${baseFilterButtonClass} ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <i className={`bi ${opt.icon}`} aria-hidden="true" />
                  <span>{opt.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden="true" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Other Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Request Type */}
          <div className="shrink-0">
            <label htmlFor="request-type-filter" className="sr-only">
              نوع درخواست
            </label>
            <select
              id="request-type-filter"
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full min-w-[180px] cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              {typeFilterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <i
              className="bi bi-search pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="request-search" className="sr-only">
              جستجوی درخواست‌ها
            </label>
            <input
              id="request-search"
              type="search"
              value={searchTerm}
              onChange={onSearch}
              placeholder="جستجو در کد پیگیری، دانشجو، شماره دانشجویی..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Export */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={onExportExcel}
              disabled={isExporting || !hasRequests}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <i className="bi bi-file-earmark-excel" aria-hidden="true" />
              {isExporting ? '...' : 'Excel'}
            </button>

            <button
              type="button"
              onClick={onExportPDF}
              disabled={isExporting || !hasRequests}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <i className="bi bi-file-earmark-pdf" aria-hidden="true" />
              {isExporting ? '...' : 'PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestsPageFilters
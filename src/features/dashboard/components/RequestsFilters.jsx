import React from 'react'
import { statusFilterOptions, typeFilterOptions } from '../../requests/constants'

function RequestsFilters({
  totalCount,
  searchQuery,
  onSearch,
  statusFilter,
  onStatusFilter,
  typeFilter,
  onTypeFilter,
  isExporting,
  hasRequests,
  onExportExcel,
  onExportPDF,
}) {
  return (
    <div className="p-6 border-b border-orange-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            📋 درخواست‌ها
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {totalCount} درخواست
          </p>
        </div>

        {/* دکمه‌های خروجی */}
        <div className="flex gap-2">
          <button
            onClick={onExportExcel}
            disabled={isExporting || !hasRequests}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="bi bi-file-earmark-excel"></i>
            {isExporting ? 'در حال بارگیری...' : 'خروجی Excel'}
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting || !hasRequests}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="bi bi-file-earmark-pdf"></i>
            {isExporting ? 'در حال بارگیری...' : 'خروجی PDF'}
          </button>
        </div>
      </div>

      {/* فیلترها */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* جستجو */}
        <div className="flex-1 relative">
          <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={onSearch}
            placeholder="جستجو در کد پیگیری، نام دانشجو یا نوع درخواست..."
            className="w-full px-4 py-2.5 pr-12 rounded-xl border-2 border-orange-100 bg-orange-50/30 text-slate-800 
                       focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
          />
        </div>

        {/* فیلتر وضعیت */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-orange-100 bg-orange-50/30 text-slate-800 
                     focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 min-w-[140px]"
        >
          {statusFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* فیلتر نوع درخواست */}
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-orange-100 bg-orange-50/30 text-slate-800 
                     focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 min-w-[140px]"
        >
          {typeFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RequestsFilters
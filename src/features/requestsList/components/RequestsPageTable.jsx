import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBadge from '../../../components/shared/StatusBadge'

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.28, ease: 'easeOut' },
  }),
}

const tableHeaderClass =
  'px-6 py-3 text-right text-xs font-semibold text-slate-500'

const tableCellClass = 'px-6 py-4 text-sm text-slate-700'

function RequestsPageTable({
  requests,
  isLoading,
  isError,
  onRetry,
  hasActiveFilters,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-slate-50">
          <tr>
            <th className={tableHeaderClass}>کد پیگیری</th>
            <th className={tableHeaderClass}>نوع درخواست</th>
            <th className={tableHeaderClass}>دانشجو</th>
            <th className={tableHeaderClass}>شماره دانشجویی</th>
            <th className={`${tableHeaderClass} text-center`}>تاریخ</th>
            <th className={`${tableHeaderClass} text-center`}>وضعیت</th>
            <th className={`${tableHeaderClass} text-center`}>عملیات</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="px-6 py-4">
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
                </div>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50">
                    <i
                      className="bi bi-exclamation-triangle text-2xl text-rose-500"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 font-medium text-slate-700">
                    خطا در دریافت درخواست‌ها
                  </p>
                  <p className="mt-1 text-sm text-slate-400">لطفاً دوباره تلاش کنید.</p>
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                  >
                    <i className="bi bi-arrow-clockwise" aria-hidden="true" />
                    تلاش مجدد
                  </button>
                </div>
              </td>
            </tr>
          ) : requests.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <i
                      className="bi bi-inbox text-3xl text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-medium text-slate-600">
                    {hasActiveFilters
                      ? 'هیچ درخواستی با این فیلترها یافت نشد.'
                      : 'هنوز هیچ درخواستی ثبت نشده است.'}
                  </p>
                  {hasActiveFilters && (
                    <p className="text-sm text-slate-400">
                      فیلترها را تغییر دهید و دوباره جستجو کنید.
                    </p>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            requests.map((req, index) => (
              <motion.tr
                key={req.trackingCode || index}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="group transition-colors duration-200 hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-indigo-600 transition group-hover:text-indigo-700">
                    {req.trackingCode}
                  </span>
                </td>

                <td className={tableCellClass}>{req.type}</td>
                <td className={tableCellClass}>{req.studentName}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{req.studentId}</td>
                <td className="px-6 py-4 text-center text-sm text-slate-500">
                  {req.date || '—'}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/admin/request-detail/${req.trackingCode}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3.5 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                  >
                    <i className="bi bi-eye" aria-hidden="true" />
                    مشاهده
                  </Link>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RequestsPageTable
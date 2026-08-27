import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBadge from '../../../components/shared/StatusBadge'

function RequestsTable({ requests, isLoading, isError, onRetry, isAdmin, onOpenActionModal }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-rose-500">
        <i className="bi bi-exclamation-triangle text-3xl"></i>
        <p className="mt-2">خطا در دریافت درخواست‌ها</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <i className="bi bi-inbox text-4xl"></i>
        <p className="mt-2">هیچ درخواستی با این فیلترها یافت نشد</p>
      </div>
    )
  }

  return (
    <table className="w-full min-w-[700px]">
      <thead className="bg-orange-50/60">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
            کد پیگیری
          </th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
            نوع درخواست
          </th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
            دانشجو
          </th>
          <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            تاریخ
          </th>
          <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            وضعیت
          </th>
          <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            عملیات
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-orange-50">
        {requests.map((req, index) => (
          <motion.tr
            key={req.trackingCode}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className="hover:bg-orange-50/50 transition-colors duration-200"
          >
            <td className="px-6 py-4">
              <span className="font-bold text-orange-700 text-sm">{req.trackingCode}</span>
            </td>
            <td className="px-6 py-4 text-sm text-slate-700">{req.type}</td>
            <td className="px-6 py-4 text-sm text-slate-700">{req.studentName}</td>
            <td className="px-6 py-4 text-sm text-center text-slate-500">{req.date}</td>
            <td className="px-6 py-4 text-center">
              <StatusBadge status={req.status} />
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <Link
                  to={`/admin/request-detail/${req.trackingCode}`}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <i className="bi bi-eye"></i>
                  مشاهده
                </Link>

                {isAdmin && req.status === 'pending' && (
                  <button
                    onClick={() => onOpenActionModal(req)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <i className="bi bi-pencil"></i>
                    تصمیم
                  </button>
                )}
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  )
}

export default RequestsTable
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function RequestDetailLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-400 animate-spin" />

          <i className="bi bi-file-earmark-text text-xl text-violet-500" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            در حال بارگذاری درخواست
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            لطفاً چند لحظه صبر کنید...
          </p>
        </div>
      </div>
    </div>
  )
}

export function RequestDetailNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="
            mx-auto mb-6
            flex h-24 w-24 items-center justify-center
            rounded-3xl
            bg-rose-50 dark:bg-rose-950/30
            text-rose-500 dark:text-rose-400
          "
        >
          <i className="bi bi-file-earmark-x text-5xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            درخواست یافت نشد
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            درخواست موردنظر پیدا نشد یا کد پیگیری واردشده نامعتبر است.
          </p>

          <Link
            to="/admin/requests"
            className="
              mt-7 inline-flex items-center justify-center gap-2
              rounded-xl
              bg-violet-600 px-6 py-3
              text-sm font-semibold text-white
              shadow-lg shadow-violet-500/20
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-violet-700
              hover:shadow-xl hover:shadow-violet-500/25
              focus:outline-none
              focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
              dark:focus:ring-offset-slate-950
            "
          >
            <i className="bi bi-arrow-right" />
            بازگشت به لیست درخواست‌ها
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
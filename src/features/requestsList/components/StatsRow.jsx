import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ label, value, icon, iconClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35, ease: 'easeOut' }}
    whileHover={{ y: -2 }}
    className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
  >
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight text-slate-800">{value}</p>
        <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
      </div>
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconClass}`}
      >
        <i className={`bi ${icon} text-lg`} aria-hidden="true" />
      </div>
    </div>
  </motion.div>
)

function StatsRow({ stats, isLoading, isError, onRetry }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-7 w-12 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100">
            <i
              className="bi bi-exclamation-triangle text-xl text-rose-500"
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 font-medium text-rose-700">خطا در دریافت آمار</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
          >
            <i className="bi bi-arrow-clockwise" aria-hidden="true" />
            تلاش مجدد
          </button>
        </div>
      </div>
    )
  }

  const cards = [
    {
      label: 'همه درخواست‌ها',
      value: stats?.total ?? 0,
      icon: 'bi-files',
      iconClass: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'منتظر تأیید',
      value: stats?.pending ?? 0,
      icon: 'bi-clock-history',
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'تأیید شده',
      value: stats?.approved ?? 0,
      icon: 'bi-check-circle-fill',
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'رد شده',
      value: stats?.rejected ?? 0,
      icon: 'bi-x-circle-fill',
      iconClass: 'bg-rose-50 text-rose-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 0.05} />
      ))}
    </div>
  )
}

export default StatsRow
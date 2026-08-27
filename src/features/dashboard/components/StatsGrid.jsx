import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ label, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="relative overflow-hidden rounded-2xl bg-white border border-orange-100 p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
      </div>
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <i className={`bi ${icon}`}></i>
      </div>
    </div>
    <div
      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    ></div>
  </motion.div>
)

function StatsGrid({ stats, isLoading, isError, onRetry }) {
  const statCards = stats
    ? [
        {
          label: 'کل درخواست‌ها',
          value: stats.total,
          icon: 'bi-files',
          color: 'from-orange-500 to-amber-500',
        },
        {
          label: 'منتظر تایید',
          value: stats.pending,
          icon: 'bi-clock-history',
          color: 'from-amber-400 to-orange-400',
        },
        {
          label: 'تایید شده',
          value: stats.approved,
          icon: 'bi-check-circle-fill',
          color: 'from-emerald-500 to-teal-500',
        },
        {
          label: 'رد شده',
          value: stats.rejected,
          icon: 'bi-x-circle-fill',
          color: 'from-rose-500 to-rose-600',
        },
      ]
    : []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-white border border-orange-100 p-6 animate-pulse">
            <div className="h-4 bg-orange-100 rounded w-24"></div>
            <div className="h-8 bg-orange-100 rounded w-16 mt-2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center text-rose-500 py-8 bg-white rounded-2xl border border-orange-100">
        <i className="bi bi-exclamation-triangle text-4xl"></i>
        <p className="mt-2">خطا در دریافت آمار</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <StatCard key={card.label} {...card} delay={index * 0.05} />
      ))}
    </div>
  )
}

export default StatsGrid
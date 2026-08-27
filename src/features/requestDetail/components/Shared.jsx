import React from 'react'

// ============================================
// پیکربندی تفصیلی وضعیت درخواست
// ============================================

export const statusDetailConfig = {
  pending: {
    label: 'منتظر تأیید',
    icon: 'bi-clock-history',
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-500',
  },

  approved: {
    label: 'تأیید شده',
    icon: 'bi-check-circle-fill',
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-500',
  },

  rejected: {
    label: 'رد شده',
    icon: 'bi-x-circle-fill',
    color: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
    badge: 'bg-rose-500',
  },
}

// ============================================
// کارت اطلاعات
// ============================================

export const InfoCard = ({ label, value, icon }) => (
  <div
    className="
      rounded-xl
      border border-slate-200/80 dark:border-slate-700
      bg-white dark:bg-slate-800/60
      p-4
      transition-all duration-200
      hover:-translate-y-0.5
      hover:border-slate-300
      hover:bg-slate-50
      hover:shadow-sm
      dark:hover:border-slate-600
      dark:hover:bg-slate-800
    "
  >
    <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <i className={`bi ${icon}`} aria-hidden="true"></i>
      {label}
    </p>

    <p className="mt-1 break-words font-semibold text-slate-800 dark:text-slate-100">
      {value}
    </p>
  </div>
)
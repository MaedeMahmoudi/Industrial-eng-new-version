import React from 'react'
import { motion } from 'framer-motion'
import { statusDetailConfig } from './shared'

function RequestStatusBanner({ request, variants }) {
  const status =
    statusDetailConfig[request.status] ||
    statusDetailConfig.pending

  return (
    <motion.div
      variants={variants}
      className={`
        group relative overflow-hidden
        rounded-2xl border
        ${status.bg} ${status.border}
        p-4 sm:p-5 lg:p-6
        shadow-sm transition-shadow duration-300
        hover:shadow-md
      `}
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]
        "
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Status Icon */}
        <div
          className={`
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-xl sm:h-14 sm:w-14
            ${status.badge}
            text-xl text-white sm:text-2xl
            shadow-md
            transition-transform duration-300
            group-hover:scale-105
          `}
          aria-hidden="true"
        >
          <i className={`bi ${status.icon}`} />
        </div>

        {/* Status Information */}
        <div className="min-w-0 flex-1">
          <p
            className={`
              mb-1 text-base font-bold
              sm:text-lg
              ${status.color}
            `}
          >
            {status.label}
          </p>

          <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <i className="bi bi-calendar3" aria-hidden="true" />
            <span>
              آخرین تغییر: {request.date || '---'}
            </span>
          </p>
        </div>

        {/* Request Type */}
        <div className="shrink-0">
          <span
            className={`
              inline-flex items-center
              rounded-full border
              px-3 py-1.5
              text-xs font-medium
              ${status.bg} ${status.border}
              ${status.color}
            `}
          >
            {request.type}
          </span>
        </div>
      </div>

      {/* Pending animation */}
      {request.status === 'pending' && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-y-0 -left-1/2
            w-1/2
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
          animate={{ x: ['0%', '300%'] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  )
}

export default RequestStatusBanner
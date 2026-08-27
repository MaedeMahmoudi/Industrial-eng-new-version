import React from 'react'
import { motion } from 'framer-motion'
import { InfoCard } from './shared'

function StudentInfoCard({ request, variants }) {
  return (
    <motion.div
      variants={variants}
      className="
        rounded-2xl
        border border-slate-200/80 dark:border-slate-800
        bg-white dark:bg-slate-900
        p-5 sm:p-6
        shadow-sm
        transition-shadow duration-300
        hover:shadow-md
      "
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-violet-50 dark:bg-violet-950/40
            text-violet-600 dark:text-violet-400
          "
        >
          <i className="bi bi-person-badge text-lg" aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 sm:text-lg">
            اطلاعات دانشجو
          </h2>

          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            اطلاعات ثبت‌شده برای این درخواست
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          label="نام و نام خانوادگی"
          value={request.studentName || '---'}
          icon="bi-person"
        />

        <InfoCard
          label="شماره دانشجویی"
          value={request.studentId || '---'}
          icon="bi-person-badge"
        />

        <InfoCard
          label="نوع درخواست"
          value={request.type || '---'}
          icon="bi-file-text"
        />

        <InfoCard
          label="تاریخ ثبت"
          value={request.date || '---'}
          icon="bi-calendar3"
        />
      </div>
    </motion.div>
  )
}

export default StudentInfoCard
import React from 'react'
import { motion } from 'framer-motion'

function ReadOnlyNotice({ variants }) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-4 text-center"
    >
      <div className="flex items-center justify-center gap-3">
        <i className="bi bi-eye text-blue-600 text-xl animate-pulse" />
        <p className="text-sm font-medium text-blue-700">
          شما با نقش انجمن علمی وارد شده‌اید و فقط قادر به مشاهده درخواست هستید.
        </p>
      </div>
    </motion.div>
  )
}

export default ReadOnlyNotice
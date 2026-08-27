import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function RejectionReasonCard({ reason }) {
  return (
    <AnimatePresence>
      {reason && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="rounded-2xl bg-rose-50 border-2 border-rose-200 p-6 shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 text-xl flex-shrink-0">
              <i className="bi bi-x-circle"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-rose-600">دلیل رد درخواست</p>
              <p className="text-rose-700 mt-1 text-sm leading-relaxed">{reason}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RejectionReasonCard
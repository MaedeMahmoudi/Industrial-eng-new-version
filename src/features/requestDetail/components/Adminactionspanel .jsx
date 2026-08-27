import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AdminActionsPanel({
  variants,
  adminNote,
  onAdminNoteChange,
  showRejectInput,
  rejectionReason,
  onRejectionReasonChange,
  isProcessing,
  onApprove,
  onReject,
  onStartReject,
  onCancelReject,
}) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl bg-white border border-orange-100 p-6 shadow-md"
    >
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="bi bi-gear text-orange-500"></i>
        عملیات
      </h2>

      {/* یادداشت داخلی */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          <i className="bi bi-sticky ml-1"></i>
          یادداشت داخلی (اختیاری)
        </label>
        <textarea
          value={adminNote}
          onChange={(e) => onAdminNoteChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/30 text-slate-800 
                     focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 resize-none"
          rows={2}
          placeholder="یادداشت داخلی (فقط برای مدیر گروه قابل مشاهده است)..."
          disabled={isProcessing}
        />
      </div>

      {/* دلیل رد */}
      <AnimatePresence>
        {showRejectInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <label className="block text-sm font-medium text-rose-600 mb-1.5">
              <i className="bi bi-exclamation-circle ml-1"></i>
              دلیل رد (اجباری)
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => onRejectionReasonChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-rose-300 bg-rose-50/30 text-slate-800 
                         focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-300 resize-none"
              rows={3}
              placeholder="دلیل رد درخواست را وارد کنید..."
              disabled={isProcessing}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه‌ها */}
      <div className="flex flex-wrap gap-3">
        {/* تایید */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onApprove}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-medium 
                     shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <i className="bi bi-check2" />
          )}
          تایید درخواست
        </motion.button>

        {/* رد */}
        {showRejectInput ? (
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReject}
            disabled={isProcessing || !rejectionReason.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-medium 
                       shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <i className="bi bi-check2" />
            )}
            تایید رد
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartReject}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-medium 
                       shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <i className="bi bi-x-lg" />
            رد درخواست
          </motion.button>
        )}

        {/* انصراف */}
        {showRejectInput && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancelReject}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-medium hover:bg-slate-200 transition-all duration-300"
            disabled={isProcessing}
          >
            <i className="bi bi-x" />
            انصراف
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default AdminActionsPanel
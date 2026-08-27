import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StatusBadge from '../../../components/shared/StatusBadge'

function RequestActionModal({
  isOpen,
  request,
  adminNote,
  onAdminNoteChange,
  rejectionReason,
  onRejectionReasonChange,
  isPending,
  onClose,
  onApprove,
  onReject,
  onStartReject,
}) {
  return (
    <AnimatePresence>
      {isOpen && request && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-orange-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                تصمیم‌گیری درخواست
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-orange-50 transition-colors"
                aria-label="بستن"
              >
                <i className="bi bi-x text-xl text-slate-500 hover:text-orange-600"></i>
              </button>
            </div>

            <div className="space-y-5">
              {/* اطلاعات درخواست */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">کد پیگیری</p>
                  <p className="font-bold text-slate-700">{request.trackingCode}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">وضعیت فعلی</p>
                  <StatusBadge status={request.status} />
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">نوع درخواست</p>
                <p className="font-semibold text-slate-800">{request.type}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">دانشجو</p>
                <p className="font-semibold text-slate-800">{request.studentName}</p>
              </div>

              {/* توضیحات */}
              {request.description && (
                <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100">
                  <p className="text-xs text-slate-400 mb-1">توضیحات</p>
                  <p className="text-sm text-slate-700">{request.description}</p>
                </div>
              )}

              {/* یادداشت داخلی */}
              <div>
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
                />
              </div>

              {/* دلیل رد */}
              <AnimatePresence>
                {rejectionReason !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
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
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* دکمه‌ها */}
              <div className="flex gap-3 pt-4 border-t border-orange-100">
                {/* تایید */}
                <button
                  onClick={onApprove}
                  disabled={isPending}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold 
                             shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    <>
                      <i className="bi bi-check2 ml-2"></i>
                      تایید
                    </>
                  )}
                </button>

                {/* رد */}
                {rejectionReason !== undefined ? (
                  <button
                    onClick={onReject}
                    disabled={isPending || !rejectionReason.trim()}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-semibold 
                               shadow-lg shadow-rose-500/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
                  >
                    {isPending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                    ) : (
                      <>
                        <i className="bi bi-check2 ml-2"></i>
                        تایید رد
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={onStartReject}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-semibold 
                               shadow-lg shadow-rose-500/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <i className="bi bi-x ml-2"></i>
                    رد
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RequestActionModal
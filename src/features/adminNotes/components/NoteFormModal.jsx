import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function NoteFormModal({
  isOpen,
  mode,
  title,
  content,
  onTitleChange,
  onContentChange,
  isPending,
  onClose,
  onSave,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-orange-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {mode === 'edit' ? 'ویرایش یادداشت' : 'یادداشت جدید'}
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
              {/* عنوان */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  عنوان
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="مثال: هماهنگی امتحانات ترم"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 bg-orange-50/30 text-slate-800 
                             placeholder:text-slate-400
                             focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
                  autoFocus
                />
              </div>

              {/* متن یادداشت */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  متن یادداشت
                </label>
                <textarea
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  rows={6}
                  placeholder="هر نکته یا توضیحی که می‌خوای اینجا بنویس..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 bg-orange-50/30 text-slate-800 
                             placeholder:text-slate-400
                             focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onSave}
                  disabled={isPending || !title.trim() || !content.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold 
                             shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 
                             hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : mode === 'edit' ? (
                    'ذخیره تغییرات'
                  ) : (
                    'افزودن یادداشت'
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl border-2 border-orange-100 text-slate-600 font-medium 
                             hover:bg-orange-50 hover:border-orange-200 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NoteFormModal
import React from 'react'
import { motion } from 'framer-motion'

function NoteCard({ note, index, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-2xl bg-white border border-orange-100 shadow-md hover:shadow-lg hover:border-orange-200 transition-all duration-300 p-5 flex flex-col"
    >
      {/* هدر کارت */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-bold text-slate-800 text-base leading-relaxed">
          {note.title}
        </h3>

        <div className="flex items-center gap-1 flex-shrink-0">
          {/* دکمه ویرایش */}
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            title="ویرایش"
          >
            <i className="bi bi-pencil text-sm"></i>
          </button>

          {/* دکمه حذف */}
          <button
            onClick={() => onDelete(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="حذف"
          >
            <i className="bi bi-trash text-sm"></i>
          </button>
        </div>
      </div>

      {/* محتوای یادداشت */}
      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap flex-1">
        {note.content}
      </p>

      {/* تاریخ */}
      <div className="mt-4 pt-3 border-t border-orange-50 flex items-center gap-1.5 text-xs text-slate-400">
        <i className="bi bi-clock"></i>
        {note.updatedAt || note.createdAt}
      </div>
    </motion.div>
  )
}

export default NoteCard
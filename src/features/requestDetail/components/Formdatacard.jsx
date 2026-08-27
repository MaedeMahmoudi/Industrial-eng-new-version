import React from 'react'
import { motion } from 'framer-motion'
import { InfoCard } from './shared'

function FormDataCard({ formData, variants }) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl bg-white border border-orange-100 p-6 shadow-md"
    >
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="bi bi-file-earmark-text text-orange-500"></i>
        اطلاعات فرم
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <InfoCard key={key} label={key} value={value} icon="bi-input-cursor-text" />
        ))}
      </div>
    </motion.div>
  )
}

export default FormDataCard
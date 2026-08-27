import React from 'react'
import { motion } from 'framer-motion'

function RoleBanner({ isAdmin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className={`rounded-2xl p-4 border-2 ${
        isAdmin
          ? 'bg-blue-50 border-blue-200'
          : 'bg-amber-50 border-amber-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <i
          className={`bi ${isAdmin ? 'bi-shield-fill' : 'bi-people-fill'} text-2xl ${
            isAdmin ? 'text-blue-600' : 'text-amber-600'
          }`}
        ></i>
        <div>
          <p
            className={`text-sm font-semibold ${
              isAdmin ? 'text-blue-700' : 'text-amber-700'
            }`}
          >
            {isAdmin
              ? 'شما با نقش مدیر گروه وارد شده‌اید.'
              : 'شما با نقش انجمن علمی وارد شده‌اید.'}
          </p>
          <p
            className={`text-xs mt-0.5 ${
              isAdmin ? 'text-blue-600' : 'text-amber-600'
            }`}
          >
            {isAdmin
              ? 'شما می‌توانید درخواست‌ها را تایید یا رد کنید.'
              : 'شما فقط می‌توانید درخواست‌ها را مشاهده کنید.'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default RoleBanner
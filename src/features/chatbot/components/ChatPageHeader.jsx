import React from 'react'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
}

function ChatPageHeader({ isOnline, messageCount }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 p-5 md:p-6 text-white shadow-xl shadow-orange-500/25"
    >
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg border border-white/25">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold">چت‌بات صنایع</h1>
            <p className="text-white/85 text-xs flex items-center gap-2 mt-0.5">
              <span>پاسخگوی سوالات دانشجویی</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOnline ? 'bg-emerald-300 animate-pulse' : 'bg-rose-400'
                }`}
              ></span>
              <span>{isOnline ? 'آنلاین' : 'آفلاین'}</span>
            </p>
          </div>
        </div>

        <div className="sm:mr-auto flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/25 text-xs">
          <span>💬</span>
          <span>{messageCount} پیام</span>
        </div>
      </div>

      {/* افکت‌های پس‌زمینه */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 w-28 h-28 bg-white/15 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
      />
    </motion.div>
  )
}

export default ChatPageHeader
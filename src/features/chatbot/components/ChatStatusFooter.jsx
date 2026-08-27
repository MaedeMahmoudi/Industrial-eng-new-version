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

function ChatStatusFooter({ isOnline, messageCount }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex justify-center gap-4 text-[10px] text-slate-400"
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-300"></span>
        v2.0.0
      </span>

      <span className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isOnline ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        ></span>
        {isOnline ? 'سرور آنلاین' : 'سرور آفلاین'}
      </span>

      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-300"></span>
        {messageCount} پیام
      </span>
    </motion.div>
  )
}

export default ChatStatusFooter
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ChatbotFloating = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      whileHover={{ scale: 1.08, rotate: 4 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <Link
        to="/chatbot"
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl 
                   bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 
                   text-white shadow-xl shadow-orange-500/40 
                   hover:shadow-orange-500/60 hover:shadow-2xl
                   transition-all duration-300 group"
      >
        {/* آیکون ربات */}
        <i className="bi bi-robot text-2xl group-hover:scale-110 transition-transform duration-300"></i>

        {/* نقطه آنلاین (سبز ملایم و تمیز) */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-md animate-pulse"></span>

        {/* گلو پشت آیکون */}
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></span>

        {/* رینگ ظریف */}
        <span className="absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-300"></span>
      </Link>
    </motion.div>
  )
}

export default ChatbotFloating
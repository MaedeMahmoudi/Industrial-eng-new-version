import React from 'react'
import { motion } from 'framer-motion'

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex justify-start"
  >
    <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-md border border-orange-100">
      <div className="flex gap-1.5">
        <div
          className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  </motion.div>
)

export default TypingIndicator
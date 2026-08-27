import React from 'react'
import { motion } from 'framer-motion'

function ChatSuggestions({ suggestions, loading, onAskQuestion }) {
  return (
    <div className="px-5 py-3 border-t border-orange-100 bg-orange-50/30">
      <p className="text-[10px] text-slate-500 mb-2 flex items-center gap-2">
        <span>⚡</span>
        {loading ? 'بارگذاری پیشنهادات...' : 'سوالات پرتکرار:'}
      </p>

      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 6).map((q, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAskQuestion(q)}
            className="px-3 py-1.5 text-[11px] font-medium rounded-full 
                       bg-orange-50 text-orange-700 
                       border border-orange-200 
                       hover:bg-orange-100 hover:border-orange-300 
                       transition-all duration-200"
          >
            {q.length > 30 ? q.substring(0, 28) + '...' : q}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ChatSuggestions
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ChatInput({
  register,
  errors,
  inputRef,
  isTyping,
  isValid,
  message,
  isOnline,
  onSubmit,
  onKeyPress,
}) {
  return (
    <div className="p-4 bg-white/95 border-t border-orange-100">
      <form onSubmit={onSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            {...register('message')}
            placeholder="سوال خود را بنویسید..."
            onKeyDown={onKeyPress}
            className={`w-full px-4 py-3 rounded-2xl border-2 bg-orange-50/40 text-slate-800 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-1 ${
              errors.message
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
                : 'border-orange-100 focus:border-orange-400 focus:ring-orange-100 hover:border-orange-200'
            }`}
            disabled={isTyping}
          />

          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute -bottom-5 right-0 text-rose-500 text-[10px] flex items-center gap-1"
              >
                <span>⚠️</span>
                {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isTyping || !isValid || !message.trim()}
          className={`px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold 
                     shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 
                     transition-all duration-300 flex items-center gap-2 min-w-[90px] justify-center text-sm
                     ${isTyping || !isValid || !message.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isTyping ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ارسال...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              ارسال
            </>
          )}
        </motion.button>
      </form>

      {/* اطلاعات پایین */}
      <div className="flex justify-between items-center mt-2.5">
        <p className="text-[10px] text-slate-400">
          {message?.length || 0}/۱۰۰۰ کاراکتر
        </p>

        <div className="flex items-center gap-3">
          <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
            <span className={isOnline ? 'text-emerald-500' : 'text-rose-500'}>●</span>
            {isOnline ? 'متصل' : 'آفلاین'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
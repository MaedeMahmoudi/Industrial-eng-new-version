import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const MessageBubble = ({ message, isUser, onFeedback }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [feedbackType, setFeedbackType] = useState(null) // 'helpful' | 'not_helpful'
  const [sending, setSending] = useState(false)

  const handleLike = async () => {
    if (feedbackGiven || isUser) return
    setSending(true)
    const success = await onFeedback(message.id, 'helpful')
    if (success) {
      setFeedbackGiven(true)
      setFeedbackType('helpful')
      toast.success('👍 بازخورد مثبت شما ثبت شد!')
    } else {
      toast.error('خطا در ثبت بازخورد')
    }
    setSending(false)
  }

  const handleDislike = async () => {
    if (feedbackGiven || isUser) return
    setSending(true)
    const success = await onFeedback(message.id, 'not_helpful')
    if (success) {
      setFeedbackGiven(true)
      setFeedbackType('not_helpful')
      toast.success('👎 بازخورد شما ثبت شد!')
    } else {
      toast.error('خطا در ثبت بازخورد')
    }
    setSending(false)
  }

  const renderFeedbackButtons = () => {
    if (isUser) return null

    if (feedbackGiven) {
      return (
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400">
            {feedbackType === 'helpful' ? 'مفید' : 'غیرمفید'}
          </span>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleLike}
          disabled={sending}
          className={`p-1 rounded-md hover:bg-orange-50 transition-all duration-200 ${
            sending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="مفید بود"
        >
          <svg
            className="w-4 h-4 text-slate-400 hover:text-emerald-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </button>

        <button
          onClick={handleDislike}
          disabled={sending}
          className={`p-1 rounded-md hover:bg-rose-50 transition-all duration-200 ${
            sending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="مفید نبود"
        >
          <svg
            className="w-4 h-4 text-slate-400 hover:text-rose-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
            />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-br-none shadow-lg shadow-orange-500/25'
            : 'bg-white text-slate-700 rounded-bl-none shadow-md border border-orange-100'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>

        <div className="flex items-center justify-between mt-2">
          <p className={`text-[10px] ${isUser ? 'text-white/70' : 'text-slate-400'}`}>
            {message.timestamp}
          </p>
          <div className="flex items-center gap-2">{renderFeedbackButtons()}</div>
        </div>

        {message.offline && !isUser && (
          <p className="text-[9px] text-amber-600 mt-1.5 flex items-center gap-1">
            <span>⚠️</span>
            پاسخ آفلاین
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default MessageBubble
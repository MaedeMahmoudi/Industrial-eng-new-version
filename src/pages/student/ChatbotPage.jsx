import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast, { Toaster } from 'react-hot-toast'

import {
  chatService,
  messageSchema,
  findFallbackResponse,
  defaultSuggestions,
} from '../../features/chatbot/chatService'
import ChatPageHeader from '../../features/chatbot/components/ChatPageHeader'
import ChatWindowHeader from '../../features/chatbot/components/ChatWindowHeader'
import ChatMessages from '../../features/chatbot/components/ChatMessages'
import ChatSuggestions from '../../features/chatbot/components/ChatSuggestions'
import ChatInput from '../../features/chatbot/components/ChatInput'
import ChatStatusFooter from '../../features/chatbot/components/ChatStatusFooter'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
}

function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text:
        'سلام! من چت‌بات سامانه دانشجویی هستم.\n\nمی‌توانید درباره این موارد بپرسید:\n• فرآیندهای دانشجویی\n• نحوه ثبت درخواست\n• پیگیری درخواست‌ها\n• پروژه کارشناسی و ارشد\n• و سایر سوالات مرتبط',
      timestamp: new Date().toLocaleTimeString('fa-IR'),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [suggestions, setSuggestions] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(messageSchema),
    mode: 'onChange',
    defaultValues: { message: '' },
  })

  const message = watch('message')

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoadingSuggestions(true)
      try {
        const data = await chatService.getSuggestions()
        setSuggestions(data.length > 0 ? data : defaultSuggestions)
      } catch {
        setSuggestions(defaultSuggestions)
      } finally {
        setLoadingSuggestions(false)
      }
    }
    fetchSuggestions()
  }, [])

  const sendMessageToBackend = async (text) => {
    if (!isOnline) {
      const fallback = findFallbackResponse(text)
      return fallback
        ? { reply: fallback, suggestions: [], confidence: 0.3, offline: true }
        : {
            reply: 'ارتباط با سرور برقرار نیست. لطفاً اتصال اینترنت خود را بررسی کنید.',
            suggestions: [],
            confidence: 0,
            offline: true,
          }
    }

    try {
      const result = await chatService.sendMessage(text, messages)
      return {
        reply: result.reply,
        suggestions: result.suggestions || [],
        confidence: result.confidence || 0,
        offline: false,
      }
    } catch {
      const fallback = findFallbackResponse(text)
      return fallback
        ? { reply: fallback, suggestions: [], confidence: 0.2, offline: true }
        : {
            reply: 'در حال حاضر قادر به پاسخگویی نیستم. لطفاً دوباره تلاش کنید.',
            suggestions: [],
            confidence: 0,
            offline: true,
          }
    }
  }

  const sendMessage = async (text) => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: trimmedText,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
    }
    setMessages((prev) => [...prev, userMessage])
    setValue('message', '')
    setIsTyping(true)

    const result = await sendMessageToBackend(trimmedText)

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: result.reply,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
      confidence: result.confidence,
      offline: result.offline,
    }
    setMessages((prev) => [...prev, botMessage])
    setIsTyping(false)

    if (result.suggestions?.length > 0) {
      setSuggestions(result.suggestions)
    }
  }

  const handleFeedback = async (messageId, feedback) => {
    try {
      return await chatService.sendFeedback(messageId, feedback)
    } catch (error) {
      console.error('خطا در ارسال بازخورد:', error)
      return false
    }
  }

  const onSubmit = (data) => sendMessage(data.message)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isValid && message.trim()) {
        sendMessage(message)
      }
    }
  }

  const askQuestion = (question) => {
    setValue('message', question)
    setTimeout(() => {
      if (question.trim()) sendMessage(question)
    }, 100)
  }

  const clearHistory = () => {
    if (messages.length <= 1) {
      toast('تاریخچه قبلاً خالی است')
      return
    }
    if (window.confirm('آیا از پاک کردن تاریخچه گفتگو مطمئن هستید؟')) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          text: 'سلام! تاریخچه گفتگو پاک شد.\n\nچطور می‌توانم کمک کنم؟',
          timestamp: new Date().toLocaleTimeString('fa-IR'),
        },
      ])
      toast.success('تاریخچه با موفقیت پاک شد')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4" dir="rtl">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { direction: 'rtl', borderRadius: '16px', padding: '16px' },
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl space-y-5"
      >
        <ChatPageHeader isOnline={isOnline} messageCount={messages.length} />

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <ChatWindowHeader isOnline={isOnline} onClearHistory={clearHistory} />

          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            onFeedback={handleFeedback}
            messagesEndRef={messagesEndRef}
          />

          <ChatSuggestions
            suggestions={suggestions}
            loading={loadingSuggestions}
            onAskQuestion={askQuestion}
          />

          <ChatInput
            register={register}
            errors={errors}
            inputRef={inputRef}
            isTyping={isTyping}
            isValid={isValid}
            message={message}
            isOnline={isOnline}
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={handleKeyPress}
          />
        </motion.div>

        <ChatStatusFooter isOnline={isOnline} messageCount={messages.length} />
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  )
}

export default ChatbotPage
import { z } from 'zod'
import { chatbotService } from '../../services/api/chatbotService'

// ============================================
//  مدل‌های داده
// ============================================

export const messageSchema = z.object({
  message: z.string().min(1, 'لطفاً پیامی وارد کنید').max(1000, 'پیام نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد'),
})

const responseSchema = z.object({
  reply: z.string(),
  suggestions: z.array(z.string()).optional(),
  confidence: z.number().optional(),
})

// ============================================
//  لایه بین کامپوننت و chatbotService
// (اعتبارسنجی پاسخ + مدیریت خطای مخصوص همین صفحه اینجا می‌ماند،
//  چون رفتار fallback مخصوص UI چت‌بات است، نه یک قانون عمومی API)
// ============================================

export const chatService = {
  sendMessage: async (message, history) => {
    try {
      const response = await chatbotService.sendMessage(message, history)

      const validated = responseSchema.safeParse(response.data)
      if (validated.success) {
        return validated.data
      }

      throw new Error('پاسخ دریافتی نامعتبر است')
    } catch (error) {
      console.error('خطا در ارسال پیام:', error)
      throw error
    }
  },

  getSuggestions: async () => {
    try {
      const response = await chatbotService.getSuggestions()
      return response.data.suggestions || []
    } catch (error) {
      console.error('خطا در دریافت پیشنهادات:', error)
      return []
    }
  },

  sendFeedback: async (messageId, feedback) => {
    try {
      await chatbotService.sendFeedback(messageId, feedback)
      return true
    } catch (error) {
      console.error('خطا در ثبت بازخورد:', error)
      return false
    }
  },
}

// ============================================
// پاسخ‌های آفلاین
// ============================================

const fallbackResponses = {
  'سلام': 'سلام! چطور می‌توانم به شما کمک کنم؟',
  'خوبی': 'خوبم، متشکرم! شما چطورید؟',
  'درخواست': 'برای ثبت درخواست، به بخش "ثبت درخواست جدید" مراجعه کنید.',
  'پیگیری': 'برای پیگیری درخواست، کد پیگیری خود را در بخش "پیگیری درخواست" وارد کنید.',
  'پروژه': 'برای اطلاعات درباره پروژه کارشناسی، به بخش "پروژه کارشناسی" مراجعه کنید.',
}

export const findFallbackResponse = (text) => {
  for (const [key, value] of Object.entries(fallbackResponses)) {
    if (text.includes(key)) {
      return value
    }
  }
  return null
}

export const defaultSuggestions = [
  'چطور درخواست ارائه درس اضافه بدهم؟',
  'چطور از گروه دیگر درس بگیرم؟',
  'چطور درخواست افزایش ظرفیت بدهم؟',
  'چطور درخواست معرفی به استاد بدهم؟',
  'چطور وضعیت درخواست خود را پیگیری کنم؟',
]
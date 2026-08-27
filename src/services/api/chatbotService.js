import axiosInstance from './axiosInstance'

export const chatbotService = {
  sendMessage: (message, history) =>
    axiosInstance.post('/chatbot/message', {
      message,
      history: history.map((m) => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
    }),

  getSuggestions: () => axiosInstance.get('/chatbot/suggestions'),

  sendFeedback: (messageId, feedback) =>
    axiosInstance.post('/chatbot/feedback', { messageId, feedback }),
}
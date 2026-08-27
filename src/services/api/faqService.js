import axiosInstance from './axiosInstance'

export const faqService = {
  getAll: () => axiosInstance.get('/faqs'),

  getById: (id) => axiosInstance.get(`/admin/faqs/${id}`),

  create: (question, answer) =>
    axiosInstance.post('/admin/faqs', { question, answer }),

  update: (id, question, answer) =>
    axiosInstance.put(`/admin/faqs/${id}`, { question, answer }),

  delete: (id) => axiosInstance.delete(`/admin/faqs/${id}`),
}

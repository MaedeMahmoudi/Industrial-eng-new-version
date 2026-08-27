import axiosInstance from './axiosInstance'

export const adminNotesService = {
  getAll: () => axiosInstance.get('/admin/notes'),

  create: (title, content) =>
    axiosInstance.post('/admin/notes', { title, content }),

  update: (id, title, content) =>
    axiosInstance.put(`/admin/notes/${id}`, { title, content }),

  delete: (id) => axiosInstance.delete(`/admin/notes/${id}`),
}
import axiosInstance from './axiosInstance'

export const adminUsersService = {
  getAll: () => axiosInstance.get('/admin/users'),

  create: ({ username, password, role }) =>
    axiosInstance.post('/admin/users', { username, password, role }),

  update: (id, data) =>
    axiosInstance.patch(`/admin/users/${id}`, data),

  delete: (id) => axiosInstance.delete(`/admin/users/${id}`),
}

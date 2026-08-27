import axiosInstance from './axiosInstance'

export const authService = {
  login: (username, password) =>
    axiosInstance.post('/admin/login', { username, password }),

  logout: () => axiosInstance.post('/admin/logout'),

  changePassword: (currentPassword, newPassword) =>
    axiosInstance.patch('/admin/change-password', {
      currentPassword,
      newPassword,
    }),
}

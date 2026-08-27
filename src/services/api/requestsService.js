import axiosInstance from './axiosInstance'

export const requestsService = {
  getStats: () => axiosInstance.get('/admin/stats'),

  getAll: (params = {}) =>
    axiosInstance.get('/admin/requests', {
      params: {
        status: params.status === 'all' || !params.status ? '' : params.status,
        type: params.type === 'all' || !params.type ? '' : params.type,
        search: params.search || '',
        limit: Math.min(Number(params.limit) || 10, 100),
        page: params.page || 1,
      },
    }),

  getByTrackingCode: (trackingCode) =>
    axiosInstance.get(`/admin/requests/${trackingCode}`),

  updateStatus: (trackingCode, { status, rejectionReason, adminNote }) =>
    axiosInstance.patch(`/admin/requests/${trackingCode}/status`, {
      status,
      ...(status === 'rejected' ? { rejectionReason } : {}),
      ...(adminNote != null ? { adminNote } : {}),
    }),

  exportExcel: (params = {}) =>
    axiosInstance.get('/admin/requests/export/excel', {
      params: {
        status: params.status === 'all' || !params.status ? '' : params.status,
        type: params.type === 'all' || !params.type ? '' : params.type,
        search: params.search || '',
      },
      responseType: 'blob',
    }),

  exportPdf: (params = {}) =>
    axiosInstance.get('/admin/requests/export/pdf', {
      params: {
        status: params.status === 'all' || !params.status ? '' : params.status,
        type: params.type === 'all' || !params.type ? '' : params.type,
        search: params.search || '',
      },
      responseType: 'blob',
    }),
}

import axios from 'axios'

// ============================================
//  نمونه مرکزی axios
// همه‌ی سرویس‌های پروژه از همین یک نمونه استفاده می‌کنن.
// اگه بک‌اند baseURL رو عوض کرد، فقط اینجا (.env) رو اصلاح کن.
// ============================================

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 15000,
})

// ===== Interceptor درخواست: اضافه کردن توکن به‌صورت خودکار =====
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ===== Interceptor پاسخ: مدیریت متمرکز خطاها =====
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // در حالت توسعه با توکن تستی، با 401 بیرون نینداز
    const isDevMock =
      import.meta.env.DEV &&
      localStorage.getItem('adminToken')?.startsWith('test-token')

    if (error.response?.status === 401 && !isDevMock) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminRole')
      localStorage.removeItem('adminDisplayName')
      localStorage.removeItem('adminLoggedIn')

      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
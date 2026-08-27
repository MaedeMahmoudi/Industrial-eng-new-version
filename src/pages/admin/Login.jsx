import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { authService } from '../../services/api/authService'
import { branding } from '../../config/branding'

const isDevMode = import.meta.env.DEV

const loginSchema = z.object({
  username: isDevMode
    ? z.string().optional()
    : z
        .string()
        .min(3, 'نام کاربری حداقل ۳ کاراکتر باید باشد')
        .max(50, 'نام کاربری حداکثر ۵۰ کاراکتر است'),
  password: isDevMode
    ? z.string().optional()
    : z
        .string()
        .min(4, 'رمز عبور حداقل ۴ کاراکتر باید باشد')
        .max(100, 'رمز عبور حداکثر ۱۰۰ کاراکتر است'),
  remember: z.boolean().optional(),
})

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const loggedIn = localStorage.getItem('adminLoggedIn')

    if (token && loggedIn === 'true') {
      navigate('/admin/dashboard', { replace: true })
    }

    const savedUsername = localStorage.getItem('savedUsername')
    const savedRemember = localStorage.getItem('savedRemember')

    if (savedRemember === 'true' && savedUsername) {
      setValue('username', savedUsername)
      setValue('remember', true)
    }
  }, [navigate, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)

    try {
      let response

      if (isDevMode) {
        await new Promise((resolve) => setTimeout(resolve, 400))

        if (data.username === 'anjoman' && data.password === '123456') {
          response = {
            data: {
              token: 'test-token-789012',
              role: 'scientific_association',
              displayName: 'انجمن علمی',
            },
          }
        } else {
          response = {
            data: {
              token: 'test-token-123456',
              role: 'department_manager',
              displayName: data.username?.trim() || 'مدیر گروه (توسعه)',
            },
          }
        }
      } else {
        response = await authService.login(data.username, data.password)
      }

      const { token, role, displayName } = response.data

      localStorage.setItem('adminToken', token)
      localStorage.setItem('adminRole', role)
      localStorage.setItem('adminDisplayName', displayName)
      localStorage.setItem('adminLoggedIn', 'true')

      if (data.remember) {
        localStorage.setItem('savedUsername', data.username)
        localStorage.setItem('savedRemember', 'true')
      } else {
        localStorage.removeItem('savedUsername')
        localStorage.removeItem('savedRemember')
      }

      toast.success(`خوش آمدید ${displayName}`)
      navigate('/admin/dashboard')
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'خطا در ورود به سیستم'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, type: 'spring', damping: 26 },
    },
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4" dir="rtl">
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
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <img
              src="/icons.jpg"
              alt="لوگو"
              className="mx-auto h-28 w-28 object-contain"
            />
            <h1 className="mt-4 text-2xl font-bold text-slate-800">
              {branding.adminPanelTitle}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {branding.adminPanelSubtitle} — ورود به پنل مدیریت
            </p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3"
              >
                <p className="flex items-center gap-2 text-sm text-rose-600">
                  <i className="bi bi-exclamation-triangle" />
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <i className="bi bi-person" />
                نام کاربری
              </label>
              <div className="relative">
                <input
                  {...register('username')}
                  type="text"
                  className={`w-full rounded-xl border-2 bg-white px-4 py-3 pr-10 text-slate-800 transition focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                    errors.username
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                  placeholder="نام کاربری را وارد کنید"
                  disabled={loading}
                  autoFocus
                />
                <i className="bi bi-person absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <AnimatePresence>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-1 text-xs text-rose-500"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <i className="bi bi-lock" />
                رمز عبور
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full rounded-xl border-2 bg-white px-4 py-3 pr-10 text-slate-800 transition focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                    errors.password
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                  placeholder="رمز عبور را وارد کنید"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-1 text-xs text-rose-500"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Remember */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                {...register('remember')}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
              />
              مرا به خاطر بسپار
            </label>

            {/* Submit */}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || (!isDevMode && !isValid)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition ${
                loading || (!isDevMode && !isValid)
                  ? 'cursor-not-allowed bg-indigo-400/70'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  در حال ورود...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-left" />
                  ورود به پنل مدیریت
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-indigo-600"
            >
              <i className="bi bi-arrow-right" />
              بازگشت به صفحه اصلی
            </Link>
          </div>

          <div className="mt-4 flex justify-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {import.meta.env.DEV ? 'حالت توسعه' : 'حالت تولید'}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              v2.0.0
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
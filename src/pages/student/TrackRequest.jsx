import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { studentRequestsService } from '../../services/api/studentRequestsService'
import { branding } from '../../config/branding'

const schema = z.object({
  code: z
    .string()
    .min(1, 'کد پیگیری را وارد کنید')
    .length(6, 'کد پیگیری باید ۶ کاراکتر باشد')
    .regex(/^[A-Z0-9]{6}$/, 'فقط حروف انگلیسی بزرگ و اعداد مجاز است'),
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

function TrackRequest() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { code: '' },
  })

  const code = watch('code')

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await studentRequestsService.track(data.code)
      setResult(response.data)
    } catch (err) {
      const message =
        err.response?.status === 404
          ? 'درخواستی با این کد پیگیری یافت نشد'
          : err.response?.data?.message ||
            'خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    reset()
  }

  const canSubmit = !loading && !errors.code && code?.length === 6

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4" dir="rtl">
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
        className="mx-auto max-w-3xl"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-l from-indigo-600 to-indigo-500 p-8 text-white shadow-lg md:p-10"
        >
          <div className="relative z-10 flex flex-col items-start gap-5 md:flex-row md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm">
              <i className="bi bi-search" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">پیگیری درخواست</h1>
              <p className="mt-1 text-sm text-white/85">
                {branding.departmentName} · کد ۶ کاراکتری
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-3 py-1.5 text-sm backdrop-blur-sm md:mr-auto">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              سیستم آنلاین
            </div>
          </div>
          <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        {/* Search form */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  کد پیگیری خود را وارد کنید
                </label>

                <div className="relative">
                  <input
                    {...register('code')}
                    placeholder="مثال: A3F7K9"
                    onChange={(e) => {
                      const value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, '')
                      setValue('code', value, { shouldValidate: true })
                    }}
                    className={`w-full rounded-2xl border-2 bg-white px-5 py-4 text-center font-mono text-xl tracking-[0.3em] text-slate-800 uppercase transition focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                      errors.code
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 hover:border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                    maxLength={6}
                    spellCheck={false}
                    autoFocus
                  />
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                    <i className="bi bi-search" />
                  </div>

                  <AnimatePresence>
                    {errors.code && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute -bottom-6 right-0 flex items-center gap-1 text-xs text-rose-500"
                      >
                        {errors.code.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-slate-400">{code?.length || 0}/6 کاراکتر</p>
                  <p className="text-xs text-slate-400">حروف بزرگ انگلیسی و اعداد</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  whileHover={canSubmit ? { y: -1 } : undefined}
                  whileTap={canSubmit ? { scale: 0.98 } : undefined}
                  type="submit"
                  disabled={!canSubmit}
                  className={`inline-flex min-w-[140px] flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition ${
                    canSubmit
                      ? 'bg-indigo-600 shadow-sm hover:bg-indigo-700'
                      : 'cursor-not-allowed bg-indigo-400/60'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      در حال جستجو...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search" />
                      جستجو
                    </>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl bg-slate-100 px-6 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  ریست
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
              <p className="font-medium text-slate-700">در حال جستجو...</p>
              <p className="mt-1 text-sm text-slate-400">لطفاً چند لحظه صبر کنید</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <i className="bi bi-exclamation-triangle text-xl" />
              </div>
              <h3 className="text-lg font-bold text-rose-700">درخواست یافت نشد</h3>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 rounded-xl bg-rose-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                تلاش مجدد
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="mt-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <i className="bi bi-check-lg text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {result.type || 'درخواست'}
                    </h3>
                    <p className="text-sm text-slate-500">
                      کد:{' '}
                      <span className="font-mono font-bold text-indigo-600">
                        {result.code}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  {result.status || 'تأیید شده'}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { label: 'نام', value: result.name },
                  { label: 'شماره دانشجویی', value: result.studentId },
                  { label: 'تاریخ ثبت', value: result.date },
                  { label: 'ساعت', value: result.time },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="truncate font-semibold text-slate-800">
                      {item.value || '—'}
                    </p>
                  </div>
                ))}
              </div>

              {result.description && (
                <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="mb-1 text-xs font-medium text-slate-500">توضیحات</p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {result.description}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                <Link
                  to="/new-request"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <i className="bi bi-file-earmark-plus" />
                  ثبت درخواست جدید
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  جستجوی مجدد
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!result && !loading && !error && (
          <motion.div
            variants={itemVariants}
            className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <i className="bi bi-search text-xl" />
            </div>
            <p className="font-medium text-slate-500">کد پیگیری خود را وارد کنید</p>
            <p className="mt-1 text-sm text-slate-400">
              پس از جستجو، وضعیت درخواست شما نمایش داده می‌شود
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TrackRequest
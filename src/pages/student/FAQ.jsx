import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { faqService } from '../../services/api/faqService'
import { branding } from '../../config/branding'

const FAQ_STYLE_PALETTE = [
  { color: 'from-indigo-500 to-indigo-600', soft: 'bg-indigo-50 text-indigo-600', icon: 'bi-plus-circle' },
  { color: 'from-sky-500 to-sky-600', soft: 'bg-sky-50 text-sky-600', icon: 'bi-arrow-left-right' },
  { color: 'from-emerald-500 to-emerald-600', soft: 'bg-emerald-50 text-emerald-600', icon: 'bi-graph-up' },
  { color: 'from-violet-500 to-violet-600', soft: 'bg-violet-50 text-violet-600', icon: 'bi-x-circle' },
  { color: 'from-blue-500 to-blue-600', soft: 'bg-blue-50 text-blue-600', icon: 'bi-person-plus' },
  { color: 'from-teal-500 to-teal-600', soft: 'bg-teal-50 text-teal-600', icon: 'bi-trash' },
  { color: 'from-cyan-500 to-cyan-600', soft: 'bg-cyan-50 text-cyan-600', icon: 'bi-clock' },
  { color: 'from-indigo-400 to-indigo-500', soft: 'bg-indigo-50 text-indigo-500', icon: 'bi-search' },
]

function FAQ() {
  const [openId, setOpenId] = useState(null)

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const {
    data: faqs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => faqService.getAll().then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  })

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4" dir="rtl">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-indigo-600 to-indigo-500 p-8 text-white shadow-lg"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm">
              <i className="bi bi-question-circle" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">سوالات متداول</h1>
              <p className="mt-1 text-sm text-white/85 md:text-base">
                {branding.departmentName} — {branding.faqSubtitle}
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton circle width={40} height={40} />
                    <div className="flex-1">
                      <Skeleton height={16} width="70%" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SkeletonTheme>
        )}

        {/* Error */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-2xl text-rose-600">
              <i className="bi bi-exclamation-triangle" />
            </div>
            <p className="font-medium text-rose-700">
              دریافت سوالات متداول با خطا مواجه شد
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              <i className="bi bi-arrow-clockwise" />
              تلاش مجدد
            </button>
          </motion.div>
        )}

        {/* Empty */}
        {!isLoading && !isError && faqs?.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <i className="bi bi-inbox mb-3 block text-4xl" />
            هنوز سوالی ثبت نشده است
          </div>
        )}

        {/* FAQ list */}
        {!isLoading && !isError && faqs?.length > 0 && (
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const style = FAQ_STYLE_PALETTE[index % FAQ_STYLE_PALETTE.length]
              const isOpen = openId === faq.id

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggleOpen(faq.id)}
                    className="flex w-full items-center gap-4 p-5 text-right transition hover:bg-slate-50"
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.color} text-sm font-bold text-white shadow-sm`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-sm font-semibold leading-relaxed text-slate-800 md:text-base">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                    >
                      <i className="bi bi-chevron-down text-sm" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 bg-slate-50/80 px-5 pb-5 pt-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <p className="text-justify text-sm leading-relaxed text-slate-600">
                                {faq.answer}
                              </p>
                              <Link
                                to="/new-request"
                                className={`mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l ${style.color} px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95 hover:shadow-md`}
                              >
                                <i className="bi bi-file-earmark-plus" />
                                ثبت درخواست جدید
                                <i className="bi bi-arrow-left text-xs" />
                              </Link>
                            </div>
                            <div
                              className={`hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl sm:flex ${style.soft}`}
                            >
                              <i className={`bi ${style.icon} text-xl`} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="pt-2 text-center"
        >
          <Link
            to="/new-request"
            className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg"
          >
            <i className="bi bi-plus-circle text-lg" />
            ثبت درخواست جدید
            <i className="bi bi-arrow-left" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
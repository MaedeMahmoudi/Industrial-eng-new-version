import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { studentRequestsService } from '../../services/api/studentRequestsService'
import DynamicForm from '../../features/requests/components/DynamicForm'
import { requestFormFields, requestFormColors } from '../../features/requests/data/requestFormFields'
import { branding } from '../../config/branding'

// ===== تعریف انواع درخواست =====
const requestTypes = [
  { id: 'extra', label: 'ارائه درس اضافه بر برنامه ترمی', color: 'from-indigo-500 to-indigo-600', category: 'درسی' },
  { id: 'intergroup', label: 'اخذ درس از گروه دیگر', color: 'from-sky-500 to-sky-600', category: 'درسی' },
  { id: 'capacity', label: 'افزایش ظرفیت درس', color: 'from-violet-500 to-violet-600', category: 'درسی' },
  { id: 'general', label: 'برداشتن دو واحد عمومی', color: 'from-blue-500 to-blue-600', category: 'درسی' },
  { id: 'introduce', label: 'معرفی به استاد (مطالعه آزاد)', color: 'from-emerald-500 to-emerald-600', category: 'دانشجویی' },
  { id: 'leaveWith', label: 'مرخصی با احتساب سنوات', color: 'from-teal-500 to-teal-600', category: 'دانشجویی' },
  { id: 'leaveWithout', label: 'مرخصی بدون احتساب سنوات', color: 'from-cyan-500 to-cyan-600', category: 'دانشجویی' },
  { id: 'olympiad', label: 'شرکت در المپیاد آموزشی', color: 'from-amber-500 to-orange-500', category: 'دانشجویی' },
  { id: 'teachingAssistant', label: 'دستیار آموزشی دروس', color: 'from-lime-500 to-green-600', category: 'دانشجویی' },
  { id: 'extension', label: 'تمدید سنوات ارفاقی', color: 'from-rose-500 to-rose-600', category: 'دانشجویی' },
  { id: 'guest', label: 'مهمان دائم یا موقت', color: 'from-fuchsia-500 to-pink-600', category: 'دانشجویی' },
  { id: 'project', label: 'ثبت و تصویب پروژه کارشناسی', color: 'from-indigo-600 to-violet-600', category: 'پروژه' },
  { id: 'seminar', label: 'تعیین استاد راهنما و موضوع سمینار ارشد', color: 'from-slate-600 to-slate-700', category: 'پروژه' },
  { id: 'masterProject', label: 'ثبت و تصویب پروژه ارشد', color: 'from-slate-700 to-slate-800', category: 'پروژه' },
]

// ===== اسکیماهای اعتبارسنجی =====
const schemas = {
  extra: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    courseCode: z.string().min(5, 'کد درس معتبر نیست'),
    courseName: z.string().min(2, 'نام درس معتبر نیست'),
    units: z.string().min(1, 'واحد درس را انتخاب کنید'),
    semester: z.string().min(1, 'نیمسال را انتخاب کنید'),
    description: z.string().max(500, 'حداکثر ۵۰۰ کاراکتر').optional(),
  }),
  intergroup: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    nationalId: z.string().min(10, 'کد ملی معتبر نیست'),
    destination: z.string().min(2, 'گروه مقصد را وارد کنید'),
    semester: z.string().min(1, 'ترم را انتخاب کنید'),
    requestType: z.string().min(1, 'نوع درخواست را انتخاب کنید'),
    courses: z.string().min(3, 'حداقل یک درس وارد کنید'),
    reason: z.string().min(10, 'دلیل را کامل وارد کنید'),
  }),
  capacity: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    courseCode: z.string().min(5, 'کد درس معتبر نیست'),
    courseName: z.string().min(2, 'نام درس معتبر نیست'),
    professor: z.string().min(2, 'نام استاد را وارد کنید'),
    currentCapacity: z.string().min(1, 'ظرفیت فعلی را وارد کنید'),
    requestedCapacity: z.string().min(1, 'ظرفیت درخواستی را وارد کنید'),
    reason: z.string().min(10, 'دلیل را کامل وارد کنید'),
  }),
  general: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    nationalId: z.string().min(10, 'کد ملی معتبر نیست'),
    passedUnits: z.string().min(1, 'تعداد واحد گذرانده را وارد کنید'),
    generalCourse: z.string().min(2, 'درس عمومی را وارد کنید'),
    conflictingCourse: z.string().min(2, 'درس متداخل را وارد کنید'),
    description: z.string().min(10, 'توضیحات تداخل را کامل وارد کنید'),
  }),
  introduce: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    nationalId: z.string().min(10, 'کد ملی معتبر نیست'),
    courseCode: z.string().min(5, 'کد درس معتبر نیست'),
    courseName: z.string().min(2, 'نام درس معتبر نیست'),
    professor: z.string().optional(),
    semester: z.string().min(1, 'نیمسال را انتخاب کنید'),
    reason: z.string().min(10, 'دلیل را کامل وارد کنید'),
  }),
  leaveWith: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    semester: z.string().min(1, 'ترم را انتخاب کنید'),
    termCount: z.string().min(1, 'تعداد ترم را انتخاب کنید'),
    reason: z.string().min(10, 'دلیل را کامل وارد کنید'),
  }),
  leaveWithout: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    semester: z.string().min(1, 'ترم را انتخاب کنید'),
    reason: z.string().min(10, 'دلیل را کامل وارد کنید'),
  }),
  olympiad: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    gpa: z.string().min(1, 'معدل را وارد کنید'),
    entrySemester: z.string().min(1, 'ترم ورود را وارد کنید'),
    olympiadField: z.string().min(2, 'رشته المپیاد را وارد کنید'),
  }),
  teachingAssistant: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    courseCode: z.string().min(5, 'کد درس معتبر نیست'),
    courseName: z.string().min(2, 'نام درس معتبر نیست'),
    professor: z.string().min(2, 'نام استاد را وارد کنید'),
    academicHistory: z.string().min(10, 'سوابق تحصیلی را کامل وارد کنید'),
    bankAccount: z.string().min(16, 'شماره حساب معتبر نیست'),
  }),
  extension: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    remainingUnits: z.string().min(1, 'تعداد واحد باقیمانده را وارد کنید'),
    reason: z.string().min(10, 'دلیل عدم اتمام را کامل وارد کنید'),
  }),
  project: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    projectTitle: z.string().min(5, 'عنوان پروژه را وارد کنید'),
    supervisor: z.string().min(2, 'استاد راهنما را انتخاب کنید'),
    description: z.string().min(10, 'شرح مختصر پروژه را وارد کنید'),
  }),
  seminar: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    seminarTitle: z.string().min(5, 'عنوان سمینار را وارد کنید'),
    supervisor: z.string().min(2, 'استاد راهنما را انتخاب کنید'),
  }),
  masterProject: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    projectTitle: z.string().min(5, 'عنوان پروژه را وارد کنید'),
    supervisor: z.string().min(2, 'استاد راهنما را انتخاب کنید'),
    advisor: z.string().optional(),
    description: z.string().min(10, 'شرح مختصر پروژه را وارد کنید'),
  }),
  guest: z.object({
    name: z.string().min(2, 'نام حداقل ۲ کاراکتر'),
    lastName: z.string().min(2, 'نام خانوادگی حداقل ۲ کاراکتر'),
    studentId: z.string().min(8, 'شماره دانشجویی معتبر نیست'),
    destinationUniversity: z.string().min(2, 'دانشگاه مقصد را وارد کنید'),
    guestType: z.string().min(1, 'نوع درخواست را انتخاب کنید'),
    semester: z.string().min(1, 'ترم درخواست را انتخاب کنید'),
    equivalentCourses: z
      .string()
      .max(300, 'حداکثر ۳۰۰ کاراکتر')
      .min(1, 'دروس معادل‌سازی شده را وارد کنید'),
  }),
}

const categories = [
  { id: 'درسی', label: 'درخواست‌های درسی' },
  { id: 'دانشجویی', label: 'درخواست‌های دانشجویی' },
  { id: 'پروژه', label: 'درخواست‌های پروژه و پایان‌نامه' },
]

function NewRequest() {
  const [selectedType, setSelectedType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: selectedType ? zodResolver(schemas[selectedType]) : undefined,
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await studentRequestsService.submit(selectedType, data)
      setTrackingCode(response.data.trackingCode)
      setSubmitted(true)
      toast.success('درخواست با موفقیت ثبت شد')
      reset()
    } catch (error) {
      const message =
        error.response?.data?.message || 'خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedType('')
    setSubmitted(false)
    setTrackingCode('')
    reset()
  }

  const selectedFields = selectedType ? requestFormFields[selectedType] : null
  const selectedTypeData = requestTypes.find((t) => t.id === selectedType)
  const selectedColor = selectedType ? requestFormColors[selectedType] : 'purple'

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4" dir="rtl">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { direction: 'rtl', borderRadius: '16px', padding: '16px' },
        }}
      />

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-l from-indigo-600 to-indigo-500 p-8 text-white shadow-lg"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm">
              <i className="bi bi-file-earmark-plus" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ثبت درخواست جدید</h1>
              <p className="text-sm text-white/85">
                {branding.departmentName} — سامانه ثبت و پیگیری درخواست‌ها
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        </motion.div>

        {/* Success */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-600">
                <i className="bi bi-check-lg" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-800">
                درخواست با موفقیت ثبت شد
              </h3>
              <div className="mb-6 inline-block rounded-2xl bg-slate-50 px-8 py-4">
                <p className="text-sm text-slate-500">کد پیگیری</p>
                <p className="font-mono text-2xl font-bold tracking-wide text-indigo-600">
                  {trackingCode}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  ثبت درخواست جدید
                </button>
                <Link
                  to="/track-request"
                  className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  پیگیری درخواست
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!submitted && (
          <>
            <div className="mb-8 space-y-6">
              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="mb-3 text-base font-semibold text-slate-700">
                    {category.label}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {requestTypes
                      .filter((t) => t.category === category.id)
                      .map((type) => {
                        const active = selectedType === type.id
                        return (
                          <motion.button
                            key={type.id}
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedType(type.id)
                              reset()
                            }}
                            className={`rounded-2xl border-2 p-4 text-right text-sm font-medium transition-all ${
                              active
                                ? `border-transparent bg-gradient-to-l ${type.color} text-white shadow-md`
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/40'
                            }`}
                          >
                            {active && <span className="ml-1 opacity-90">✓ </span>}
                            {type.label}
                          </motion.button>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {selectedType && selectedFields && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div
                      className={`h-8 w-1.5 rounded-full bg-gradient-to-b ${selectedTypeData?.color}`}
                    />
                    <div>
                      <h3 className="font-bold text-slate-800">
                        {selectedTypeData?.label}
                      </h3>
                      <p className="text-sm text-slate-500">
                        لطفاً اطلاعات زیر را تکمیل کنید
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DynamicForm
                      fields={selectedFields}
                      register={register}
                      errors={errors}
                      color={selectedColor}
                    />

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 ${
                          isSubmitting ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                      >
                        {isSubmitting ? 'در حال ثبت...' : 'ثبت درخواست'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedType('')}
                        className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedType && (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <i className="bi bi-hand-index text-xl" />
                </div>
                <p className="text-base text-slate-500">
                  لطفاً نوع درخواست خود را انتخاب کنید
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  از گزینه‌های بالا یکی را انتخاب کنید
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NewRequest
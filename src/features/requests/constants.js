export const statusConfig = {
  pending: {
    label: 'منتظر تأیید',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/60',
  },

  approved: {
    label: 'تأیید شده',
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/60',
  },

  rejected: {
    label: 'رد شده',
    className:
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-800/60',
  },
}

export const typeFilterOptions = [
  { value: 'all', label: 'همه انواع' },
  { value: 'extra', label: 'ارائه درس اضافه' },
  { value: 'intergroup', label: 'اخذ بین‌گروه' },
  { value: 'capacity', label: 'افزایش ظرفیت' },
  { value: 'general', label: 'برداشتن واحد عمومی' },
  { value: 'introduce', label: 'معرفی به استاد' },
  { value: 'leaveWith', label: 'مرخصی با احتساب سنوات' },
  { value: 'leaveWithout', label: 'مرخصی بدون احتساب سنوات' },
  { value: 'olympiad', label: 'شرکت در المپیاد' },
  { value: 'teachingAssistant', label: 'دستیار آموزشی' },
  { value: 'extension', label: 'تمدید سنوات' },
  { value: 'guest', label: 'مهمان دائم/موقت' },
  { value: 'project', label: 'پروژه کارشناسی' },
  { value: 'seminar', label: 'سمینار ارشد' },
]

export const statusFilterOptions = [
  { value: '', label: 'همه وضعیت‌ها' },
  { value: 'pending', label: 'منتظر تأیید' },
  { value: 'approved', label: 'تأیید شده' },
  { value: 'rejected', label: 'رد شده' },
]

export const SEMESTER_OPTIONS = [
  { value: 'پاییز', label: 'پاییز' },
  { value: 'بهار', label: 'بهار' },
  { value: 'تابستان', label: 'تابستان' },
]

export const ADMIN_ROLES = {
  DEPARTMENT_MANAGER: 'department_manager',
  SCIENTIFIC_ASSOCIATION: 'scientific_association',
}
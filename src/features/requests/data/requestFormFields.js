const SEMESTER = [
  { value: 'پاییز', label: 'پاییز' },
  { value: 'بهار', label: 'بهار' },
  { value: 'تابستان', label: 'تابستان' },
]

export const commonStudentFields = [
  {
    name: 'firstName',
    label: 'نام',
    type: 'text',
    placeholder: 'نام خود را وارد کنید',
    required: true,
  },
  {
    name: 'lastName',
    label: 'نام خانوادگی',
    type: 'text',
    placeholder: 'نام خانوادگی خود را وارد کنید',
    required: true,
  },
  {
    name: 'studentNumber',
    label: 'شماره دانشجویی',
    type: 'text',
    placeholder: 'مثال: 4012345678',
    required: true,
  },
]

export const requestFormFields = {
  extra: [
    { name: 'courseCode', label: 'کد درس', type: 'text', placeholder: 'مثال: 1234567', required: true },
    { name: 'courseName', label: 'نام درس', type: 'text', placeholder: 'نام درس را وارد کنید', required: true },
    {
      name: 'units',
      label: 'واحد درس',
      type: 'select',
      options: [
        { value: '1', label: '۱ واحد' },
        { value: '2', label: '۲ واحد' },
        { value: '3', label: '۳ واحد' },
        { value: '4', label: '۴ واحد' },
      ],
      required: true,
    },
    { name: 'semester', label: 'نیمسال تحصیلی', type: 'select', options: SEMESTER, required: true },
    {
      name: 'description',
      label: 'توضیحات (حداکثر ۵۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'توضیحات',
      fullWidth: true,
      required: true,
    },
  ],

  intergroup: [
    { name: 'nationalCode', label: 'کد ملی', type: 'text', placeholder: 'مثال: 1234567890', required: true },
    { name: 'targetGroup', label: 'گروه/دانشکده مقصد', type: 'text', placeholder: 'نام گروه یا دانشکده مقصد', required: true },
    { name: 'semester', label: 'ترم درخواست', type: 'select', options: SEMESTER, required: true },
    {
      name: 'requestSubtype',
      label: 'نوع درخواست',
      type: 'select',
      options: [
        { value: 'مهمان موقت', label: 'مهمان موقت' },
        { value: 'مهمان دائم', label: 'مهمان دائم' },
        { value: 'اخذ بین‌گروه', label: 'اخذ بین‌گروه' },
      ],
      required: true,
    },
    {
      name: 'courses',
      label: 'دروس مورد نظر (حداکثر ۳ درس — هر درس یک خط)',
      type: 'textarea',
      placeholder: 'درس ۱\nدرس ۲\nدرس ۳',
      fullWidth: true,
      required: true,
    },
    {
      name: 'reason',
      label: 'دلیل درخواست (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'دلیل خود را وارد کنید',
      fullWidth: true,
      required: true,
    },
  ],

  capacity: [
    { name: 'courseCode', label: 'کد درس', type: 'text', placeholder: 'مثال: 1234567', required: true },
    { name: 'courseName', label: 'نام درس', type: 'text', placeholder: 'نام درس را وارد کنید', required: true },
    { name: 'courseInstructor', label: 'نام استاد درس', type: 'text', placeholder: 'نام استاد درس', required: true },
    { name: 'currentCapacity', label: 'ظرفیت فعلی درس', type: 'number', placeholder: 'مثال: 30', required: true },
    { name: 'requestedIncrease', label: 'میزان افزایش درخواستی', type: 'number', placeholder: 'مثال: 10', required: true },
    {
      name: 'reason',
      label: 'دلیل درخواست (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'دلیل خود را وارد کنید',
      fullWidth: true,
      required: true,
    },
  ],

  general: [
    { name: 'passedUnitsCount', label: 'تعداد واحد گذرانده تاکنون', type: 'number', placeholder: 'مثال: 45', required: true },
    { name: 'generalCourse', label: 'درس عمومی مورد نظر', type: 'text', placeholder: 'نام درس عمومی', required: true },
    { name: 'conflictingCourse', label: 'درس متداخل', type: 'text', placeholder: 'نام درس متداخل', required: true },
    {
      name: 'conflictDescription',
      label: 'توضیحات تداخل (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'توضیحات کامل تداخل',
      fullWidth: true,
      required: true,
    },
  ],

  introduce: [
    { name: 'nationalCode', label: 'کد ملی', type: 'text', placeholder: 'مثال: 1234567890', required: true },
    { name: 'courseCode', label: 'کد درس', type: 'text', placeholder: 'مثال: 1234567', required: true },
    { name: 'courseName', label: 'نام درس', type: 'text', placeholder: 'نام درس را وارد کنید', required: true },
    { name: 'suggestedInstructor', label: 'استاد پیشنهادی (اختیاری)', type: 'text', placeholder: 'نام استاد پیشنهادی', required: false },
    { name: 'semester', label: 'نیمسال تحصیلی', type: 'select', options: SEMESTER, required: true },
    {
      name: 'reason',
      label: 'دلیل درخواست (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'دلیل خود را وارد کنید',
      fullWidth: true,
      required: true,
    },
  ],

  leaveWith: [
    { name: 'semester', label: 'ترم درخواست مرخصی', type: 'select', options: SEMESTER, required: true },
    {
      name: 'requestedTermsCount',
      label: 'تعداد ترم‌های درخواستی',
      type: 'select',
      options: [
        { value: '1', label: '۱ ترم' },
        { value: '2', label: '۲ ترم' },
      ],
      required: true,
    },
    {
      name: 'reason',
      label: 'دلیل مرخصی (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'دلیل مرخصی',
      fullWidth: true,
      required: true,
    },
  ],

  leaveWithout: [
    { name: 'semester', label: 'ترم درخواست مرخصی', type: 'select', options: SEMESTER, required: true },
    {
      name: 'reason',
      label: 'دلیل مرخصی (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'دلیل مرخصی',
      fullWidth: true,
      required: true,
    },
    {
      name: 'document',
      label: 'مدارک پزشکی یا خاص (pdf/jpg/png — حداکثر ۵ مگابایت)',
      type: 'file',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
  ],

  olympiad: [
    { name: 'gpa', label: 'معدل', type: 'number', placeholder: 'مثال: 17.50', step: '0.01', required: true },
    { name: 'entrySemester', label: 'ترم ورود', type: 'date', required: true },
    { name: 'olympiadField', label: 'رشته المپیاد', type: 'text', placeholder: 'نام رشته المپیاد', required: true },
  ],

  teachingAssistant: [
    { name: 'courseCode', label: 'کد درس', type: 'text', placeholder: 'مثال: 1234567', required: true },
    { name: 'courseName', label: 'نام درس', type: 'text', placeholder: 'نام درس', required: true },
    { name: 'courseInstructor', label: 'نام استاد درس', type: 'text', placeholder: 'نام استاد', required: true },
    {
      name: 'academicRecord',
      label: 'سوابق تحصیلی (حداکثر ۵۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'سوابق خود را بنویسید',
      fullWidth: true,
      required: true,
    },
    {
      name: 'bankAccountNumber',
      label: 'شماره حساب بانکی (۱۶ رقم)',
      type: 'text',
      placeholder: '۱۶ رقم شماره حساب',
      required: true,
    },
  ],

  extension: [
    { name: 'remainingUnits', label: 'تعداد واحد باقی‌مانده', type: 'number', placeholder: 'مثال: 8', required: true },
    {
      name: 'reason',
      label: 'دلیل درخواست (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'دلیل تمدید سنوات',
      fullWidth: true,
      required: true,
    },
    {
      name: 'document',
      label: 'مدارک مربوطه (اختیاری — pdf/jpg/png حداکثر ۵ مگابایت)',
      type: 'file',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: false,
    },
  ],

  guest: [
    { name: 'targetUniversity', label: 'دانشگاه مقصد', type: 'text', placeholder: 'نام دانشگاه', required: true },
    {
      name: 'requestSubtype',
      label: 'نوع مهمانی',
      type: 'select',
      options: [
        { value: 'مهمان دائم', label: 'مهمان دائم' },
        { value: 'مهمان موقت', label: 'مهمان موقت' },
      ],
      required: true,
    },
    { name: 'semester', label: 'ترم', type: 'select', options: SEMESTER, required: true },
    {
      name: 'equivalentCourses',
      label: 'دروس معادل (حداکثر ۳۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'لیست دروس معادل',
      fullWidth: true,
      required: true,
    },
  ],

  project: [
    { name: 'title', label: 'عنوان پروژه', type: 'text', placeholder: 'عنوان موضوع پروژه', required: true },
    { name: 'supervisorId', label: 'استاد راهنما', type: 'number', placeholder: 'شناسه استاد (از لیست)', required: true },
    {
      name: 'shortDescription',
      label: 'توضیح کوتاه (حداکثر ۵۰۰ کاراکتر)',
      type: 'textarea',
      placeholder: 'توضیح مختصر موضوع',
      fullWidth: true,
      required: true,
    },
  ],

  seminar: [
    { name: 'title', label: 'عنوان سمینار', type: 'text', placeholder: 'عنوان موضوع سمینار', required: true },
    { name: 'supervisorId', label: 'استاد راهنما', type: 'number', placeholder: 'شناسه استاد (از لیست)', required: true },
    {
      name: 'supervisorRemainingCapacity',
      label: 'ظرفیت باقی‌مانده استاد (فقط نمایشی)',
      type: 'number',
      readOnly: true,
      required: false,
    },
  ],
}

export const requestFormColors = {
  extra: 'sand',
  intergroup: 'blue',
  capacity: 'emerald',
  general: 'amber',
  introduce: 'rose',
  leaveWith: 'indigo',
  leaveWithout: 'sand',
  olympiad: 'cyan',
  teachingAssistant: 'teal',
  extension: 'orange',
  guest: 'sky',
  project: 'red',
  seminar: 'sand',
}

export const requestTypeOptions = [
  { value: 'extra', label: 'ارائه درس اضافه' },
  { value: 'intergroup', label: 'اخذ درس از گروه دیگر' },
  { value: 'capacity', label: 'افزایش ظرفیت دروس' },
  { value: 'general', label: 'برداشتن دو واحد عمومی / تداخل زمانی' },
  { value: 'introduce', label: 'معرفی به استاد' },
  { value: 'leaveWith', label: 'مرخصی با احتساب سنوات' },
  { value: 'leaveWithout', label: 'مرخصی بدون احتساب سنوات' },
  { value: 'olympiad', label: 'شرکت در المپیاد' },
  { value: 'teachingAssistant', label: 'دستیار آموزشی' },
  { value: 'extension', label: 'تمدید سنوات (ارفاقی)' },
  { value: 'guest', label: 'مهمان دائم یا موقت' },
  { value: 'project', label: 'پروژه کارشناسی' },
  { value: 'seminar', label: 'سمینار ارشد' },
]

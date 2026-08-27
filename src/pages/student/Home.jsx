import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { branding } from '../../config/branding'

const cards = [
  {
    id: 'faq',
    icon: 'bi-question-circle',
    title: 'سوالات متداول',
    desc: 'پاسخ به سوالات پرتکرار دانشجویان',
    link: '/faq',
    gradient: 'from-amber-400 to-orange-500',
    soft: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
    ring: 'group-hover:ring-amber-200',
  },
  {
    id: 'new-request',
    icon: 'bi-file-earmark-plus',
    title: 'ثبت درخواست جدید',
    desc: 'ثبت انواع درخواست‌های دانشجویی',
    link: '/new-request',
    gradient: 'from-indigo-500 to-indigo-600',
    soft: 'bg-indigo-50 text-indigo-700',
    border: 'border-indigo-200',
    ring: 'group-hover:ring-indigo-200',
  },
  {
    id: 'track',
    icon: 'bi-search',
    title: 'پیگیری درخواست',
    desc: 'پیگیری وضعیت درخواست با کد پیگیری',
    link: '/track-request',
    gradient: 'from-emerald-500 to-teal-600',
    soft: 'bg-emerald-50 text-emerald-700',
    border: 'border-emerald-200',
    ring: 'group-hover:ring-emerald-200',
  },
]

function Home() {
  return (
    <div className="space-y-8" dir="rtl">
      <Header />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>

      <ChatbotCard />
    </div>
  )
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-indigo-600 to-indigo-500 p-8 text-white shadow-lg"
    >
      <div className="relative z-10">
        <p className="mb-1 text-sm text-white/80">
          {branding.universityName} · {branding.departmentName}
        </p>
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          به سامانه دانشجویی خوش آمدید
        </h1>
        <p className="text-sm text-white/85 md:text-base">
          {branding.homeSubtitle}
        </p>
      </div>
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    </motion.div>
  )
}

function Card({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link to={card.link} className="block h-full">
        <div
          className={`relative h-full overflow-hidden rounded-2xl border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg group-hover:ring-2 ${card.border} ${card.ring}`}
        >
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
          >
            <i className={`bi ${card.icon}`} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-800">{card.title}</h3>
          <p className="mt-2 text-sm text-slate-500">{card.desc}</p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-all group-hover:gap-3">
            <span>مشاهده</span>
            <i className="bi bi-arrow-left text-xs" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ChatbotCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      <Link to="/chatbot" className="block">
        <div className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-l from-indigo-50 to-white p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-md">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                <i className="bi bi-robot" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">چت‌بات هوشمند</h4>
                <p className="text-sm text-slate-500">پاسخگویی خودکار به سوالات شما</p>
              </div>
            </div>
            <div className="mr-auto text-slate-400 transition-transform duration-300 group-hover:-translate-x-1">
              <i className="bi bi-arrow-left text-lg" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Home
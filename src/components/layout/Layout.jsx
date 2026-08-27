import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import ChatbotFloating from '../ChatbotFloating'
import { Toaster } from 'react-hot-toast'
import { branding } from '../../config/branding'

const menuItems = [
  { path: '/', icon: 'bi-house-door', label: 'خانه' },
  { path: '/faq', icon: 'bi-question-circle', label: 'سوالات متداول' },
  { path: '/new-request', icon: 'bi-file-earmark-plus', label: 'ثبت درخواست' },
  { path: '/track-request', icon: 'bi-search', label: 'پیگیری' },
  { path: '/chatbot', icon: 'bi-robot', label: 'چت‌بات' },
]

const pageIcons = {
  خانه: 'bi-house-door-fill',
  'سوالات متداول': 'bi-question-circle-fill',
  'ثبت درخواست': 'bi-file-earmark-plus-fill',
  پیگیری: 'bi-search',
  'چت‌بات': 'bi-robot',
}

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    localStorage.setItem('darkMode', 'false')
    document.documentElement.classList.remove('dark')
  }, [])

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false)
  }, [isMobile])

  // بستن با Escape در موبایل
  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  )

  const pageTitle =
    menuItems.find((item) => isActive(item.path))?.label || branding.siteTitle

  return (
    <div className="min-h-screen bg-sand-50 text-sand-700">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            direction: 'rtl',
            borderRadius: '16px',
            padding: '16px',
            background: '#FFF2EB',
            color: '#8A6552',
            border: '1px solid #FFDCDC',
          },
        }}
      />

      <Sidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isActive={isActive}
      />

      <div
        className={[
          'min-h-screen transition-all duration-300',
          isMobile ? 'mr-0' : 'mr-72',
        ].join(' ')}
      >
        <div className="min-h-screen bg-gradient-to-br from-sand-50 via-sand-100 to-sand-50 p-4 md:p-6">
          <div className="overflow-hidden rounded-3xl border border-sand-200 bg-sand-50 shadow-[0_8px_40px_rgba(232,176,144,0.12)]">
            <Header
              isMobile={isMobile}
              setSidebarOpen={setSidebarOpen}
              location={location}
              pageTitle={pageTitle}
            />

            <main className="p-5 md:p-8">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </main>

            <Footer />
          </div>
        </div>
      </div>

      <ChatbotFloating />
    </div>
  )
}

function Sidebar({ isMobile, sidebarOpen, setSidebarOpen, isActive }) {
  return (
    <>
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-sand-800/15 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isMobile ? (sidebarOpen ? 0 : '100%') : 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-sand-200 bg-sand-50 shadow-[0_0_40px_rgba(232,176,144,0.12)]"
      >
        {/* Brand */}
        <div className="flex items-center justify-between gap-2 border-b border-sand-200 p-5">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sand-300 to-sand-200 text-xl text-sand-800 shadow-sm">
              <img
  src="/icons.jpg"
  alt="لوگو"
  className="h-10 w-10 rounded-full object-cover"
/>
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-sand-800">
                {branding.siteTitle}
              </h1>
              <p className="truncate text-xs text-sand-600">
                {branding.departmentName}
              </p>
            </div>
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl p-2 text-sand-600 transition-colors hover:bg-sand-100"
              aria-label="بستن منو"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <NavLink
                to={item.path}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={({ isActive: active }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-sand-300 text-sand-800 shadow-sm'
                      : 'text-sand-700 hover:bg-sand-100 hover:text-sand-800',
                  ].join(' ')
                }
              >
                <i className={`bi ${item.icon} text-lg flex-shrink-0`} />
                <span className="truncate">{item.label}</span>
                {isActive(item.path) && (
                  <span className="mr-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sand-600" />
                )}
              </NavLink>
            </motion.div>
          ))}

          <div className="my-3 border-t border-sand-200" />

          <NavLink
            to="/admin/login"
            onClick={() => isMobile && setSidebarOpen(false)}
            className={({ isActive: active }) =>
              [
                'flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-sand-300 text-sand-800 shadow-sm'
                  : 'text-sand-600 hover:bg-sand-100 hover:text-sand-800',
              ].join(' ')
            }
          >
            <i className="bi bi-shield-lock text-lg flex-shrink-0" />
            <span>ورود ادمین</span>
          </NavLink>
        </nav>

        {/* Help footer */}
        <div className="border-t border-sand-200 bg-sand-100/90 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sand-300 text-xs font-bold text-sand-800">
              ؟
            </div>
            <div>
              <p className="text-xs font-medium text-sand-700">نیاز به راهنما؟</p>
              <p className="text-[10px] text-sand-600">از بخش چت‌بات بپرسید</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

function Header({ isMobile, setSidebarOpen, location, pageTitle }) {
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200 bg-sand-50/90 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex min-w-0 items-center gap-3">
          {isMobile && (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2.5 text-sand-700 transition-colors hover:bg-sand-100"
              aria-label="باز کردن منو"
            >
              <i className="bi bi-list text-2xl" />
            </button>
          )}

          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sand-300 to-sand-200 text-lg text-sand-800 shadow-sm sm:flex">
              <i className={`bi ${pageIcons[pageTitle] || 'bi-house-door-fill'}`} />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-sand-800 md:text-xl">
                {pageTitle}
              </h1>
              <p className="truncate text-[10px] text-sand-600 md:text-xs">
                {isHome ? 'صفحه اصلی' : branding.siteTitle}
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/admin/login"
          className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-sand-300/60 bg-sand-300 px-3.5 py-2.5 text-sm font-medium text-sand-800 shadow-sm transition-colors hover:bg-sand-200"
        >
          <i className="bi bi-shield-lock" />
          <span className="hidden sm:inline">ورود ادمین</span>
        </Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100/60 py-5 text-center">
      <p className="text-sm text-sand-600">
        © 1405 — {branding.siteTitle}
        <span className="hidden sm:inline"> | {branding.departmentName}</span>
      </p>
    </footer>
  )
}

export default Layout
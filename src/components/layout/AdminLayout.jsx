import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { branding } from '../../config/branding'

const menuItems = [
  { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'داشبورد' },
  { path: '/admin/requests', icon: 'bi-files', label: 'لیست درخواست‌ها' },
  { path: '/admin/notes', icon: 'bi-journal-text', label: 'یادداشت‌ها' },
]

function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { displayName, role, logout } = useAuth()

  useEffect(() => {
    localStorage.setItem('darkMode', 'false')
    document.documentElement.classList.remove('dark')
  }, [])

  const handleLogout = async () => {
    if (window.confirm('آیا از خروج از حساب کاربری مطمئن هستید؟')) {
      await logout()
      navigate('/admin/login')
    }
  }

  const isActive = (path) => location.pathname === path

  const roleLabel =
    role === 'department_manager' ? 'مدیر گروه' : 'انجمن علمی'

  return (
    <div className="min-h-screen bg-sand-50 text-sand-700">
      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 right-0 z-50 flex h-full flex-col border-l border-sand-200 bg-sand-50',
          'shadow-[0_0_40px_rgba(232,176,144,0.12)] transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-72',
        ].join(' ')}
      >
        {/* Brand */}
        <div
          className={[
            'flex items-center border-b border-sand-200 p-4',
            isCollapsed ? 'justify-center' : 'justify-between gap-2',
          ].join(' ')}
        >
          <Link
            to="/admin/dashboard"
            className={['flex items-center gap-3 min-w-0', isCollapsed ? 'justify-center' : ''].join(' ')}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sand-300 to-sand-200 text-xl text-sand-800 shadow-sm">
      
              <img
  src="/icons.jpg"
  alt="لوگو"
  className="h-10 w-10 rounded-full object-cover"
/>
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="truncate text-base font-bold text-sand-800">
                  {branding.adminPanelTitle}
                </h1>
                <p className="truncate text-xs text-sand-600">
                  {branding.adminPanelSubtitle}
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCollapsed((v) => !v)}
            className="rounded-lg p-1.5 text-sand-600 transition-colors hover:bg-sand-100"
            aria-label={isCollapsed ? 'باز کردن منو' : 'جمع کردن منو'}
            title={isCollapsed ? 'باز کردن' : 'جمع کردن'}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3 pb-28">
          {menuItems.map((item) => {
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                className={[
                  'flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200',
                  isCollapsed ? 'justify-center' : '',
                  active
                    ? 'bg-sand-300 text-sand-800 shadow-sm'
                    : 'text-sand-700 hover:bg-sand-100 hover:text-sand-800',
                ].join(' ')}
              >
                <i className={`bi ${item.icon} text-lg flex-shrink-0`} />
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {active && (
                      <span className="mr-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sand-600" />
                    )}
                  </>
                )}
              </Link>
            )
          })}

          <div className="my-3 border-t border-sand-200" />

          <Link
            to="/"
            title={isCollapsed ? 'بازگشت به سایت' : undefined}
            className={[
              'flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-sand-600 transition-all duration-200 hover:bg-sand-100 hover:text-sand-800',
              isCollapsed ? 'justify-center' : '',
            ].join(' ')}
          >
            <i className="bi bi-arrow-right text-lg flex-shrink-0" />
            {!isCollapsed && <span>بازگشت به سایت</span>}
          </Link>
        </nav>

        {/* User footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sand-200 bg-sand-100/95 p-3 backdrop-blur-sm">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sand-300 text-sm font-bold text-sand-800">
                {(displayName || '؟').charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sand-800">
                  {displayName || 'کاربر'}
                </p>
                <p className="truncate text-xs text-sand-600">{roleLabel}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-200"
                aria-label="خروج"
                title="خروج"
              >
                <i className="bi bi-box-arrow-left" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-200"
                aria-label="خروج"
                title="خروج"
              >
                <i className="bi bi-box-arrow-left" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div
        className={[
          'min-h-screen transition-all duration-300',
          isCollapsed ? 'mr-20' : 'mr-72',
        ].join(' ')}
      >
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
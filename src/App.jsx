import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { motion, AnimatePresence } from 'framer-motion'

import Layout from './components/layout/Layout'

const Home = lazy(() => import('./pages/student/Home'))
const FAQ = lazy(() => import('./pages/student/FAQ'))
const NewRequest = lazy(() => import('./pages/student/NewRequest'))
const TrackRequest = lazy(() => import('./pages/student/TrackRequest'))
const ChatbotPage = lazy(() => import('./pages/student/ChatbotPage'))

const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Requests = lazy(() => import('./pages/admin/Requests'))
const RequestDetail = lazy(() => import('./pages/admin/RequestDetail'))
const AdminNotes = lazy(() => import('./pages/admin/AdminNotes'))

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-sand-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-sand-200 border-t-sand-400 animate-spin" />
      <p className="text-sm text-sand-600">در حال بارگذاری...</p>
    </div>
  </div>
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  // همیشه تم روشن — بدون دنبال کردن دارک‌مود سیستم
  useEffect(() => {
    localStorage.setItem('darkMode', 'false')
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFF2EB',
              color: '#8A6552',
              borderRadius: '16px',
              padding: '16px 20px',
              direction: 'rtl',
              fontFamily: 'Inter, sans-serif',
              border: '1px solid #FFDCDC',
            },
            success: {
              iconTheme: { primary: '#C9957A', secondary: '#FFF2EB' },
            },
            error: {
              iconTheme: { primary: '#C9957A', secondary: '#FFF2EB' },
            },
          }}
        />

        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Layout>
                      <Home />
                    </Layout>
                  </motion.div>
                }
              />
              <Route
                path="/faq"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Layout>
                      <FAQ />
                    </Layout>
                  </motion.div>
                }
              />
              <Route
                path="/new-request"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Layout>
                      <NewRequest />
                    </Layout>
                  </motion.div>
                }
              />
              <Route
                path="/track-request"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Layout>
                      <TrackRequest />
                    </Layout>
                  </motion.div>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Layout>
                      <ChatbotPage />
                    </Layout>
                  </motion.div>
                }
              />

              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                }
              />
              <Route
                path="/admin/requests"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Requests />
                  </motion.div>
                }
              />
              <Route
                path="/admin/request-detail/:code"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RequestDetail />
                  </motion.div>
                }
              />
              <Route
                path="/admin/notes"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AdminNotes />
                  </motion.div>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </Router>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App
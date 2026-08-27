import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'

import AdminLayout from '../../components/layout/AdminLayout'
import { requestsService } from '../../services/api/requestsService'
import { useAuth } from '../../hooks/useAuth'
import Pagination from '../../components/shared/Pagination'
import RoleBanner from '../../features/dashboard/components/RoleBanner'
import StatsRow from '../../features/requestsList/components/StatsRow'
import RequestsPageFilters from '../../features/requestsList/components/RequestsPageFilters'
import RequestsPageTable from '../../features/requestsList/components/RequestsPageTable'

const LIMIT = 10

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
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

function Requests() {
  const navigate = useNavigate()
  const { isAuthenticated, isGroupManager } = useAuth()

  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => requestsService.getStats().then((res) => res.data),
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 60_000,
  })

  const {
    data: requestsData,
    isLoading: requestsLoading,
    error: requestsError,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: [
      'admin',
      'requests',
      { status: statusFilter, type: typeFilter, search: searchTerm, page },
    ],
    queryFn: () =>
      requestsService
        .getAll({
          status: statusFilter,
          type: typeFilter,
          search: searchTerm,
          page,
          limit: LIMIT,
        })
        .then((res) => res.data),
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 30_000,
  })

  const handleStatusChange = useCallback((value) => {
    setStatusFilter(value)
    setPage(1)
  }, [])

  const handleTypeChange = useCallback((value) => {
    setTypeFilter(value)
    setPage(1)
  }, [])

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleExportExcel = useCallback(async () => {
    setIsExporting(true)
    try {
      const response = await requestsService.exportExcel({
        status: statusFilter,
        type: typeFilter,
        search: searchTerm,
      })
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.download = `درخواست‌ها_${new Date().toLocaleDateString('fa-IR')}.xlsx`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('فایل Excel با موفقیت دانلود شد')
    } catch {
      toast.error('خطا در دانلود فایل Excel')
    } finally {
      setIsExporting(false)
    }
  }, [statusFilter, typeFilter, searchTerm])

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true)
    try {
      const response = await requestsService.exportPdf({
        status: statusFilter,
        type: typeFilter,
        search: searchTerm,
      })
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.download = `درخواست‌ها_${new Date().toLocaleDateString('fa-IR')}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('فایل PDF با موفقیت دانلود شد')
    } catch {
      toast.error('خطا در دانلود فایل PDF')
    } finally {
      setIsExporting(false)
    }
  }, [statusFilter, typeFilter, searchTerm])

  const requests = requestsData?.requests || []
  const totalCount = requestsData?.total || 0
  const totalPages = requestsData?.totalPages || 1
  const hasActiveFilters =
    !!searchTerm || statusFilter !== 'all' || typeFilter !== 'all'

  return (
    <AdminLayout>
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
        className="space-y-6"
        dir="rtl"
      >
        <motion.div variants={itemVariants}>
          <StatsRow
            stats={stats}
            isLoading={statsLoading}
            isError={!!statsError}
            onRetry={refetchStats}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <RequestsPageFilters
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
            typeFilter={typeFilter}
            onTypeChange={handleTypeChange}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            isExporting={isExporting}
            hasRequests={requests.length > 0}
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <RequestsPageTable
            requests={requests}
            isLoading={requestsLoading}
            isError={!!requestsError}
            onRetry={refetchRequests}
            hasActiveFilters={hasActiveFilters}
          />

          {!requestsLoading && requests.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              itemsCount={requests.length}
              totalCount={totalCount}
              onPageChange={handlePageChange}
            />
          )}
        </motion.div>

        <RoleBanner isAdmin={isGroupManager} />
      </motion.div>
    </AdminLayout>
  )
}

export default Requests
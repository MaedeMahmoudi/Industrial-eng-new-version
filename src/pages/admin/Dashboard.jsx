import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import AdminLayout from '../../components/layout/AdminLayout'
import { requestsService } from '../../services/api/requestsService'
import { useAuth } from '../../hooks/useAuth'
import Pagination from '../../components/shared/Pagination'
import StatsGrid from '../../features/dashboard/components/StatsGrid'
import RequestsFilters from '../../features/dashboard/components/RequestsFilters'
import RequestsTable from '../../features/dashboard/components/RequestsTable'
import RequestActionModal from '../../features/dashboard/components/RequestActionModal'
import RoleBanner from '../../features/dashboard/components/RoleBanner'

const LIMIT = 10

const TOAST_OPTIONS = {
  duration: 4000,
  style: {
    direction: 'rtl',
    borderRadius: '16px',
    padding: '16px',
  },
}

function Dashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isAuthenticated, isGroupManager } = useAuth()
  const isAdmin = isGroupManager

  // ============================================
  // State
  // ============================================

  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showActionModal, setShowActionModal] = useState(false)

  const [adminNote, setAdminNote] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  const [isExporting, setIsExporting] = useState(false)

  // ============================================
  // Authentication
  // ============================================

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // ============================================
  // Statistics
  // ============================================

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const response = await requestsService.getStats()
      return response.data
    },
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 60_000,
  })

  // ============================================
  // Requests
  // ============================================

  const {
    data: requestsData,
    isLoading: requestsLoading,
    error: requestsError,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: [
      'admin',
      'requests',
      {
        status: statusFilter,
        type: typeFilter,
        search: searchQuery,
        page,
      },
    ],
    queryFn: async () => {
      const response = await requestsService.getAll({
        limit: LIMIT,
        page,
        status: statusFilter,
        type: typeFilter,
        search: searchQuery,
      })
      return response.data
    },
    enabled: isAuthenticated,
    retry: 1,
    staleTime: 30_000,
  })

  // ============================================
  // Update request status
  // ============================================

  const updateStatusMutation = useMutation({
    mutationFn: ({ trackingCode, status, rejectionReason, adminNote }) =>
      requestsService.updateStatus(trackingCode, {
        status,
        rejectionReason,
        adminNote,
      }),
    onSuccess: () => {
      toast.success('وضعیت درخواست با موفقیت تغییر کرد!', TOAST_OPTIONS)
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
      closeActionModal()
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'مشکلی در تغییر وضعیت درخواست پیش آمد',
        TOAST_OPTIONS
      )
    },
  })

  // ============================================
  // Filters
  // ============================================

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status)
    setPage(1)
  }, [])

  const handleTypeFilter = useCallback((type) => {
    setTypeFilter(type)
    setPage(1)
  }, [])

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }, [])

  // ============================================
  // Request actions
  // ============================================

  const openActionModal = useCallback((request) => {
    setSelectedRequest(request)
    setAdminNote('')
    setRejectionReason('')
    setShowActionModal(true)
  }, [])

  const closeActionModal = useCallback(() => {
    setShowActionModal(false)
    setSelectedRequest(null)
    setAdminNote('')
    setRejectionReason('')
  }, [])

  const handleApprove = useCallback(() => {
    if (!selectedRequest) return
    if (!window.confirm('آیا از تأیید این درخواست مطمئن هستید؟')) return

    updateStatusMutation.mutate({
      trackingCode: selectedRequest.trackingCode,
      status: 'approved',
      adminNote: adminNote.trim() || undefined,
    })
  }, [selectedRequest, adminNote, updateStatusMutation])

  const handleReject = useCallback(() => {
    if (!selectedRequest) return

    const reason = rejectionReason.trim()
    if (!reason) {
      toast.error('لطفاً دلیل رد درخواست را وارد کنید.', TOAST_OPTIONS)
      return
    }

    if (!window.confirm('آیا از رد این درخواست با دلیل ذکر شده مطمئن هستید؟')) {
      return
    }

    updateStatusMutation.mutate({
      trackingCode: selectedRequest.trackingCode,
      status: 'rejected',
      rejectionReason: reason,
      adminNote: adminNote.trim() || undefined,
    })
  }, [selectedRequest, rejectionReason, adminNote, updateStatusMutation])

  // ============================================
  // Export
  // ============================================

  const downloadBlob = useCallback((blob, filename) => {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }, [])

  const exportFilters = {
    status: statusFilter,
    type: typeFilter,
    search: searchQuery,
  }

  const handleExportExcel = useCallback(async () => {
    setIsExporting(true)
    try {
      const response = await requestsService.exportExcel(exportFilters)
      downloadBlob(
        response.data,
        `درخواست‌ها_${new Date().toLocaleDateString('fa-IR')}.xlsx`
      )
      toast.success('فایل Excel با موفقیت آماده شد.', TOAST_OPTIONS)
    } catch {
      toast.error('خطا در دریافت فایل Excel', TOAST_OPTIONS)
    } finally {
      setIsExporting(false)
    }
  }, [statusFilter, typeFilter, searchQuery, downloadBlob])

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true)
    try {
      const response = await requestsService.exportPdf(exportFilters)
      downloadBlob(
        response.data,
        `درخواست‌ها_${new Date().toLocaleDateString('fa-IR')}.pdf`
      )
      toast.success('فایل PDF با موفقیت آماده شد.', TOAST_OPTIONS)
    } catch {
      toast.error('خطا در دریافت فایل PDF', TOAST_OPTIONS)
    } finally {
      setIsExporting(false)
    }
  }, [statusFilter, typeFilter, searchQuery, downloadBlob])

  // ============================================
  // Derived data
  // ============================================

  const requests = requestsData?.requests ?? []
  const totalCount = requestsData?.total ?? 0
  const totalPages = requestsData?.totalPages ?? 1

  // ============================================
  // Render
  // ============================================

  return (
    <AdminLayout>
      <div dir="rtl" className="space-y-6">
        {/* Statistics */}
        <StatsGrid
          stats={stats}
          isLoading={statsLoading}
          isError={!!statsError}
          onRetry={refetchStats}
        />

        {/* Requests section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <RequestsFilters
            totalCount={totalCount}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            statusFilter={statusFilter}
            onStatusFilter={handleStatusFilter}
            typeFilter={typeFilter}
            onTypeFilter={handleTypeFilter}
            isExporting={isExporting}
            hasRequests={requests.length > 0}
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
          />

          <div className="overflow-x-auto">
            <RequestsTable
              requests={requests}
              isLoading={requestsLoading}
              isError={!!requestsError}
              onRetry={refetchRequests}
              isAdmin={isAdmin}
              onOpenActionModal={openActionModal}
            />
          </div>

          {!requestsLoading && requests.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              itemsCount={requests.length}
              totalCount={totalCount}
              onPageChange={setPage}
            />
          )}
        </motion.section>

        <RoleBanner isAdmin={isAdmin} />
      </div>

      <RequestActionModal
        isOpen={showActionModal}
        request={selectedRequest}
        adminNote={adminNote}
        onAdminNoteChange={setAdminNote}
        rejectionReason={rejectionReason}
        onRejectionReasonChange={setRejectionReason}
        isPending={updateStatusMutation.isPending}
        onClose={closeActionModal}
        onApprove={handleApprove}
        onReject={handleReject}
        onStartReject={() => setRejectionReason('')}
      />
    </AdminLayout>
  )
}

export default Dashboard
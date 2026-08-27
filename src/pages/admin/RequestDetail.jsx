import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'

import AdminLayout from '../../components/layout/AdminLayout'
import { requestsService } from '../../services/api/requestsService'
import { useAuth } from '../../hooks/useAuth'
import { statusDetailConfig } from '../../features/requestDetail/components/Shared'
import RequestStatusBanner from '../../features/requestDetail/components/RequestStatusBanner'
import StudentInfoCard from '../../features/requestDetail/components/StudentInfoCard'
import FormDataCard from '../../features/requestDetail/components/FormDataCard'
import RejectionReasonCard from '../../features/requestDetail/components/RejectionReasonCard'
import HistoryTimeline from '../../features/requestDetail/components/HistoryTimeline'
import AdminActionsPanel from '../../features/requestDetail/components/AdminActionsPanel'
import ReadOnlyNotice from '../../features/requestDetail/components/ReadOnlyNotice'
import {
  RequestDetailLoading,
  RequestDetailNotFound,
} from '../../features/requestDetail/components/StatusStates'

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

function RequestDetail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated, isGroupManager } = useAuth()

  const [showRejectInput, setShowRejectInput] = useState(false)
  const [adminNote, setAdminNote] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'request', code],
    queryFn: () =>
      requestsService.getByTrackingCode(code).then((res) => res.data),
    enabled: !!code && isAuthenticated,
    retry: 1,
    staleTime: 30_000,
  })

  const updateStatus = useMutation({
    mutationFn: ({ trackingCode, status, rejectionReason, adminNote }) =>
      requestsService
        .updateStatus(trackingCode, { status, rejectionReason, adminNote })
        .then((res) => res.data),
    onSuccess: (data) => {
      const statusLabel = statusDetailConfig[data.status]?.label || data.status
      toast.success(`وضعیت درخواست به «${statusLabel}» تغییر کرد`)
      queryClient.invalidateQueries({ queryKey: ['admin', 'request', code] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
      setShowRejectInput(false)
      setRejectionReason('')
      setAdminNote('')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'خطا در تغییر وضعیت')
    },
  })

  const handleApprove = useCallback(() => {
    if (!window.confirm('آیا از تأیید این درخواست مطمئن هستید؟')) return
    updateStatus.mutate({
      trackingCode: code,
      status: 'approved',
      adminNote: adminNote.trim() || undefined,
    })
  }, [code, adminNote, updateStatus])

  const handleReject = useCallback(() => {
    if (!rejectionReason.trim()) {
      toast.error('لطفاً دلیل رد را وارد کنید.')
      return
    }
    if (!window.confirm('آیا از رد این درخواست با دلیل ذکر شده مطمئن هستید؟')) {
      return
    }
    updateStatus.mutate({
      trackingCode: code,
      status: 'rejected',
      rejectionReason: rejectionReason.trim(),
      adminNote: adminNote.trim() || undefined,
    })
  }, [code, rejectionReason, adminNote, updateStatus])

  const handleCancelReject = useCallback(() => {
    setShowRejectInput(false)
    setRejectionReason('')
  }, [])

  if (isLoading) return <RequestDetailLoading />
  if (error || !request) return <RequestDetailNotFound />

  const isAdmin = isGroupManager
  const isPending = request.status === 'pending'
  const isProcessing = updateStatus.isPending
  const hasFormData =
    request.formData && Object.keys(request.formData).length > 0

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
        className="mx-auto max-w-4xl space-y-6"
        dir="rtl"
      >
        <RequestStatusBanner request={request} variants={itemVariants} />

        <StudentInfoCard request={request} variants={itemVariants} />

        {hasFormData && (
          <FormDataCard formData={request.formData} variants={itemVariants} />
        )}

        {request.status === 'rejected' && (
          <RejectionReasonCard reason={request.rejectionReason} />
        )}

        {request.history && request.history.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
              <i className="bi bi-clock-history text-indigo-500" />
              تاریخچه وضعیت
            </h2>
            <HistoryTimeline history={request.history} />
          </motion.div>
        )}

        {isAdmin && isPending && (
          <AdminActionsPanel
            variants={itemVariants}
            adminNote={adminNote}
            onAdminNoteChange={setAdminNote}
            showRejectInput={showRejectInput}
            rejectionReason={rejectionReason}
            onRejectionReasonChange={setRejectionReason}
            isProcessing={isProcessing}
            onApprove={handleApprove}
            onReject={handleReject}
            onStartReject={() => setShowRejectInput(true)}
            onCancelReject={handleCancelReject}
          />
        )}

        {!isAdmin && !isPending && <ReadOnlyNotice variants={itemVariants} />}

        <motion.div variants={itemVariants} className="text-center">
          <Link
            to="/admin/requests"
            className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-600"
          >
            <i className="bi bi-arrow-right transition-transform group-hover:-translate-x-1" />
            بازگشت به لیست درخواست‌ها
          </Link>
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}

export default RequestDetail
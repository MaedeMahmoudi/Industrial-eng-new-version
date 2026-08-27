import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import AdminLayout from '../../components/layout/AdminLayout'
import { adminNotesService } from '../../services/api/adminNotesService'
import { useAuth } from '../../hooks/useAuth'
import NoteCard from '../../features/adminNotes/components/NoteCard'
import NoteFormModal from '../../features/adminNotes/components/NoteFormModal'

function AdminNotes() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()

  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState('create')
  const [activeNote, setActiveNote] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const {
    data: notes = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'notes'],
    queryFn: async () => {
      const response = await adminNotesService.getAll()
      return response.data
    },
    enabled: isAuthenticated,
    staleTime: 60_000,
  })

  const closeModal = useCallback(() => {
    setShowModal(false)
    setActiveNote(null)
    setTitle('')
    setContent('')
  }, [])

  const createMutation = useMutation({
    mutationFn: () => adminNotesService.create(title.trim(), content.trim()),
    onSuccess: () => {
      toast.success('یادداشت با موفقیت اضافه شد')
      queryClient.invalidateQueries({ queryKey: ['admin', 'notes'] })
      closeModal()
    },
    onError: () => toast.error('خطا در افزودن یادداشت'),
  })

  const updateMutation = useMutation({
    mutationFn: () =>
      adminNotesService.update(activeNote.id, title.trim(), content.trim()),
    onSuccess: () => {
      toast.success('یادداشت با موفقیت ویرایش شد')
      queryClient.invalidateQueries({ queryKey: ['admin', 'notes'] })
      closeModal()
    },
    onError: () => toast.error('خطا در ویرایش یادداشت'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => adminNotesService.delete(id),
    onSuccess: () => {
      toast.success('یادداشت حذف شد')
      queryClient.invalidateQueries({ queryKey: ['admin', 'notes'] })
    },
    onError: () => toast.error('خطا در حذف یادداشت'),
  })

  const openCreateModal = useCallback(() => {
    setMode('create')
    setActiveNote(null)
    setTitle('')
    setContent('')
    setShowModal(true)
  }, [])

  const openEditModal = useCallback((note) => {
    setMode('edit')
    setActiveNote(note)
    setTitle(note.title ?? '')
    setContent(note.content ?? '')
    setShowModal(true)
  }, [])

  const handleSave = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      toast.error('عنوان و متن یادداشت الزامی است')
      return
    }
    if (mode === 'edit') updateMutation.mutate()
    else createMutation.mutate()
  }, [title, content, mode, createMutation, updateMutation])

  const handleDelete = useCallback(
    (note) => {
      if (window.confirm(`آیا از حذف یادداشت «${note.title}» مطمئن هستید؟`)) {
        deleteMutation.mutate(note.id)
      }
    },
    [deleteMutation]
  )

  const isSaving = createMutation.isPending || updateMutation.isPending

  return (
    <AdminLayout>
      <div dir="rtl" className="space-y-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <i className="bi bi-journal-text text-xl" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">یادداشت‌های داخلی</h1>
              <p className="mt-0.5 text-sm text-slate-500">
                یادداشت‌های خصوصی مدیر گروه و انجمن علمی
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={openCreateModal}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
          >
            <i className="bi bi-plus-lg" aria-hidden="true" />
            یادداشت جدید
          </motion.button>
        </motion.header>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="mt-4 h-3 w-full rounded bg-slate-100" />
                <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
                <div className="mt-2 h-3 w-4/6 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <i className="bi bi-exclamation-triangle text-xl" aria-hidden="true" />
            </div>
            <p className="mt-3 font-medium text-rose-700">خطا در دریافت یادداشت‌ها</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/20"
            >
              <i className="bi bi-arrow-clockwise" aria-hidden="true" />
              تلاش مجدد
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && notes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <i className="bi bi-journal-text text-2xl" aria-hidden="true" />
            </div>
            <h2 className="mt-4 font-semibold text-slate-800">هنوز یادداشتی ثبت نشده است</h2>
            <p className="mt-1 text-sm text-slate-500">اولین یادداشت داخلی خود را ایجاد کنید.</p>
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <i className="bi bi-plus-lg" aria-hidden="true" />
              ایجاد یادداشت
            </button>
          </div>
        )}

        {/* Notes grid */}
        {!isLoading && !isError && notes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                index={index}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <NoteFormModal
        isOpen={showModal}
        mode={mode}
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        isPending={isSaving}
        onClose={closeModal}
        onSave={handleSave}
      />
    </AdminLayout>
  )
}

export default AdminNotes
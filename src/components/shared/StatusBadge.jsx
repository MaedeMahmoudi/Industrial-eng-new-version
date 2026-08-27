import React from 'react'
import { statusConfig } from '../../features/requests/constants'

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
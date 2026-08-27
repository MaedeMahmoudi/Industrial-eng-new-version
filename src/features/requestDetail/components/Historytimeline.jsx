import React from 'react'
import { motion } from 'framer-motion'
import { statusDetailConfig } from './shared'

function HistoryTimeline({ history }) {
  if (!history || history.length === 0) return null

  return (
    <div className="relative">
      <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-orange-100"></div>
      <div className="space-y-4">
        {history.map((item, index) => {
          const config = statusDetailConfig[item.status] || statusDetailConfig.pending
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex items-start gap-4 pr-12"
            >
              <div
                className={`absolute right-0 top-1.5 w-3 h-3 rounded-full ${config.badge} ring-4 ring-orange-100`}
              ></div>

              <div className="flex-1 bg-orange-50/50 rounded-xl p-4 border border-orange-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{config.label}</p>
                    {item.note && (
                      <p className="text-xs text-slate-500 mt-1">📝 {item.note}</p>
                    )}
                    {item.reason && (
                      <p className="text-xs text-rose-500 mt-1">❌ {item.reason}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-600">{item.date}</p>
                    <p className="text-xs text-slate-400">{item.time || '---'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryTimeline
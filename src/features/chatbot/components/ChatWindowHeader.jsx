import React from 'react'

function ChatWindowHeader({ isOnline, onClearHistory }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-400 border-b border-orange-200">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm border border-white/30">
          🤖
        </div>
        <div>
          <p className="font-semibold text-white text-sm">چت‌بات هوشمند</p>
          <p className="text-[10px] text-white/80 flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-300 animate-pulse' : 'bg-rose-400'
              }`}
            ></span>
            {isOnline ? 'پاسخگو' : 'آفلاین'}
          </p>
        </div>
      </div>

      <button
        onClick={onClearHistory}
        className="text-white/70 hover:text-white transition p-1.5 rounded-lg hover:bg-white/15"
        title="پاک کردن تاریخچه"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}

export default ChatWindowHeader
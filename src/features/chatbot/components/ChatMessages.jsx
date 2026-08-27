import React from 'react'
import { AnimatePresence } from 'framer-motion'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

function ChatMessages({ messages, isTyping, onFeedback, messagesEndRef }) {
  return (
    <div className="h-[480px] overflow-y-auto p-5 space-y-4 bg-orange-50/40 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isUser={msg.type === 'user'}
            onFeedback={onFeedback}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isTyping && <TypingIndicator />}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages
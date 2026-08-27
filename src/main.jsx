import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// ===== تنظیمات پیشرفته React =====
const root = ReactDOM.createRoot(document.getElementById('root'))

// ===== رندر با StrictMode برای تشخیص خطاها =====
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// ===== گزارش Web Vitals (برای اندازه‌گیری عملکرد) =====
// اگر می‌خوای عملکرد سایت رو اندازه‌گیری کنی، این رو فعال کن:
// import { reportWebVitals } from './utils/reportWebVitals'
// reportWebVitals(console.log)

// ===== ثبت Service Worker (برای PWA) =====
// اگر می‌خوای سایت آفلاین کار کنه، این رو فعال کن:
// import * as serviceWorker from './serviceWorker'
// serviceWorker.register()
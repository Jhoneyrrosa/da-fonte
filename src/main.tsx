import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Service Worker: ativo apenas em produção.
// Em dev, desregistra qualquer SW anterior para evitar cache stale.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    })
  } else {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister())
    })
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

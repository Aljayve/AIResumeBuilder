import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { AppWrapper } from './components/common/PageMeta'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper>
      <App />
      <Toaster richColors position="top-right" />
    </AppWrapper>
  </StrictMode>,
)

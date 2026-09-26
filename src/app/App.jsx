import { lazy, Suspense } from 'react'
import { AppProviders } from './providers/AppProviders'
import { AppErrorBoundary } from './ui/AppErrorBoundary'
import { PageLoader } from './ui/PageLoader'
import './styles/global.css'

const HomePage = lazy(() => import('../pages/home/ui/HomePage'))

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProviders>
        <Suspense fallback={<PageLoader />}>
          <HomePage />
        </Suspense>
      </AppProviders>
    </AppErrorBoundary>
  )
}

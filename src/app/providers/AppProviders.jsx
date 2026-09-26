import { createContext, useContext, useMemo } from 'react'
import { useViewportStability } from '../../features/mobile-experience/model/useViewportStability'
import { preventClipboard } from '../../shared/lib/events/prevent-clipboard'

const SiteInteractionContext = createContext(null)

export function AppProviders({ children }) {
  useViewportStability()
  const value = useMemo(() => ({ preventClipboard }), [])

  return <SiteInteractionContext.Provider value={value}>{children}</SiteInteractionContext.Provider>
}

export function useSiteInteraction() {
  const context = useContext(SiteInteractionContext)

  if (!context) throw new Error('useSiteInteraction must be used within AppProviders')

  return context
}

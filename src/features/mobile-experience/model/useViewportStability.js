import { useEffect } from 'react'
import { syncVisualViewport } from '../../../shared/lib/dom/sync-visual-viewport'

export function useViewportStability() {
  useEffect(() => {
    const sync = () => syncVisualViewport()
    const viewport = window.visualViewport

    sync()
    viewport?.addEventListener('resize', sync)
    viewport?.addEventListener('scroll', sync)
    window.addEventListener('orientationchange', sync)
    window.addEventListener('resize', sync)

    return () => {
      viewport?.removeEventListener('resize', sync)
      viewport?.removeEventListener('scroll', sync)
      window.removeEventListener('orientationchange', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])
}

const KEYBOARD_INSET_THRESHOLD = 80

export function syncVisualViewport(root = document.documentElement) {
  const viewport = window.visualViewport
  const height = Math.round(viewport?.height ?? window.innerHeight)
  const offsetTop = Math.round(viewport?.offsetTop ?? 0)
  const keyboardInset = Math.max(0, Math.round(window.innerHeight) - height - offsetTop)

  root.style.setProperty('--app-height', `${height}px`)
  root.style.setProperty('--visual-offset-top', `${offsetTop}px`)
  root.style.setProperty('--keyboard-inset', `${keyboardInset}px`)
  root.dataset.keyboardOpen = String(keyboardInset > KEYBOARD_INSET_THRESHOLD)
}

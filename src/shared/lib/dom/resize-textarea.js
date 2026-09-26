export function resizeTextarea({ composer, footer, intro, textarea, gap = 18 }) {
  if (!composer || !footer || !textarea) return

  textarea.style.height = 'auto'
  const composerStyles = window.getComputedStyle(composer)
  const verticalPadding = Number.parseFloat(composerStyles.paddingTop) + Number.parseFloat(composerStyles.paddingBottom)
  const maxHeight = intro
    ? Math.max(32, composer.getBoundingClientRect().bottom - intro.getBoundingClientRect().bottom - gap - footer.offsetHeight - verticalPadding)
    : Math.max(32, 300 - footer.offsetHeight - verticalPadding)

  textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
}

export function resetTextarea(textarea) {
  if (!textarea) return

  textarea.style.height = ''
  textarea.style.overflowY = 'hidden'
}

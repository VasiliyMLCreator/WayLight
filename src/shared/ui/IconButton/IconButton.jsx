export function IconButton({ ariaLabel, children, className, disabled = false, onClick, type = 'button' }) {
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

export function AuthFormLayout({ children, footer, onSubmit, title }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>{title}</h2>
      <div className="auth-form-fields">{children}</div>
      {footer}
    </form>
  )
}

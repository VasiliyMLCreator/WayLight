import { useId } from 'react'

export function AuthField({ autoComplete, label, onChange, type = 'text', value }) {
  const id = useId()

  return (
    <label className="auth-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} type={type} autoComplete={autoComplete} value={value} onChange={onChange} />
    </label>
  )
}

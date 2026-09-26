import { AuthField } from './AuthField'
import { AuthFormLayout } from './AuthFormLayout'

export function SignUpForm({ isReady, onChangeField, onSubmit, onSwitchToSignIn, values }) {
  return (
    <AuthFormLayout
      title="Регистрация"
      onSubmit={onSubmit}
      footer={
        <>
          <button className="auth-submit" type="submit" disabled={!isReady}>Зарегистрироваться</button>
          <p className="auth-switch">Есть аккаунт? <button type="button" onClick={onSwitchToSignIn}>Войти</button></p>
        </>
      }
    >
      <AuthField label="Имя" autoComplete="name" value={values.name} onChange={onChangeField('signUp', 'name')} />
      <AuthField label="Почта" type="email" autoComplete="email" value={values.email} onChange={onChangeField('signUp', 'email')} />
      <AuthField label="Пароль" type="password" autoComplete="new-password" value={values.password} onChange={onChangeField('signUp', 'password')} />
      <AuthField label="Повторите пароль" type="password" autoComplete="new-password" value={values.passwordConfirmation} onChange={onChangeField('signUp', 'passwordConfirmation')} />
    </AuthFormLayout>
  )
}

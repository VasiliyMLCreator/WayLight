import { authenticationView } from '../model/authentication.reducer'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { VerificationForm } from './VerificationForm'
import './authentication-dialog.css'

const viewFactory = {
  [authenticationView.signIn]: SignInForm,
  [authenticationView.signUp]: SignUpForm,
  [authenticationView.verification]: VerificationForm,
}

export function AuthenticationDialog({ authentication }) {
  const { state } = authentication
  const View = viewFactory[state.view]

  if (!View) return null

  const viewProps = state.view === authenticationView.signIn
    ? {
        isReady: authentication.signInIsReady,
        onChangeField: authentication.changeField,
        onSubmit: authentication.startVerification,
        onSwitchToSignUp: authentication.openSignUp,
        values: state.signIn,
      }
    : state.view === authenticationView.signUp
      ? {
          isReady: authentication.signUpIsReady,
          onChangeField: authentication.changeField,
          onSubmit: authentication.startVerification,
          onSwitchToSignIn: authentication.openSignIn,
          values: state.signUp,
        }
      : {
          code: state.verificationCode,
          inputRefs: authentication.codeInputRefs,
          onChange: authentication.changeVerificationCode,
          onKeyDown: authentication.handleVerificationKeyDown,
          onPaste: authentication.pasteVerificationCode,
        }

  return (
    <div className="auth-overlay" role="presentation">
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-label="Авторизация">
        <button className="auth-close" type="button" onClick={authentication.close} aria-label="Закрыть форму">×</button>
        <View {...viewProps} />
      </section>
    </div>
  )
}

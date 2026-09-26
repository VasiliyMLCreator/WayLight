import { useCallback, useEffect, useReducer, useRef } from 'react'
import { authenticationAction, authenticationView, initialAuthenticationState, authenticationReducer } from './authentication.reducer'

const codeLength = 5

export function useAuthentication() {
  const [state, dispatch] = useReducer(authenticationReducer, initialAuthenticationState)
  const codeInputRefs = useRef([])

  const open = useCallback((view) => dispatch({ type: authenticationAction.open, payload: view }), [])
  const close = useCallback(() => dispatch({ type: authenticationAction.close }), [])

  const changeField = useCallback((form, field) => (event) => {
    dispatch({ type: authenticationAction.fieldChanged, payload: { form, field, value: event.target.value } })
  }, [])

  const startVerification = useCallback((event) => {
    event.preventDefault()
    dispatch({ type: authenticationAction.startVerification })
  }, [])

  const changeVerificationCode = useCallback((index, event) => {
    const value = event.target.value.replace(/\D/g, '').slice(-1)
    dispatch({ type: authenticationAction.verificationCodeChanged, payload: { index, value } })

    if (value && index < codeLength - 1) codeInputRefs.current[index + 1]?.focus()
  }, [])

  const handleVerificationKeyDown = useCallback((index, event) => {
    if (event.key === 'Backspace' && !state.verificationCode[index] && index > 0) codeInputRefs.current[index - 1]?.focus()
  }, [state.verificationCode])

  const pasteVerificationCode = useCallback((event) => {
    const values = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, codeLength).split('')
    if (!values.length) return

    event.preventDefault()
    values.forEach((value, index) => dispatch({ type: authenticationAction.verificationCodeChanged, payload: { index, value } }))
    codeInputRefs.current[Math.min(values.length, codeLength) - 1]?.focus()
  }, [])

  useEffect(() => {
    if (state.view !== authenticationView.verification) return

    const frame = requestAnimationFrame(() => codeInputRefs.current[0]?.focus())
    return () => cancelAnimationFrame(frame)
  }, [state.view])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }

    if (state.view !== authenticationView.closed) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [close, state.view])

  return {
    close,
    codeInputRefs,
    changeField,
    changeVerificationCode,
    handleVerificationKeyDown,
    openSignIn: () => open(authenticationView.signIn),
    openSignUp: () => open(authenticationView.signUp),
    pasteVerificationCode,
    signInIsReady: Boolean(state.signIn.email.trim() && state.signIn.password),
    signUpIsReady: Boolean(state.signUp.name.trim() && state.signUp.email.trim() && state.signUp.password && state.signUp.password === state.signUp.passwordConfirmation),
    startVerification,
    state,
  }
}

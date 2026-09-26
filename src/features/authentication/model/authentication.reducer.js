export const authenticationView = {
  closed: 'closed',
  signIn: 'signIn',
  signUp: 'signUp',
  verification: 'verification',
}

export const authenticationAction = {
  close: 'close',
  fieldChanged: 'fieldChanged',
  open: 'open',
  startVerification: 'startVerification',
  verificationCodeChanged: 'verificationCodeChanged',
}

const createInitialState = () => ({
  signIn: { email: '', password: '' },
  signUp: { email: '', name: '', password: '', passwordConfirmation: '' },
  verificationCode: Array(5).fill(''),
  view: authenticationView.closed,
})

export const initialAuthenticationState = createInitialState()

export function authenticationReducer(state, action) {
  switch (action.type) {
    case authenticationAction.open:
      return { ...state, view: action.payload }
    case authenticationAction.close:
      return createInitialState()
    case authenticationAction.fieldChanged:
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.value,
        },
      }
    case authenticationAction.startVerification:
      return { ...state, verificationCode: Array(5).fill(''), view: authenticationView.verification }
    case authenticationAction.verificationCodeChanged:
      return {
        ...state,
        verificationCode: state.verificationCode.map((value, index) => index === action.payload.index ? action.payload.value : value),
      }
    default:
      return state
  }
}

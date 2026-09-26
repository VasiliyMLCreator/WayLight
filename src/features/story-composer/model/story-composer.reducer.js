export const storyComposerAction = {
  changed: 'changed',
  submitted: 'submitted',
}

export const initialStoryComposerState = {
  value: '',
}

export function storyComposerReducer(state, action) {
  switch (action.type) {
    case storyComposerAction.changed:
      return { ...state, value: action.payload }
    case storyComposerAction.submitted:
      return { ...state, value: '' }
    default:
      return state
  }
}

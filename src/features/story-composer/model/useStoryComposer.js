import { useCallback, useReducer, useRef } from 'react'
import { resetTextarea, resizeTextarea } from '../../../shared/lib/dom/resize-textarea'
import { initialStoryComposerState, storyComposerAction, storyComposerReducer } from './story-composer.reducer'

export function useStoryComposer(onSubmitted) {
  const [state, dispatch] = useReducer(storyComposerReducer, initialStoryComposerState)
  const textareaRef = useRef(null)

  const change = useCallback((event) => {
    dispatch({ type: storyComposerAction.changed, payload: event.target.value })
    resizeTextarea({
      composer: event.target.closest('.chat-composer'),
      footer: event.target.closest('.chat-composer')?.querySelector('.composer-footer'),
      intro: event.target.closest('.conversation-card')?.querySelector('.story-intro'),
      textarea: event.target,
    })
  }, [])

  const setValue = useCallback((value) => {
    dispatch({ type: storyComposerAction.changed, payload: value })
    requestAnimationFrame(() => {
      const textarea = textareaRef.current
      const composer = textarea?.closest('.chat-composer')
      if (!textarea || !composer) return
      resizeTextarea({
        composer,
        footer: composer.querySelector('.composer-footer'),
        intro: composer.closest('.conversation-card')?.querySelector('.story-intro'),
        textarea,
      })
    })
  }, [])

  const submit = useCallback((event) => {
    event.preventDefault()
    const message = state.value.trim()
    if (!message) return

    onSubmitted?.(message)
    dispatch({ type: storyComposerAction.submitted })
    requestAnimationFrame(() => resetTextarea(textareaRef.current))
  }, [onSubmitted, state.value])

  return {
    isReady: state.value.trim().length > 0,
    textareaRef,
    value: state.value,
    setValue,
    change,
    submit,
  }
}

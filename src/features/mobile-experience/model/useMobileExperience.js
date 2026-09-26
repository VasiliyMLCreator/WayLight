import { useCallback, useReducer } from 'react'

const mobileExperienceView = {
  composer: 'composer',
  explorer: 'explorer',
}

function mobileExperienceReducer(state, action) {
  if (action.type === 'viewChanged') return { view: action.payload }

  return state
}

export function useMobileExperience() {
  const [state, dispatch] = useReducer(mobileExperienceReducer, { view: mobileExperienceView.composer })

  const showComposer = useCallback(() => dispatch({ type: 'viewChanged', payload: mobileExperienceView.composer }), [])
  const showExplorer = useCallback(() => dispatch({ type: 'viewChanged', payload: mobileExperienceView.explorer }), [])

  return {
    view: state.view,
    showComposer,
    showExplorer,
  }
}

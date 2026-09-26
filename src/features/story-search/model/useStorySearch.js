import { useCallback, useState } from 'react'

export function useStorySearch() {
  const [value, setValue] = useState('')

  const change = useCallback((event) => setValue(event.target.value), [])
  const submit = useCallback((event) => event.preventDefault(), [])

  return {
    isReady: value.trim().length > 0,
    value,
    change,
    submit,
  }
}

import { useId } from 'react'
import { IconButton } from '../../../shared/ui/IconButton/IconButton'
import { ArrowIcon } from '../../../shared/ui/icons/ArrowIcon'
import { SearchIcon } from '../../../shared/ui/icons/SearchIcon'

export function StorySearchForm({ isReady, onChange, onSubmit, placeholder, value }) {
  const searchId = useId()

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={searchId}>Поиск историй</label>
      <SearchIcon />
      <input id={searchId} value={value} onChange={onChange} placeholder={placeholder} />
      <IconButton type="submit" disabled={!isReady} ariaLabel="Искать">
        <ArrowIcon />
      </IconButton>
    </form>
  )
}

import libraryBackdrop from '../../../assets/library-backdrop.svg'
import { siteContent } from '../../../shared/config/site-content'
import { ArrowIcon } from '../../../shared/ui/icons/ArrowIcon'
import { TextIcon } from '../../../shared/ui/icons/TextIcon'
import { IconButton } from '../../../shared/ui/IconButton/IconButton'
import { useStorySearch } from '../../../features/story-search/model/useStorySearch'
import { StorySearchForm } from '../../../features/story-search/ui/StorySearchForm'

export function StoryExplorerCard({ onOpenComposer }) {
  const storySearch = useStorySearch()
  const { description, linkLabel, placeholder, title } = siteContent.home.storyExplorer

  return (
    <section className="library-card" aria-labelledby="library-title">
      <img src={libraryBackdrop} alt="" className="library-backdrop" />
      <IconButton className="mobile-card-switch" onClick={onOpenComposer} ariaLabel="Открыть форму истории">
        <TextIcon />
      </IconButton>
      <div className="library-content">
        <div className="library-heading">
          <h2 id="library-title">{title[0]}<br />{title[1]}</h2>
          <p className="card-overline">{description}</p>
        </div>
        <StorySearchForm
          isReady={storySearch.isReady}
          onChange={storySearch.change}
          onSubmit={storySearch.submit}
          placeholder={placeholder}
          value={storySearch.value}
        />
        <a href="#stories" className="library-link">{linkLabel} <ArrowIcon /></a>
      </div>
    </section>
  )
}

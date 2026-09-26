import conversationBackdrop from '../../../assets/conversation-backdrop.svg'
import { siteContent } from '../../../shared/config/site-content'
import { useStoryComposer } from '../../../features/story-composer/model/useStoryComposer'
import { StoryComposer } from '../../../features/story-composer/ui/StoryComposer'
import { IconButton } from '../../../shared/ui/IconButton/IconButton'
import { SearchIcon } from '../../../shared/ui/icons/SearchIcon'

export function StoryComposerCard({ onOpenExplorer, onSubmit }) {
  const storyComposer = useStoryComposer(onSubmit)
  const { description, placeholder, title } = siteContent.home.storyComposer

  return (
    <section className="conversation-card" style={{ '--card-backdrop': `url(${conversationBackdrop})` }} aria-labelledby="conversation-title">
      <IconButton className="mobile-card-switch" onClick={onOpenExplorer} ariaLabel="Открыть поиск историй">
        <SearchIcon />
      </IconButton>
      <div className="story-intro">
        <h2 id="conversation-title">{title}</h2>
        <p>{description}</p>
      </div>
      <StoryComposer
        isReady={storyComposer.isReady}
        onChange={storyComposer.change}
        onSubmit={storyComposer.submit}
        placeholder={placeholder}
        textareaRef={storyComposer.textareaRef}
        value={storyComposer.value}
      />
    </section>
  )
}

import { siteContent } from '../../../shared/config/site-content'
import { useMobileExperience } from '../../../features/mobile-experience/model/useMobileExperience'
import { StoryComposerCard } from '../../story-composer-card/ui/StoryComposerCard'
import { StoryExplorerCard } from '../../story-explorer-card/ui/StoryExplorerCard'

export function HomeHero({ onCreateChat }) {
  const { eyebrow, title } = siteContent.home
  const mobileExperience = useMobileExperience()

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span></span>{eyebrow}</p>
        <h1 id="hero-title">{title[0]}<br />{title[1]}</h1>
      </div>
      <div className="experience-grid" data-mobile-view={mobileExperience.view}>
        <StoryComposerCard onOpenExplorer={mobileExperience.showExplorer} onSubmit={onCreateChat} />
        <StoryExplorerCard onOpenComposer={mobileExperience.showComposer} />
      </div>
    </section>
  )
}

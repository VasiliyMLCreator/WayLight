import { siteContent } from '../../../shared/config/site-content'

export function AppFooter() {
  return (
    <footer className="footer" id="stories">
      <p>{siteContent.home.footer}</p>
    </footer>
  )
}

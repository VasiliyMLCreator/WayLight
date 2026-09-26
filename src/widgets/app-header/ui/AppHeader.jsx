import { siteContent } from '../../../shared/config/site-content'
import { Brand } from '../../../shared/ui/Brand/Brand'

export function AppHeader({ onLogin }) {
  return (
    <header className="topbar">
      <Brand label={siteContent.brand} />
      <button className="login-button" type="button" onClick={onLogin}>Войти</button>
    </header>
  )
}

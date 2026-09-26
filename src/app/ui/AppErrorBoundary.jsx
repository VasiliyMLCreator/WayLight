import { Component } from 'react'

export class AppErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <main className="app-error">Не удалось загрузить страницу. Обновите её и попробуйте снова.</main>
    }

    return this.props.children
  }
}

import { useEffect, useRef, useState } from 'react'
import { useStoryComposer } from '../../../features/story-composer/model/useStoryComposer'
import { StoryComposer } from '../../../features/story-composer/ui/StoryComposer'
import { Brand } from '../../../shared/ui/Brand/Brand'
import { ArrowIcon } from '../../../shared/ui/icons/ArrowIcon'
import { NewChatIcon } from '../../../shared/ui/icons/NewChatIcon'
import { CopyIcon } from '../../../shared/ui/icons/CopyIcon'
import { CheckIcon } from '../../../shared/ui/icons/CheckIcon'
import { EditIcon } from '../../../shared/ui/icons/EditIcon'
import { RegenerateIcon } from '../../../shared/ui/icons/RegenerateIcon'
import { SearchIcon } from '../../../shared/ui/icons/SearchIcon'
import { MoreIcon } from '../../../shared/ui/icons/MoreIcon'
import { PinIcon } from '../../../shared/ui/icons/PinIcon'
import { TrashIcon } from '../../../shared/ui/icons/TrashIcon'
import { IconButton } from '../../../shared/ui/IconButton/IconButton'
import { siteContent } from '../../../shared/config/site-content'

export function ChatWorkspace({ activeChatId, chats, onAppendMessage, onDeleteChat, onSelectChat, onToggleChatPinned, onUpdateMessage, userName }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSidebarOpening, setIsSidebarOpening] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0)
  const isMemoryMode = sliderPosition >= 50
  const [editingMessageId, setEditingMessageId] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState(null)
  const [chatSearch, setChatSearch] = useState('')
  const [submittedAiSearch, setSubmittedAiSearch] = useState('')
  const [searchMode, setSearchMode] = useState('classic')
  const [isSearchModeOpen, setIsSearchModeOpen] = useState(false)
  const [openChatMenuId, setOpenChatMenuId] = useState(null)
  const copyTimerRef = useRef(null)
  const sidebarTimerRef = useRef(null)
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const submitMessage = (text) => {
    if (editingMessageId) {
      onUpdateMessage(activeChatId, editingMessageId, text)
      setEditingMessageId(null)
      return
    }
    onAppendMessage(activeChatId, text)
  }
  const composer = useStoryComposer(submitMessage)

  useEffect(() => () => {
    window.clearTimeout(copyTimerRef.current)
    window.clearTimeout(sidebarTimerRef.current)
  }, [])

  const toggleSidebar = () => {
    if (isSidebarCollapsed) {
      setIsSidebarOpening(true)
      window.clearTimeout(sidebarTimerRef.current)
      sidebarTimerRef.current = window.setTimeout(() => setIsSidebarOpening(false), 720)
    }
    setIsSidebarCollapsed((collapsed) => !collapsed)
  }

  useEffect(() => {
    const closeChatMenu = (event) => {
      const openEntry = document.querySelector('.chat-history-entry.is-menu-open')
      if (openEntry && !openEntry.contains(event.target)) setOpenChatMenuId(null)
    }

    document.addEventListener('pointerdown', closeChatMenu)
    return () => document.removeEventListener('pointerdown', closeChatMenu)
  }, [])

  const copyMessage = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setCopyStatus('Текст скопирован')
      window.clearTimeout(copyTimerRef.current)
      copyTimerRef.current = window.setTimeout(() => setCopiedMessageId(null), 3000)
    } catch {
      setCopiedMessageId(null)
      setCopyStatus('Не удалось скопировать текст')
    }
  }

  const editMessage = (message) => {
    setEditingMessageId(message.id)
    composer.setValue(message.text)
    requestAnimationFrame(() => composer.textareaRef.current?.focus())
  }

  const showRegenerationNotice = () => {
    setCopyStatus('Перегенерация ответа пока недоступна')
  }

  const normalizedSearch = (searchMode === 'ai' ? submittedAiSearch : chatSearch.trim()).toLocaleLowerCase('ru')
  const visibleChats = [...chats]
    .filter((chat) => (
      !normalizedSearch || `${chat.title} ${chat.messages.map((message) => message.text).join(' ')}`.toLocaleLowerCase('ru').includes(normalizedSearch)
    ))
    .sort((first, second) => Number(Boolean(second.isPinned)) - Number(Boolean(first.isPinned)))
  const userInitials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase('ru'))
    .join('')

  return (
    <div className={`chat-workspace${isSidebarCollapsed ? ' chat-workspace--collapsed' : ''}${isSidebarOpening ? ' chat-workspace--opening' : ''}`}>
      <aside className="chat-sidebar" aria-label="История чатов">
        <div className="chat-sidebar-header">
          <Brand label={siteContent.brand} />
          <div className="sidebar-actions">
            <IconButton className="new-chat-button" onClick={() => onSelectChat(null)} ariaLabel="Новый разговор">
              <NewChatIcon />
            </IconButton>
            <IconButton className="sidebar-toggle" onClick={toggleSidebar} ariaLabel={isSidebarCollapsed ? 'Открыть историю чатов' : 'Свернуть историю чатов'}>
              <ArrowIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat-history">
          <p className="chat-history-label">{isMemoryMode ? 'Память' : 'Чаты'}</p>
          <form
            className="chat-search"
            onSubmit={(event) => {
              event.preventDefault()
              if (searchMode === 'ai') setSubmittedAiSearch(chatSearch.trim())
            }}
          >
            <button
              className="chat-search-mode-trigger"
              type="button"
              aria-label={`Тип поиска: ${searchMode === 'classic' ? 'Классика' : 'AI'}`}
              aria-expanded={isSearchModeOpen}
              onClick={() => setIsSearchModeOpen((open) => !open)}
            >
              <span>{searchMode === 'classic' ? 'Классика' : 'AI'}</span>
              <SearchIcon />
            </button>
            <input
              type="search"
              value={chatSearch}
              onChange={(event) => setChatSearch(event.target.value)}
              placeholder="Поиск по чатам"
              aria-label="Поиск по истории чатов"
            />
            {searchMode === 'ai' && (
              <button className="chat-search-submit" type="submit" disabled={!chatSearch.trim()} aria-label="Отправить запрос">
                <ArrowIcon />
              </button>
            )}
            {isSearchModeOpen && (
              <div className="chat-search-mode-menu" role="group" aria-label="Тип поиска">
                {[
                  { id: 'classic', label: 'Классика' },
                  { id: 'ai', label: 'AI' },
                ].map((mode) => (
                  <button
                    className="chat-search-mode-option"
                    type="button"
                    key={mode.id}
                    onClick={() => {
                      setSearchMode(mode.id)
                      setIsSearchModeOpen(false)
                    }}
                  >
                    <span>{mode.label}</span>
                    <SearchIcon />
                    {searchMode === mode.id && <CheckIcon />}
                  </button>
                ))}
              </div>
            )}
          </form>
          <div className="chat-history-divider" aria-hidden="true" />
          <div className={`chat-history-list${isMemoryMode ? ' chat-history-list--hidden' : ''}`}>
            {visibleChats.map((chat) => {
              const isMenuOpen = openChatMenuId === chat.id
              return (
                <div className={`chat-history-entry${chat.id === activeChatId ? ' is-active' : ''}${isMenuOpen ? ' is-menu-open' : ''}`} key={chat.id}>
                  <button className="chat-history-item" type="button" onClick={() => onSelectChat(chat.id)}>
                    <span>{chat.title}</span>
                  </button>
                  {chat.isPinned && <PinIcon className="chat-history-pin" />}
                  <button
                    className="chat-history-more"
                    type="button"
                    aria-label={`Действия для чата «${chat.title}»`}
                    aria-expanded={isMenuOpen}
                    onClick={() => setOpenChatMenuId(isMenuOpen ? null : chat.id)}
                  >
                    <MoreIcon />
                  </button>
                  <div className="chat-history-actions">
                    <button className="chat-history-add" type="button" onClick={() => { onSelectChat(chat.id); setOpenChatMenuId(null) }}>
                      Добавить
                    </button>
                    <button
                      className={`chat-history-pin-button${chat.isPinned ? ' is-pinned' : ''}`}
                      type="button"
                      aria-label={chat.isPinned ? 'Открепить чат' : 'Закрепить чат'}
                      title={chat.isPinned ? 'Открепить чат' : 'Закрепить чат'}
                      onClick={() => { onToggleChatPinned(chat.id); setOpenChatMenuId(null) }}
                    >
                      <PinIcon />
                    </button>
                    <button
                      className="chat-history-delete"
                      type="button"
                      aria-label="Удалить чат"
                      title="Удалить чат"
                      onClick={() => { onDeleteChat(chat.id); setOpenChatMenuId(null) }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              )
            })}
            {visibleChats.length === 0 && <p className="chat-history-empty">Чаты не найдены</p>}
          </div>
        </div>
        <div className="chat-sidebar-footer">
          <div className="profile-avatar-wrap">
            <button className="profile-avatar" type="button" aria-label={`Профиль: ${userName}`}>
              {userInitials}
            </button>
            <span className="profile-tooltip" role="tooltip">{userName}</span>
          </div>
          <div className="sidebar-mode-control">
            <label className={`sidebar-mode-switch${isMemoryMode ? ' is-memory' : ''}`}>
              <span className="sr-only">Переключить режим Чаты или Память</span>
              <input
                type="range"
                min="0"
                max="100"
                step="any"
                value={sliderPosition}
                aria-valuetext={isMemoryMode ? 'Память' : 'Чаты'}
                onChange={(event) => setSliderPosition(Number(event.target.value))}
              />
              <span
                className="sidebar-mode-hint"
                style={{ '--thumb-offset': `calc(${sliderPosition}% - ${sliderPosition * 0.32}px + 2px)` }}
              >
                {isMemoryMode ? 'к чатам...' : 'к памяти...'}
              </span>
              <span
                className="sidebar-mode-thumb"
                style={{ left: `calc(${sliderPosition}% - ${sliderPosition * 0.32}px + 2px)` }}
              >
                <ArrowIcon />
              </span>
            </label>
          </div>
        </div>
      </aside>
      <section className="chat-main" aria-label="Чат WayLight">
        <div className="chat-main-header">
          <IconButton className="mobile-sidebar-toggle" onClick={toggleSidebar} ariaLabel="Открыть историю чатов">
            <ArrowIcon />
          </IconButton>
        </div>
        <div className="chat-messages">
          <div className="chat-messages-inner">
            {activeChat.messages.map((message) => (
              <div className={`chat-message-row chat-message-row--${message.role}`} key={message.id}>
                {message.role === 'assistant' && <span className="chat-message-mark">W</span>}
                <div className="chat-message-content">
                  <div className={`chat-message chat-message--${message.role}`}>
                    <p>{message.text}</p>
                  </div>
                  <div className={`chat-message-actions chat-message-actions--${message.role}`}>
                    {message.role === 'user' ? (
                      <>
                        <button type="button" className="chat-action-button" onClick={() => copyMessage(message.text, message.id)} aria-label="Скопировать сообщение" title="Скопировать">
                          {copiedMessageId === message.id ? <CheckIcon /> : <CopyIcon />}
                        </button>
                        <button type="button" className="chat-action-button" onClick={() => editMessage(message)} aria-label="Редактировать сообщение" title="Редактировать">
                          <EditIcon />
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="chat-action-button" onClick={showRegenerationNotice} aria-label="Перегенерировать ответ" title="Перегенерировать ответ">
                          <RegenerateIcon />
                        </button>
                        <button type="button" className="chat-action-button" onClick={() => copyMessage(message.text, message.id)} aria-label="Скопировать сообщение" title="Скопировать">
                          {copiedMessageId === message.id ? <CheckIcon /> : <CopyIcon />}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only" role="status" aria-live="polite">{copyStatus}</span>
        <div className="chat-input-area">
          <StoryComposer
            isReady={composer.isReady}
            onChange={composer.change}
            onSubmit={composer.submit}
            placeholder="Продолжите разговор..."
            textareaRef={composer.textareaRef}
            value={composer.value}
          />
        </div>
      </section>
    </div>
  )
}

import { useCallback, useState } from 'react'
import { useSiteInteraction } from '../../../app/providers/AppProviders'
import { useAuthentication } from '../../../features/authentication/model/useAuthentication'
import { AuthenticationDialog } from '../../../features/authentication/ui/AuthenticationDialog'
import { AppFooter } from '../../../widgets/app-footer/ui/AppFooter'
import { AppHeader } from '../../../widgets/app-header/ui/AppHeader'
import { HomeHero } from '../../../widgets/home-hero/ui/HomeHero'
import { ChatWorkspace } from '../../../widgets/chat-workspace/ui/ChatWorkspace'
import './home-page.css'

export default function HomePage() {
  const { preventClipboard } = useSiteInteraction()
  const authentication = useAuthentication()
  const [chats, setChats] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)

  const createChat = useCallback((message) => {
    const chat = {
      id: crypto.randomUUID(),
      title: message.length > 38 ? `${message.slice(0, 38)}...` : message,
      messages: [
        { id: crypto.randomUUID(), role: 'user', text: message },
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'Спасибо, что поделились. Я подберу истории людей с похожим опытом и бережно проведу вас дальше.',
        },
      ],
    }
    setChats((currentChats) => [chat, ...currentChats])
    setActiveChatId(chat.id)
  }, [])

  const appendMessage = useCallback((chatId, text) => {
    setChats((currentChats) => currentChats.map((chat) => (
      chat.id === chatId
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              { id: crypto.randomUUID(), role: 'user', text },
              {
                id: crypto.randomUUID(),
                role: 'assistant',
                text: 'Спасибо, что поделились. Я подберу истории людей с похожим опытом и бережно проведу вас дальше.',
              },
            ],
          }
        : chat
    )))
  }, [])

  const updateMessage = useCallback((chatId, messageId, text) => {
    setChats((currentChats) => currentChats.map((chat) => (
      chat.id === chatId
        ? {
            ...chat,
            messages: chat.messages.map((message) => (
              message.id === messageId ? { ...message, text } : message
            )),
          }
        : chat
    )))
  }, [])

  const toggleChatPinned = useCallback((chatId) => {
    setChats((currentChats) => currentChats.map((chat) => (
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    )))
  }, [])

  const deleteChat = useCallback((chatId) => {
    const remainingChats = chats.filter((chat) => chat.id !== chatId)
    setChats(remainingChats)
    if (activeChatId === chatId) setActiveChatId(remainingChats[0]?.id ?? null)
  }, [activeChatId, chats])

  return (
    <main className="page-shell" onCopy={activeChatId ? undefined : preventClipboard} onCut={activeChatId ? undefined : preventClipboard}>
      {activeChatId ? (
        <ChatWorkspace
          chats={chats}
          activeChatId={activeChatId}
          onCreateChat={createChat}
          onAppendMessage={appendMessage}
          onUpdateMessage={updateMessage}
          onToggleChatPinned={toggleChatPinned}
          onDeleteChat={deleteChat}
          onSelectChat={setActiveChatId}
          onLogin={authentication.openSignIn}
          userName={authentication.state.signUp.name.trim() || 'Пользователь'}
        />
      ) : (
        <>
          <AppHeader onLogin={authentication.openSignIn} />
          <HomeHero onCreateChat={createChat} />
          <AppFooter />
        </>
      )}
      <AuthenticationDialog authentication={authentication} />
    </main>
  )
}

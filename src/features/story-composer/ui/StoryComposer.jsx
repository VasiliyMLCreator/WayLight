import { useId, useRef, useState } from 'react'
import { IconButton } from '../../../shared/ui/IconButton/IconButton'
import { ArrowIcon } from '../../../shared/ui/icons/ArrowIcon'

export function StoryComposer({ isReady, onChange, onSubmit, placeholder, textareaRef, value }) {
  const messageId = useId()
  const fileInputId = useId()
  const fileInputRef = useRef(null)
  const [files, setFiles] = useState([])

  const addFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((currentFiles) => {
      const nextFiles = selectedFiles.filter((file) => (
        !currentFiles.some((currentFile) => (
          currentFile.name === file.name
          && currentFile.size === file.size
          && currentFile.lastModified === file.lastModified
        ))
      ))
      return [...currentFiles, ...nextFiles].slice(0, 5)
    })
    event.target.value = ''
  }

  const removeFile = (fileToRemove) => {
    setFiles((currentFiles) => currentFiles.filter((file) => file !== fileToRemove))
  }

  const formatFileName = (fileName) => {
    const extension = fileName.includes('.') ? fileName.split('.').pop() : ''
    const baseName = extension ? fileName.slice(0, -(extension.length + 1)) : fileName
    return `${baseName.slice(0, 10)}.${extension}`
  }

  return (
    <form className="chat-composer" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={messageId}>Опишите своё состояние</label>
      <input
        ref={fileInputRef}
        id={fileInputId}
        className="file-input"
        type="file"
        accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
        multiple
        onChange={addFiles}
      />
      {files.length > 0 && (
        <div className="composer-files">
          {files.map((file) => (
            <span className="composer-file" key={`${file.name}-${file.lastModified}`}>
              <span>{formatFileName(file.name)}</span>
              <button type="button" onClick={() => removeFile(file)} aria-label={`Удалить файл ${file.name}`}>×</button>
            </span>
          ))}
        </div>
      )}
      <textarea
        id={messageId}
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="2"
      />
      <div className="composer-footer">
        <button type="button" className="attach-button" onClick={() => fileInputRef.current?.click()} aria-label="Добавить файл">+</button>
        <IconButton type="submit" className="send-button" disabled={!isReady} ariaLabel="Подобрать истории">
          <ArrowIcon />
        </IconButton>
      </div>
    </form>
  )
}

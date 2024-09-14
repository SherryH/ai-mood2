'use client'
import { updateEntry } from '@/utils/api'
import { JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    await updateEntry(entry.id, value)
  }
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      await updateEntry(entry.id, _value)
      setIsLoading(false)
    },
  })
  return (
    <div className="h-full w-full">
      <button onClick={handleClick}>Save me</button>
      {isLoading && <div>...isLoading</div>}
      <textarea
        className="h-full w-full outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor

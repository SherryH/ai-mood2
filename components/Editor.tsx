'use client'
import { updateEntry } from '@/utils/api'
import { JournalEntry } from '@prisma/client'
import { useState } from 'react'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const handleClick = async () => {
    await updateEntry(entry.id, value)
  }
  return (
    <div className="h-full w-full">
      <button onClick={handleClick}>Save me</button>
      <textarea
        className="h-full w-full outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor

'use client'
import { JournalEntry } from '@prisma/client'
import { useState } from 'react'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  return (
    <div className="h-full w-full">
      <textarea
        className="h-full w-full outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor

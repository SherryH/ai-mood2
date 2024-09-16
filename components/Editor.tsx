'use client'
import { updateEntry } from '@/utils/api'
import { JournalEntry, Analysis } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import AnalysisPanel from './AnalysisPanel'

const Editor = ({
  entry,
}: {
  entry: JournalEntry & { analysis?: Analysis | null }
}) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  const [analysis, setAnalysis] = useState(entry?.analysis)

  const handleClick = async () => {
    await updateEntry(entry.id, value)
  }
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updatedEntry = await updateEntry(entry.id, _value)
      await setAnalysis(updatedEntry.analysis)
      setIsLoading(false)
    },
  })
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <div className="h-full w-full">
          <button onClick={handleClick}>Save me</button>
          {isLoading && <div>...isLoading</div>}
          <textarea
            className="h-full w-full outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <AnalysisPanel analysis={analysis} />
    </div>
  )
}

export default Editor

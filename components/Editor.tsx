'use client'
import { JournalEntry } from '@prisma/client'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  return <div>{entry.content}</div>
}

export default Editor

// this page.tsx is under [id] folder, so {params.id} returns the corresponding id

// Editor is a client component that accepts an "entry" prop
// This [id]/page.tsx is a server component that will get entry data from db

import Editor from '@/components/Editor'
import { getUserFromClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

// the journal entry is auto created when creating a new Entry, and placed on the url
// The journal entry is uniquely identified by the userID + id
// https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints
// So the JournalEntry schema needs to be uniquely identified   @@unique([userId,id])
const getEntry = async (id: string) => {
  const user = await getUserFromClerkId()
  const journalEntry = await prisma.journalEntry.findUniqueOrThrow({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })
  return journalEntry
}

// Server component can pass props to Client component, Editor
// as long as the prop is serialisable
type EntryPageType = {
  id: string
}

const EntryPage = async ({ params }: { params: EntryPageType }) => {
  const entry = await getEntry(params.id)
  return (
    <div className="h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage

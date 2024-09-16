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
    include: {
      // for each journalentry, get the analysis. (Both are relationally defined in DB schema )
      analysis: true,
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
  console.log({ entry })
  const { summary, subject, mood, negative, color } = entry?.analysis ?? {}
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div
          className="bg-blue-300 px-6 py-10"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.value}
                className="flex items-center justify-between px-2 py-4 border-b border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-right">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage

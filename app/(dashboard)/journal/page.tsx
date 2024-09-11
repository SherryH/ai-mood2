// This is a React Server component. All entries are fetched here, rendered into HTML before sending to client
// This page shows all the journal entries belonging to the currentUser

import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserFromClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

// We want to get journal entries from userId, not from clerkId. So we don't use currentUser() from clerk here

const getEntries = async () => {
  const user = await getUserFromClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

/**
 *  Client vs Server mismatch
 * A Q: When I am creating a new entry on the client, and the entries are fetched on the server
 * How does the Server know to refetch the new entries created?
 * NextJS is good at solving this issue
 */

export default async function Journal() {
  const entries = await getEntries()
  console.log({ entries })
  // brand new user gets redirected here
  // using Clerk API, we check no such person exists
  // then sign him/her up
  // if this person  already exists, we redirects you to the journal page
  return (
    <div className="p-10 bg-zinc-400/10 h-full  ">
      <h2 className="text-3xl mb-8">Journal Entries</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

// this is a client React component because we need to handle onclick event listener so we need to use JS on client side (client React component)
// so this is not a Server component, and we cannot put async NewEntryCard like in the Journal/page.tsx

// Journal/page.tsx is a server component, which is also the parent component of this NewEntryCard, client component
// Journal cannot pass any props to NewEntryCard as Journal itself is rendered as html before sending to the client
// Hence, this NewEntryCard does not render any of the returned values to JSX
// After we hit the POST to create a new journal entry, we want to be redirected to the newly created page directly

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard

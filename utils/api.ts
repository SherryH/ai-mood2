import { JournalEntry } from '@prisma/client'

// path ex: /journal
const createURL = (path: string) => {
  return window.location.origin + path
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  })
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

// calling Server REST API using fetch, which expects a standard Request
export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

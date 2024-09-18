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

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

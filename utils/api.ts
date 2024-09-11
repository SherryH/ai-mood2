// path ex: /journal
const createURL = (path: string) => {
  return window.location.origin + path
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

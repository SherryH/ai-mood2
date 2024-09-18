'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { data: answer } = await askQuestion(question)
    setAnswer(answer)
    setQuestion('')
    setLoading(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          disabled={loading}
          value={question}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 text-lg"
          placeholder="Ask a question..."
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
        {loading && <div>...loading</div>}
        {answer && <div>Refined Ansewr: ${answer}</div>}
      </form>
    </div>
  )
}

export default Question

import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
export default async function Home() {
  // user auth logic
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-screen-md mx-auto">
        <h1 className="text-6xl mb-4">The Best Journal App</h1>
        <p className="text-2xl text-white/60 mb-4">
          The best Journal App that tracks your mood throughout your life, ever.
          All you have to do is to be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-400 px-4 py-2 text-lg rounded-md">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

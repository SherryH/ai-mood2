// @ default tsconfig.json path alias for ./
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// In the createNewUser function
// 1. query the db to see if user with this clerkID already exists
// if yes, directs the user to the journal page
// else create this user in the User DB
const createNewUser = async () => {
  // actually this is not needed. This page is a protected page so the user who gets here is authenticated aldy
  // so we don't need to use auth() to check if user is authenticated.
  // const { userId } = await auth()

  // We can call currentUser directly to get the authenticated uerId
  const user = await currentUser()

  if (!user) return
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    // create new user
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }
  // after new user created or user already exists
  redirect('/journal')
}

// we are basically using this page as a API route
// we dont need to return anything in JSX
export default async function NewUser() {
  // brand new user gets redirected here
  // 1. We check in the DB to see if there is not a user with  this Clerk User ID
  //   => if there isn't, we create a new user with this Clerk User ID + do any initialisation work (new Stripe account, new org etc)
  // if this person  already exists, we redirects the user to his journal page
  await createNewUser()
  return <div>Loading...</div>
}

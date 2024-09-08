// We will use our DB User id for business logic, instead of using clerk id
// "Dependency Inversion" principle - loose coupling
import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'

// we use 'select' to limit the user data returned to include only 'id' column
// https://www.prisma.io/docs/orm/reference/prisma-client-reference#select
export const getUserFromClerkId = async ({ select = undefined } = {}) => {
  const { userId } = auth()
  //if we cant get an unique userId from clerkId, we are in big trouble
  // we want to get notified with error
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId!, // TS way of saying userId will not be null or undefined
    },
    select,
  })
  return user
}

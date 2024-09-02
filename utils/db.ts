import { PrismaClient } from '@prisma/client'

// to coerce a type into a new type in TS, by coerce it into an unknown
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// When we make a new instance of the client, new PrismaClient
// we are making a new connection to the DB
// So we want to check whether we have already established a connection to Prisma
// The way to check that, is by assigning it to global, globalThis. So
// 1. We add a .prisma property to the globalThis (nodejs global), to keep a record of the client instance
// 2. in const prisma, we check if it is present, if it is not, we will

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] })

// we only assign prismia to globalPrisma in the development mode
// because of how NextJS does reloading etc.
// Everytime you save a file in NextJS, it does a hot refresh, hot reload,(creating new connections)
// and it will just mess up with the db connections and break eventually
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

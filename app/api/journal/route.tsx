// enable CRUD API like /api/journal POST

import { getUserFromClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

// examine the Journal schema, we need id and user.id for creating a new Journal
export const POST = async () => {
  const user = await getUserFromClerkId()
  const journalEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Please write about your day!',
    },
  })
  return NextResponse.json({ data: journalEntry })
}

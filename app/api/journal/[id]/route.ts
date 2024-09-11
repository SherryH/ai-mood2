// PUT vs PATCH
// PUT replaces the whole thing in the DB
// PATCH updates the differences

import { getUserFromClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

type ParamType = {
  params: {
    id: string
  }
}

export const PATCH = async (request: Request, { params }: ParamType) => {
  const user = await getUserFromClerkId()
  const { content } = await request.json()
  const updatedJournalEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })
  return NextResponse.json({ data: updatedJournalEntry })
}

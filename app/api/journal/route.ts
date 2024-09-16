// enable CRUD API like /api/journal POST

import { analyse } from '@/utils/ai'
import { getUserFromClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
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

  const analysisResult = await analyse(journalEntry.content)
  if (!analysisResult) return
  await prisma.analysis.create({
    data: {
      entryId: journalEntry.id,
      ...analysisResult,
    },
  })
  revalidatePath('/journal')
  return NextResponse.json({ data: journalEntry })
}

// PUT vs PATCH
// PUT replaces the whole thing in the DB
// PATCH updates the differences

import { analyse } from '@/utils/ai'
import { getUserFromClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
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
  const analysis = await analyse(content)
  // Update just updates existing entry's analysis. If an entry doesn't have analysis, it may fail
  // upset = update + insert. It updates an existing analysis. if an entry doesn't have an analysis, it will insert one
  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedJournalEntry.id,
    },
    create: {
      ...analysis!,
      entryId: updatedJournalEntry.id,
      userId: user.id,
    },
    update: {
      ...analysis,
    },
  })

  revalidatePath(`/journal/${updatedJournalEntry.id}`)

  return NextResponse.json({
    data: { ...updatedJournalEntry, analysis: savedAnalysis },
  })
}

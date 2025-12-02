'use server'
import {eq, asc} from 'drizzle-orm'
import {auth} from '@clerk/nextjs/server'
import {db} from '@/db'
import {xactions} from '@/db/schema'

export const getTransactionYearsRange = async () => {
  const {userId} = await auth()

  if (!userId) {
    return []
  }

  const [earliest] = await db
    .select()
    .from(xactions)
    .where(eq(xactions.userId, userId))
    .orderBy(asc(xactions.transactionDate))
    .limit(1)

  const today = new Date()
  const currentYear = today.getFullYear()
  const earliestYear = earliest ? new Date(earliest.transactionDate).getFullYear() : currentYear

  const years = Array.from({length: currentYear - earliestYear + 1})
    .map((_, i) => currentYear - i)
  
  return years
}

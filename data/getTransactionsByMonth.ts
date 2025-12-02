import 'server-only'
import {auth} from '@clerk/nextjs/server'
import {db} from '@/db'
import {cats, xactions} from '@/db/schema'
import {and, eq, gte, lte, desc} from 'drizzle-orm'

export const getTransactionsByMonth = async ({month, year}: {month: number, year: number}) => {
  const {userId} = await auth()

  if (!userId) {
    return null
  }

  const firstDate = new Date(year, month - 1, 1)  // Month is 0-indexed, so we subtract 1
  const lastDate = new Date(year, month, 0)  // '0' means last day of previous month

  const transactions = await db.select({
    id: xactions.id,
    description: xactions.description,
    amount: xactions.amount,
    transactionDate: xactions.transactionDate,
    categoryName: cats.name,
    categoryType: cats.type
  })
    .from(xactions)
    .where(and(eq(xactions.userId, userId),
               gte(xactions.transactionDate, firstDate),
               lte(xactions.transactionDate, lastDate)))
    .orderBy(desc(xactions.transactionDate))
    .leftJoin(cats, eq(xactions.categoryId, cats.id))

  return transactions
}

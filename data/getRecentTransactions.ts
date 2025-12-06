import 'server-only'

import {desc, eq} from 'drizzle-orm'
import {auth} from '@clerk/nextjs/server'
import {db} from '@/db'
import {cats, xactions} from '@/db/schema'

export const getRecentTransactions = async () => {
  const {userId} = await auth()

  if (!userId) {
    return []
  }

  const transactions = await db
    .select({
      id: xactions.id,
      description: xactions.description,
      amount: xactions.amount,
      transactionDate: xactions.transactionDate,
      categoryName: cats.name,
      categoryType: cats.type
    })
    .from(xactions)
    .where(eq(xactions.userId, userId))
    .orderBy(desc(xactions.transactionDate))
    .limit(5)
    .leftJoin(cats, eq(xactions.categoryId, cats.id))

  return transactions
}

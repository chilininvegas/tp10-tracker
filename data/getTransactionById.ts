import 'server-only'

import {auth} from '@clerk/nextjs/server'
import {and, eq} from 'drizzle-orm'
import {db} from '@/db'
import {xactions, cats} from '@/db/schema'
import {type Transaction} from '@/types/Transaction'

const getTransactionById = async (id: number): Promise<Transaction | null> => {
  const {userId} = await auth()

  if (!userId) {
    return null
  }

  const [result] = await db
    .select({
      id: xactions.id,
      description: xactions.description,
      amount: xactions.amount,
      transactionDate: xactions.transactionDate,
      categoryId: xactions.categoryId,
      transactionType: cats.type
    })
    .from(xactions)
    .innerJoin(cats, eq(xactions.categoryId, cats.id))
    .where(and(eq(xactions.id, id), eq(xactions.userId, userId)))

  if (!result) {
    return null
  }

  return {
    ...result,
    amount: Number(result.amount),
    transactionType: result.transactionType as 'Income' | 'Expense'
  }
}

export {getTransactionById}

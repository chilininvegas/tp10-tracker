'use server'

import { auth } from '@clerk/nextjs/server'
import { transactionSchema } from '@/validation/TransactionSchema'
import { z } from 'zod'
import { db } from '@/db'
import { eq, and } from 'drizzle-orm'
import { xactions } from '@/db/schema'

const updateTransactionSchema = transactionSchema.and(
  z.object({
    id: z.number().positive('ID is invalid')
  })
)

export const updateTransaction = async (
  data: z.infer<typeof updateTransactionSchema>
) => {
  const { userId } = await auth()

  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized'
    }
  }

  const validation = updateTransactionSchema.safeParse(data)

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message
    }
  }

  const { id, ...updateData } = validation.data

  await db
    .update(xactions)
    .set({
      amount: updateData.amount.toString(),
      description: updateData.description,
      categoryId: updateData.categoryId,
      transactionDate: updateData.transactionDate
    })
    .where(and(eq(xactions.id, id), eq(xactions.userId, userId)))

  return {
    success: true
  }
}

export const deleteTransaction = async (xactionId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized'
    }
  }

  await db
    .delete(xactions)
    .where(and(eq(xactions.id, xactionId), eq(xactions.userId, userId)))

  return {
    success: true
  }
}

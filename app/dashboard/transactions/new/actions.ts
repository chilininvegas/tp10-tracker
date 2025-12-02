// File contains one or more server actions
'use server'

import {z} from 'zod'
import {db} from '@/db'
import {xactions} from '@/db/schema'
import {auth} from '@clerk/nextjs/server'
import {addDays, subYears} from 'date-fns'

const transactionSchema = z.object({
  transactionType: z.enum(['Income', 'Expense']),
  categoryId: z.number().positive('Please select a category'),
  transactionDate: z.date()
    .min(subYears(new Date(), 20), 'Transaction date cannot be more than 20 years in the past')
    .max(addDays(new Date(), 1), 'Transaction date cannot be in the future'),
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters')
})

export const createTransaction = async (data: {
  transactionType: 'Income' | 'Expense'
  amount: number
  transactionDate: Date
  description: string
  categoryId: number
}) => {

  // Only authenticated users can create a transaction
  const {userId} = await auth()

  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized'
    }
  }

  const validation = transactionSchema.safeParse(data)

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message  // First error message
    }
  }

  // An array is returned from the database, so we need to destructure
  const [transaction] = await db
    .insert(xactions)
    .values({
      userId,
      amount: data.amount.toString(),
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: data.transactionDate
    })
    .returning()  // Returns the new transaction

  return {
    id: transaction.id
  }
}

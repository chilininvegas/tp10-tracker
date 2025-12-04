import 'server-only'

import { and, eq, sql } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { cats, xactions } from '@/db/schema'

export const getAnnualCashflow = async (year: number) => {
  const { userId } = await auth()

  if (!userId) {
    return []
  }

  const month = sql<number>`EXTRACT(MONTH FROM ${xactions.transactionDate})`

  const cashflow = await db
    .select({
      month,
      totalIncome: sql<number>`SUM(CASE WHEN ${cats.type} = 'Income' THEN ${xactions.amount} ELSE 0 END)`,
      totalExpense: sql<number>`SUM(CASE WHEN ${cats.type} = 'Expense' THEN ${xactions.amount} ELSE 0 END)`
    })
    .from(xactions)
    .leftJoin(cats, eq(xactions.categoryId, cats.id))
    .where(
      and(
        eq(xactions.userId, userId),
        sql<number>`EXTRACT(YEAR FROM ${xactions.transactionDate}) = ${year}`
      )
    )
    .groupBy(month)

  const annualCashflow: {
    month: number
    totalIncome: number
    totalExpense: number
  }[] = []

  for (let i = 1; i <= 12; i++) {
    const monthData = cashflow.find((x) => Number(x.month) === i)
    annualCashflow.push({
      month: i,
      totalIncome: monthData?.totalIncome ?? 0,
      totalExpense: monthData?.totalExpense ?? 0
    })
  }

  return annualCashflow
}

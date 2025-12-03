export type Transaction = {
  id: number
  description: string
  amount: number
  transactionDate: Date
  categoryId: number
  transactionType: 'Income' | 'Expense'
}

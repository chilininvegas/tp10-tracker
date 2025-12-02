'use client'

import {useRouter} from 'next/navigation'
import {z} from 'zod'
import {showToast} from '@/lib/toast-utils'
import TransactionForm, {transactionFormSchema} from '@/components/TransactionForm'
import {type Category} from '@/types/Category'
import {createTransaction} from '@/app/dashboard/transactions/new/actions'

const NewTransactionForm = ({categories}: {categories: Category[]}) => {
  const router = useRouter()

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      transactionType: data.transactionType,
      amount: data.amount,
      transactionDate: data.transactionDate,
      categoryId: data.categoryId,
      description: data.description
    })

    if (result.error) {
      showToast(result.message, 'error')
      return
    }
    
    showToast('Transaction created successfully', 'success')

    router.push(
      `/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`
    )
  }

  return <TransactionForm onSubmit={handleSubmit} categories={categories} />
}

export default NewTransactionForm

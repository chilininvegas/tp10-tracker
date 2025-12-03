'use client'

import {useRouter} from 'next/navigation'
import {z} from 'zod'
import {showToast} from '@/lib/toast-utils'
import TransactionForm, {transactionFormSchema} from '@/components/TransactionForm'
import {type Category} from '@/types/Category'
import {type Transaction} from '@/types/Transaction'
import {updateTransaction} from './actions'

const EditTransactionForm = (
  {categories, transaction}: {categories: Category[], transaction: Transaction}) => {
  const router = useRouter()

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      ...data
    })

    if (result?.error) {
      showToast(result.message, 'error')
      return
    }
    
    showToast('Transaction updated successfully', 'success')

    router.push(
      `/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`
    )
  }

  return <TransactionForm
    onSubmit={handleSubmit}
    categories={categories}
    defaultValues={transaction}
  />
}

export default EditTransactionForm

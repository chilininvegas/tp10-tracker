import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getCategories } from '@/data/getCategories'
import EditTransactionForm from '@/app/dashboard/transactions/[id]/EditTransactionForm'
import { getTransactionById } from '@/data/getTransactionById'
import DeleteTransactionDialog from './DeleteTransactionDialog'

const EditTrasactionPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const xactionId = Number(id)
  if (isNaN(xactionId)) {
    return notFound()
  }

  const categories = await getCategories()
  const transaction = await getTransactionById(xactionId)

  if (!transaction) {
    return notFound()
  }

  return (
    <Card className='mt-4 max-w-3xl'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <span>Edit Transaction</span>
          <DeleteTransactionDialog
            xactionId={xactionId}
            xactionDate={transaction.transactionDate}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditTransactionForm
          categories={categories}
          transaction={transaction}
        />
      </CardContent>
    </Card>
  )
}

export default EditTrasactionPage

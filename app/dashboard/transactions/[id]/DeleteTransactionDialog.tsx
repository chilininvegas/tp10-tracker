'use client'

import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Trash2Icon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteTransaction } from './actions'
import { showToast } from '@/lib/toast-utils'

const DeleteTransactionDialog = ({
  xactionId,
  xactionDate
}: {
  xactionId: number
  xactionDate: Date
}) => {
  const router = useRouter()

  const handleDelete = async () => {
    const result = await deleteTransaction(xactionId)

    if (result.error) {
      showToast(result.message, 'error')
      return
    }

    showToast('Transaction deleted successfully', 'success')

    router.push(
      `/dashboard/transactions?month=${format(xactionDate, 'MM')}&year=${format(xactionDate, 'yyyy')}`
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash2Icon className='w-4 h-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This transaction will be deleted permanently and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant='destructive' onClick={handleDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionDialog

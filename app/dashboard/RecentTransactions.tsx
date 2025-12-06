import Link from 'next/link'
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '@/components/ui/table'
import {Badge} from '@/components/ui/badge'
import {format} from 'date-fns'
import numeral from 'numeral'
import {Button} from '@/components/ui/button'
import {getRecentTransactions} from '@/data/getRecentTransactions'
import {cn} from '@/lib/utils'

const RecentTransactions = async () => {
  const transactions = await getRecentTransactions()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Recent Transactions</span>
          <div className='flex gap-2'>
            <Button asChild variant='outline'>
              <Link href='/dashboard/transactions'>View All</Link>
            </Button>
            <Button asChild>
              <Link href='/dashboard/transactions/new'>Create New</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!transactions?.length && (
          <p className='text-center py-10 text-lg text-muted-foreground'>
            You have no transactions yet. Click on &quot;Create New&quot; to add
            your first transaction!
          </p>
        )}
        {!!transactions?.length && (
          <Table className='mt-4'>
            <TableHeader>
              <TableRow>
                <TableHead className='text-center'>Date</TableHead>
                <TableHead className='text-center'>Description</TableHead>
                <TableHead className='text-center'>Type</TableHead>
                <TableHead className='text-center'>Category</TableHead>
                <TableHead className='text-center'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((x) => (
                <TableRow key={x.id} className='text-center'>
                  <TableCell>
                    {format(x.transactionDate, 'MMM do, yyyy')}
                  </TableCell>
                  <TableCell className='capitalize'>{x.description}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        x.categoryType === 'Income'
                          ? 'bg-green-400 p-2'
                          : 'bg-red-400 p-2',
                        'text-[14px] px-2 py-1'
                      )}
                    >
                      {x.categoryType}
                    </Badge>
                  </TableCell>
                  <TableCell>{x.categoryName}</TableCell>
                  <TableCell>
                    <div className='w-1/2 mx-auto text-right'>
                      ${numeral(x.amount).format('0,0.00')}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentTransactions

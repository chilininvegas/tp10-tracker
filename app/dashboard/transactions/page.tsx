import Link from 'next/link'
import {z} from 'zod'
import {Badge} from '@/components/ui/badge'
import {format} from 'date-fns'
import numeral from 'numeral'
import {PencilIcon} from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {getTransactionsByMonth} from '@/data/getTransactionsByMonth'
import {cn} from '@/lib/utils'
import Filters from '@/app/dashboard/transactions/filters'
import {getTransactionYearsRange} from '@/data/getTransactionYearsRange'

const today = new Date()
const minYear = today.getFullYear() - 20
const maxYear = today.getFullYear() + 1

const searchParamsSchema = z.object({
  month: z.coerce
    .number()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1),
  year: z.coerce.number().optional()
})

const TransactionsPage = async ({
  searchParams
}: {
  searchParams: Promise<{month?: string; year?: string}>
}) => {
  const searchParamsData = await searchParams

  const {month, year: rawYear} = searchParamsSchema.parse(searchParamsData)

  // Validate year range separately to provide error message
  const yearOutOfRange =
    rawYear !== undefined && (rawYear < minYear || rawYear > maxYear)
  const year =
    yearOutOfRange || rawYear === undefined ? today.getFullYear() : rawYear
  const selectedDate = new Date(year, month - 1, 1)

  const transactions = await getTransactionsByMonth({month, year})

  const yearsRange = await getTransactionYearsRange()

  return (
    <div className='max-w-7xl mx-auto py-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Transaction</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {yearOutOfRange && (
        <div className='w-[60%] mt-4 p-4 bg-destructive/15 border border-destructive/50 rounded-lg text-destructive'>
          <p className='font-medium'>Year out of range</p>
          <p className='text-sm'>
            The requested year ({rawYear}) is outside the allowed range. Showing
            transactions for {format(selectedDate, 'MMM yyyy')} instead.
          </p>
        </div>
      )}

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <span>{format(selectedDate, 'MMMM yyyy')}&nbsp;Transactions</span>
            <div>
              <Filters month={month} year={year} yearsRange={yearsRange} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href='/dashboard/transactions/new'>New Transaction</Link>
          </Button>
          {!transactions?.length && (
            <p className='text-center py-10 text-lg text-muted-foreground'>
              No transactions found for this month
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
                  <TableHead className='text-center'>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((x) => (
                  <TableRow key={x.id} className='text-center'>
                    <TableCell>
                      {format(x.transactionDate, 'MMM do, yyyy')}
                    </TableCell>
                    <TableCell className='capitalize'>
                      {x.description}
                    </TableCell>
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
                    <TableCell className='text-center'>
                      <Button
                        asChild
                        variant='outline'
                        size='icon'
                        aria-label='Edit transaction'
                      >
                        <Link href={`/dashboard/transactions/${x.id}`}>
                          <PencilIcon className='w-4 h-4' />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage

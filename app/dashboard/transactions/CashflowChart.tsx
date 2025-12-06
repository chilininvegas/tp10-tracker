// Rechart runs in the browser; used in Cashflow.tsx component
'use client'

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import {ChartContainer} from '@/components/ui/chart'
import numeral from 'numeral'
import {format} from 'date-fns'
import {cn} from '@/lib/utils'

// Tooltips created by Sonneet 4.5 Thinking
interface TooltipPayload {
  dataKey: string
  value: number
  payload: {
    month: number
    totalIncome: number
    totalExpense: number
  }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

const CustomTooltip = ({active, payload}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null

  const monthName = format(
    new Date(2025, payload[0].payload.month - 1, 1),
    'MMM'
  )
  const income = payload.find((p) => p.dataKey === 'totalIncome')?.value || 0
  const expense = payload.find((p) => p.dataKey === 'totalExpense')?.value || 0

  return (
    <div className='bg-yellow-100 p-3 border border-gray-400 rounded-lg shadow-lg'>
      <p className='font-semibold mb-2'>{monthName}</p>
      <div className='space-y-1'>
        <p className='text-sm'>
          <span className='text-lime-500 font-medium'>Income: </span>
          <span className='font-semibold'>
            {numeral(income).format('$0,0.00')}
          </span>
        </p>
        <p className='text-sm'>
          <span className='text-orange-500 font-medium'>Expense: </span>
          <span className='font-semibold'>
            {numeral(expense).format('$0,0.00')}
          </span>
        </p>
      </div>
    </div>
  )
}

const CashflowChart = ({
  annualCashflow
}: {
  annualCashflow: {month: number; totalIncome: number; totalExpense: number}[]
}) => {
  // Calculate total income and expense
  const totalIncome = annualCashflow.reduce(
    (acc, curr) => acc + Number(curr.totalIncome),
    0
  )
  const totalExpense = annualCashflow.reduce(
    (acc, curr) => acc + Number(curr.totalExpense),
    0
  )
  // Calculate balance
  const balance = totalIncome - totalExpense

  return (
    <>
      <ChartContainer
        config={{
          income: {
            color: '#84cc16',
            label: 'Income'
          },
          expense: {
            color: '#f97316',
            label: 'Expenses'
          }
        }}
        className='w-full h-[300px]'
      >
        <BarChart data={annualCashflow}>
          <CartesianGrid vertical={false} stroke='#cbd5e1' />
          {/* Year 2025 passed to Date() is not important; only the month is used */}
          <XAxis
            dataKey='month'
            tickFormatter={(value: number) =>
              format(new Date(2025, value - 1, 1), 'MMM')
            }
          />
          <YAxis
            dataKey='totalIncome'
            tickFormatter={(value) => numeral(value).format('0,0')}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{fill: 'rgba(0, 0, 0, 0.05)'}}
          />
          <Legend
            verticalAlign='top'
            align='right'
            wrapperStyle={{paddingBottom: '20px'}}
            iconType='circle'
            formatter={(value) => <span className='text-primary'>{value}</span>}
          />
          <Bar
            dataKey='totalIncome'
            name='Income'
            radius={4}
            fill='var(--color-income)'
          />
          <Bar
            dataKey='totalExpense'
            name='Expense'
            radius={4}
            fill='var(--color-expense)'
          />
        </BarChart>
      </ChartContainer>
      <div className='border-l pl-10 flex flex-col gap-4 justify-center'>
        <div>
          <span className='text-muted-foreground font-bold text-sm'>
            Income
          </span>
          <h2 className='text-3xl'>${numeral(totalIncome).format('0,0.00')}</h2>
        </div>
        <hr />
        <div>
          <span className='text-muted-foreground font-bold text-sm'>
            Expense
          </span>
          <h2 className='text-3xl'>
            ${numeral(totalExpense).format('0,0.00')}
          </h2>
        </div>
        <hr />
        <div>
          <span className='text-muted-foreground font-bold text-sm'>
            Balance
          </span>
          <h2
            className={cn(
              'text-3xl font-bold',
              balance > 0 ? 'text-lime-600' : 'text-red-600'
            )}
          >
            ${numeral(balance).format('0,0.00')}
          </h2>
        </div>
      </div>
    </>
  )
}

export default CashflowChart

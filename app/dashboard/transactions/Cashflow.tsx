// Upper section of Dashboard.tsx showing cashflow for the selected year
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getAnnualCashflow } from '@/data/getAnnualCashflow'
import CashflowFilter from './CashflowFilter'
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange'
import CashflowChart from './CashflowChart'

const Cashflow = async ({ year }: { year: number }) => {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearsRange()
  ])

  return (
    <Card className='mb-5'>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Cashflow</span>
          <CashflowFilter year={year} yearsRange={yearsRange} />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-[1fr_25%]'>
        <CashflowChart annualCashflow={cashflow} />
      </CardContent>
    </Card>
  )
}

export default Cashflow

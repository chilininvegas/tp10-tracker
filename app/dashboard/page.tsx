// Dashboard page; shows cashflow for the selected year
import RecentTransactions from './RecentTransactions'
import Cashflow from './transactions/Cashflow'

const DashboardPage = async ({
  searchParams
}: {
  searchParams: Promise<{cfyear?: string}>
}) => {
  const searchParamsData = await searchParams
  const today = new Date() // Default year is current year
  // If cfyear is not provided, use current year
  const cfyear = parseInt(
    searchParamsData.cfyear ?? today.getFullYear().toString()
  )
  // If cfyear is not a valid number, use current year
  const year = isNaN(cfyear) ? today.getFullYear() : cfyear

  return (
    <div className='max-w-7xl mx-auto py-5'>
      <h1 className='text-4xl font-semibold pb-5'>Dashboard</h1>
      <Cashflow year={year} />
      <RecentTransactions />
    </div>
  )
}

export default DashboardPage

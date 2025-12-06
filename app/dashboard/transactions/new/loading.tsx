import {Skeleton} from '@/components/ui/skeleton'

const loading = () => {
  return (
    <div className='max-w-7xl mx-auto py-10'>
      <Skeleton className='mt-8 max-w-3xl h-[200px] rounded-xl bg-gray-200' />
    </div>
  )
}

export default loading

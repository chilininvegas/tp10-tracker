import {Skeleton} from '@/components/ui/skeleton'

const loading = () => {
  return (
    <div className='max-w-7xl mx-auto py-5'>
      <Skeleton className='mt-20 mx-auto max-w-5xl h-[300px] rounded-xl bg-gray-200' />
    </div>
  )
}

export default loading

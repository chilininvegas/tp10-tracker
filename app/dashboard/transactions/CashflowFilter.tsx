// Dropdown filter for cashflow year; used in Cashflow.tsx component
'use client'

import {useRouter} from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Props = {
  year: number
  yearsRange: number[]
}

const CashflowFilter = ({year, yearsRange}: Props) => {
  const router = useRouter()

  return (
    <Select
      defaultValue={year.toString()}
      onValueChange={(value) => {
        router.push(`/dashboard?cfyear=${value}`)
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {yearsRange.map((yr) => (
          <SelectItem key={yr} value={yr.toString()}>
            {yr}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CashflowFilter

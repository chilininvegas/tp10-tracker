'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const Filters = ({
  month,
  year,
  yearsRange
}: {
  month: number
  year: number
  yearsRange: number[]
}) => {
  const [selectedMoYr, setSelectedMoYr] = useState<{ mo: number; yr: number }>({
    mo: month,
    yr: year
  })

  const monthChanged = selectedMoYr.mo !== month
  const yearChanged = selectedMoYr.yr !== year

  return (
    <div className="flex gap-1">
      <Select
        onValueChange={(value) =>
          setSelectedMoYr({ mo: parseInt(value), yr: selectedMoYr.yr })
        }
        value={selectedMoYr.mo.toString()}
      >
        <SelectTrigger
          className={monthChanged ? 'bg-pink-300 dark:bg-pink-700' : ''}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i} value={`${i + 1}`}>
              {format(new Date(selectedMoYr.yr, i, 1), 'MMM')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          setSelectedMoYr({ mo: selectedMoYr.mo, yr: parseInt(value) })
        }
        value={selectedMoYr.yr.toString()}
      >
        <SelectTrigger
          className={yearChanged ? 'bg-pink-300 dark:bg-pink-700' : ''}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearsRange.map((yr) => (
            <SelectItem key={yr} value={yr.toString()}>
              {yr.toString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button asChild>
        <Link
          href={`/dashboard/transactions?month=${selectedMoYr.mo}&year=${selectedMoYr.yr}`}
        >
          Go
        </Link>
      </Button>
    </div>
  )
}

export default Filters

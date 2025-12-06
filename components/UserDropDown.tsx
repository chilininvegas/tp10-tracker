'use client'

import {useRouter} from 'next/navigation'
import {UserButton} from '@clerk/nextjs'
import {ChartColumnBig} from 'lucide-react'

const UserDropDown = () => {
  const router = useRouter()

  return (
    <UserButton
      showName={true}
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: 'white'
          }
        }
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label='Dashboard'
          labelIcon={<ChartColumnBig size={16} />}
          onClick={() => router.push('/dashboard')}
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserDropDown

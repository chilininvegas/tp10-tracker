// From Cursor (model: Claude Sonnet 4.5 "thinking")
import { toast } from 'sonner'
import { CircleCheckIcon, OctagonXIcon, InfoIcon } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

export const showToast = (message: string, type: ToastType = 'info') => {
  const config = {
    success: {
      backgroundColor: 'var(--success)',
      icon: <CircleCheckIcon className='size-5 text-white' />
    },
    error: {
      backgroundColor: 'var(--destructive)',
      icon: <OctagonXIcon className='size-5 text-white' />
    },
    info: {
      backgroundColor: 'var(--primary)',
      icon: <InfoIcon className='size-5 text-white' />
    }
  }

  const { backgroundColor, icon } = config[type]

  toast(message, {
    style: {
      backgroundColor,
      color: 'white'
    },
    icon
  })
}

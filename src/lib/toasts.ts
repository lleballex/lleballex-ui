import { ToastsContext } from '@/components/layout/Toasts'
import { useContext } from 'react'

export const useToasts = () => {
  return useContext(ToastsContext)
}

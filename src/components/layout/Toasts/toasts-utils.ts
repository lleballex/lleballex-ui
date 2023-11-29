import { ReactNode, createContext } from 'react'

export interface ToastInput {
  title?: ReactNode
  content: ReactNode
}

export interface Toast extends ToastInput {
  id: string
  status: 'enter' | 'active' | 'leave'
}

export const ToastsContext = createContext<{
  items: Toast[]
  add: (data: ToastInput) => void
  remove: (id: string) => void
}>({
  items: [],
  add: () => {},
  remove: () => {},
})

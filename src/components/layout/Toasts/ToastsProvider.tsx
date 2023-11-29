import { PropsWithChildren, useState } from 'react'
import { Toast, ToastInput } from './toasts-utils'
import { Site } from '@/config/site'
import { ToastsContext } from './toasts-utils'

export default function ToastsProvider({ children }: PropsWithChildren) {
  // TODO: auto remove

  const [toasts, setToasts] = useState<Toast[]>([])

  const add = (data: ToastInput) => {
    const id = new Date().toISOString()

    setToasts([
      ...toasts,
      {
        ...data,
        status: 'enter',
        id,
      },
    ])

    setTimeout(() => {
      setToasts((prev) => {
        const idx = prev.findIndex((i) => i.id === id)
        if (idx !== -1) {
          const newVal = [...prev]
          newVal[idx].status = 'active'
          return newVal
        } else {
          return prev
        }
      })
    }, Site.transition.duration)
  }

  const remove = (id: string) => {
    const idx = toasts.findIndex((i) => i.id === id)

    if (idx !== -1) {
      setToasts((prev) => {
        const newVal = [...prev]
        newVal[idx].status = 'leave'
        return newVal
      })

      setTimeout(() => {
        setToasts((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)])
      }, Site.transition.duration)
    }
  }

  return (
    <ToastsContext.Provider value={{ add, remove, items: toasts }}>
      {children}
    </ToastsContext.Provider>
  )
}

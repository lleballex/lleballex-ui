import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'
import { Site } from '@/config/site'
import Icon from '@/components/ui/Icon'
import styles from './Toasts.module.scss'

interface Toast {
  title?: ReactNode
  content: ReactNode
}

interface ToastFull extends Toast {
  id: string
  status: 'enter' | 'active' | 'leave'
}

export const ToastsContext = createContext<{
  items: ToastFull[]
  add: (data: Toast) => void
  remove: (id: string) => void
}>({
  items: [],
  add: () => {},
  remove: () => {},
})

export const ToastsProvider = ({ children }: PropsWithChildren) => {
  // TODO: auto remove

  const [toasts, setToasts] = useState<ToastFull[]>([])

  const add = (data: Toast) => {
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

export default function Toasts() {
  const { items, remove } = useContext(ToastsContext)

  if (!items.length) return null

  return (
    <div className={styles.container}>
      {items.map((toast) => (
        <div className={styles.toast} data-status={toast.status} key={toast.id}>
          <div className={styles.toastMain}>
            {toast.title && (
              <div className={styles.toastTitle}>{toast.title}</div>
            )}
            <div className={styles.toastContent}>{toast.content}</div>
          </div>
          <Icon icon="times" onClick={() => remove(toast.id)} hoverable />
        </div>
      ))}
    </div>
  )
}

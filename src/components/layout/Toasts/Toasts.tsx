import { useToasts } from '@/lib/toasts'
import Icon from '@/components/ui/Icon'
import styles from './Toasts.module.scss'

export default function Toasts() {
  const { items, remove } = useToasts()

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

import { useState } from 'react'
import { useToasts } from '@/lib/toasts'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import styles from './HomeToast.module.scss'

export default function HomeToast() {
  const toasts = useToasts()

  const [title, setTitle] = useState<null | string>(null)
  const [content, setContent] = useState<null | string>(null)

  const addToast = () => {
    toasts.add({ title, content })
    setTitle(null)
    setContent(null)
  }

  return (
    <div className={styles.container}>
      <h2>Toasts</h2>
      <Input value={title} onChange={setTitle} placeholder="Title" />
      <Input value={content} onChange={setContent} placeholder="Content*" />
      <Button type="primary" onClick={addToast} disabled={!content}>
        Add toast
      </Button>
    </div>
  )
}

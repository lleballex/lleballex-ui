import { useState } from 'react'
import { useContext } from 'react'
import { ToastsContext } from '@/components/layout/Toasts'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function HomeToast() {
  const toasts = useContext(ToastsContext)

  const [title, setTitle] = useState<null | string>(null)
  const [content, setContent] = useState<null | string>(null)

  return (
    <div>
      <Input value={title} onChange={setTitle} placeholder="TItle" />
      <Input value={content} onChange={setContent} placeholder="Content" />
      <Button
        type="primary"
        onClick={() => content && toasts.add({ title, content })}
      >
        Add toast
      </Button>
    </div>
  )
}

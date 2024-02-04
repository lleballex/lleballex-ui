import { useForm, Controller } from 'react-hook-form'
import { useToasts } from '@/lib/toasts'
import { ToastType } from '@/lib/toasts'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import styles from './HomeToast.module.scss'

export default function HomeToast() {
  const toasts = useToasts()

  const { control, handleSubmit, reset } = useForm<{
    title: string
    content: string
    type: ToastType
  }>({
    defaultValues: {
      type: 'info',
    },
  })

  const onSubmit = handleSubmit((data) => {
    switch (data.type) {
      case 'info':
        toasts.info(data)
        break
      case 'success':
        toasts.success(data)
        break
      case 'error':
        toasts.error(data)
        break
    }
    reset()
  })

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2>Toasts</h2>
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Input {...field} error={fieldState.error} label="Title" />
        )}
      />
      <Controller
        control={control}
        name="content"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Input {...field} error={fieldState.error} label="Content*" />
        )}
      />
      <Controller
        control={control}
        name="type"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            error={fieldState.error}
            label="Type*"
            items={[
              { key: 'info', value: 'Info' },
              { key: 'success', value: 'Success' },
              { key: 'error', value: 'Error' },
            ]}
          />
        )}
      />
      <div className={styles.controls}>
        <Button type="primary" htmlType="submit">
          Add toast
        </Button>
      </div>
    </form>
  )
}

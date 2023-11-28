import { useState, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useToasts } from '@/lib/toasts'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Checkbox from '@/components/ui/Checkbox'
import styles from './HomeForm.module.scss'

interface Form {
  name: string
  age: number
  hasChildren: boolean
  policyAccepted: boolean
}

export default function HomeForm() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<Form>({
    defaultValues: {
      name: '',
      age: NaN,
      hasChildren: false,
      policyAccepted: false,
    },
  })

  const toasts = useToasts()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: Form) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      reset()
      toasts.add({ content: 'Форма успешно отработала' })
    }, 2000)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2>Form</h2>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Input {...field} error={fieldState.error?.type} label="Name" />
        )}
      />
      <Controller
        control={control}
        name="age"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="number"
            error={fieldState.error?.type}
            label="Age"
          />
        )}
      />
      <Controller
        control={control}
        name="hasChildren"
        render={({ field }) => <Switch {...field}>With children</Switch>}
      />
      <Controller
        control={control}
        name="policyAccepted"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Checkbox {...field} error={fieldState.error?.type}>
            I agree with the policy
          </Checkbox>
        )}
      />
      <Button disabled={!isValid} htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}

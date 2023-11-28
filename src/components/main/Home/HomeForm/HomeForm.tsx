import { useState, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useToasts } from '@/lib/toasts'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Checkbox from '@/components/ui/Checkbox'
import RadioGroup from '@/components/ui/RadioGroup'
import styles from './HomeForm.module.scss'

interface Form {
  name: string
  age: number
  hasChildren: boolean
  numberOfHands: number
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
      numberOfHands: 0,
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
        name="numberOfHands"
        rules={{ required: true }}
        render={({ field }) => (
          <RadioGroup
            {...field}
            items={[
              { key: 0, value: 'No hands' },
              { key: 1, value: 'One hand' },
              { key: 2, value: 'Two hands' },
            ]}
          />
        )}
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

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useToasts } from '@/lib/toasts'
// import { Moment } from 'moment'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Checkbox from '@/components/ui/Checkbox'
import RadioGroup from '@/components/ui/RadioGroup'
import Select from '@/components/ui/Select'
// import TimePicker from '@/components/ui/TimePicker'
import styles from './HomeForm.module.scss'

interface Form {
  name: string
  age: number
  // birthTime: Moment
  colors: string[]
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
  } = useForm<Form>()

  const toasts = useToasts()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: Form) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      reset()
      toasts.info({ content: 'Success! Everything works correctly' })
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
          <Input {...field} error={fieldState.error} label="Name" />
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
            error={fieldState.error}
            label="Age"
          />
        )}
      />
      <Controller
        control={control}
        name="colors"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            error={fieldState.error}
            label="Favourite colors"
            items={[
              { key: 'red', value: 'Red' },
              { key: 'blue', value: 'Blue' },
              { key: 'gray', value: 'Gray' },
            ]}
            multiple
          />
        )}
      />
      {/*<Controller
        control={control}
        name="birthTime"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <TimePicker
            {...field}
            error={fieldState.error?.message}
            label="Birth time"
          />
        )}
      />
 */}
      <Controller
        control={control}
        name="hasChildren"
        render={({ field, fieldState }) => (
          <Switch {...field} error={fieldState.error}>
            With children
          </Switch>
        )}
      />
      <Controller
        control={control}
        name="numberOfHands"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <RadioGroup
            {...field}
            error={fieldState.error}
            label="Number of hands"
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
          <Checkbox {...field} error={fieldState.error}>
            I agree with the policy
          </Checkbox>
        )}
      />
      <Button htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}

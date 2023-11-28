import { useForm, Controller } from 'react-hook-form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import styles from './HomeForm.module.scss'

interface Form {
  name: string
  age: number
}

export default function HomeForm() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Form>()

  const onSubmit = (data: Form) => {
    console.log(data)
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
      <Button disabled={!isValid} htmlType="submit">
        Submit
      </Button>
    </form>
  )
}
import { useMemo } from 'react'

export type FormError =
  | string
  | {
      message?: string
      type: string
    }

export const useFormError = (error?: FormError) => {
  const message = useMemo(() => {
    if (!error) {
      return null
    } else if (typeof error === 'string') {
      return error
    }

    switch (true) {
      case error.type === 'required':
        return 'Заполни это поле'
      case !!error.message:
        return error.message
      case !!error.type:
        return error.type
      default:
        return 'Ошибка'
    }
  }, [error])

  return message
}

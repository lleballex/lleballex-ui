import { useState, useEffect } from 'react'

export const usePlainControlValue = <Value = unknown>({
  baseValue,
  baseOnChange,
  defaultValue,
}: {
  baseValue?: Value
  baseOnChange?: (val: Value) => void
  defaultValue?: Value
}) => {
  if (baseValue === undefined && defaultValue === undefined) {
    throw new Error('Either baseValue or defaultValue must be provided')
  }

  const [value, setValue] = useState<Value>(baseValue ?? defaultValue!)

  useEffect(() => {
    if (baseValue !== undefined) {
      setValue(baseValue)
    }
  }, [baseValue])

  const onChange = (val: Value) => {
    if (baseOnChange || baseValue !== undefined) {
      baseOnChange?.(val)
      if (baseValue === undefined) {
        setValue(val)
      }
    } else {
      setValue(val)
    }
  }

  return { value, setValue, onChange }
}

export const useControlValue = <Value = unknown, BaseValue = unknown>({
  baseValue,
  baseOnChange,
  transformBaseValue,
  transformValue,
}: {
  baseValue?: BaseValue
  baseOnChange?: (val: BaseValue) => void
  transformBaseValue: (val: BaseValue | undefined) => Value
  transformValue: (val: Value) => BaseValue
}) => {
  const [value, setValue] = useState<Value>(transformBaseValue(baseValue))

  useEffect(() => {
    setValue(transformBaseValue(baseValue))
  }, [baseValue])

  const onChange = (val: Value) => {
    if (baseOnChange || baseValue !== undefined) {
      baseOnChange?.(transformValue(val))
      if (baseValue === undefined) {
        setValue(val)
      }
    } else {
      setValue(val)
    }
  }

  return { value, setValue, onChange }
}

import { Key, ReactNode, useState, useEffect } from 'react'
import classNames from 'classnames'
import Radio from '@/components/ui/Radio'
import styles from './RadioGroup.module.scss'

interface Props {
  className?: string
  items?: {
    key: Key
    value: ReactNode
  }[]
  nullable?: boolean
  value?: Key | null
  onChange?: (val: Key | null) => void
}

export default function RadioGroup({
  className,
  items = [],
  nullable,
  value: baseValue,
  onChange: baseOnChange,
}: Props) {
  // TODO: ref - for react hook form
  // TODO: error
  // TODO: disabled

  const [value, setValue] = useState<Key | null>(null)

  useEffect(() => {
    if (baseValue !== undefined) {
      setValue(baseValue)
    }
  }, [baseValue])

  const onChange = (val: Key | null) => {
    if (baseValue !== undefined || baseOnChange) {
      baseOnChange?.(val)
      if (baseValue === undefined) {
        setValue(val)
      }
    } else {
      setValue(val)
    }
  }

  return (
    <div className={classNames(styles.container, className)}>
      {items.map((item) => (
        <Radio
          key={item.key}
          value={value === item.key}
          onChange={(val) => onChange(val ? item.key : null)}
          nullable={nullable}
        >
          {item.value}
        </Radio>
      ))}
    </div>
  )
}

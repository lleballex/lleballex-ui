import { Key, ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import Checkbox from '@/components/ui/Checkbox'
import styles from './CheckboxGroup.module.scss'

interface Props {
  className?: string
  items?: {
    key: Key
    value: ReactNode
  }[]
  value?: Key[]
  onChange?: (val: Key[]) => void
}

export default function CheckboxGroup({
  className,
  items = [],
  value: baseValue,
  onChange: baseOnChange,
}: Props) {
  // TODO: error
  // TODo: ref - for react hook form
  // TODO: disabled

  const [value, setValue] = useState<Key[]>(baseValue ?? [])

  useEffect(() => {
    if (baseValue) {
      setValue(baseValue)
    }
  }, [baseValue])

  const onChange = (val: Key[]) => {
    if (baseValue || baseOnChange) {
      baseOnChange?.(val)
      if (!baseValue) {
        setValue(val)
      }
    } else {
      setValue(val)
    }
  }

  const toggleItem = (key: Key) => {
    const idx = value?.indexOf(key) ?? -1
    if (idx === -1) {
      onChange([...(value ?? []), key])
    } else {
      onChange([
        ...(value?.slice(0, idx) ?? []),
        ...(value?.slice(idx + 1) ?? []),
      ])
    }
  }

  return (
    <div className={classNames(styles.container, className)}>
      {items.map((item) => (
        <Checkbox
          key={item.key}
          value={value?.includes(item.key)}
          onChange={() => toggleItem(item.key)}
        >
          {item.value}
        </Checkbox>
      ))}
    </div>
  )
}

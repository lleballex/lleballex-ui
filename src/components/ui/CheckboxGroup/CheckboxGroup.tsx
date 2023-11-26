import { Key, ReactNode } from 'react'
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
  value,
  onChange,
}: Props) {
  const toggleItem = (key: Key) => {
    const idx = value?.indexOf(key) ?? -1

    if (idx === -1) {
      onChange?.([...(value ?? []), key])
    } else {
      onChange?.([
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

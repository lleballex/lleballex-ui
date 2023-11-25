import { Key, ReactNode, useState } from 'react'
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
}

export default function RadioGroup({ className, items = [], nullable }: Props) {
  // TODO: value, onchange, react hook form

  const [value, setValue] = useState<Key | null>(null)

  return (
    <div className={classNames(styles.container, className)}>
      {items.map((item) => (
        <Radio
          key={item.key}
          value={value === item.key}
          onChange={(val) => setValue(val ? item.key : null)}
        >
          {item.value}
        </Radio>
      ))}
    </div>
  )
}

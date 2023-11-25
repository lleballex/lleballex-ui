import { Key, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './Sandwich.module.scss'

interface Props {
  items?: {
    key: Key
    value: ReactNode
  }[]
  activeKey?: Key
}

/**
 * Elements places on top of each other. One of them is active (showed), other - not active (hidden)
 */
export default function Sandwich({ items = [], activeKey }: Props) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div
          className={classNames(styles.item, {
            [styles.active]: activeKey === item.key,
          })}
          key={item.key}
        >
          {item.value}
        </div>
      ))}
    </div>
  )
}

import { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './Radio.module.scss'

interface Props {
  className?: string
  children?: ReactNode
  value?: boolean
  onChange?: (val: boolean) => void
  nullable?: boolean
}

export default function Radio({
  className,
  children,
  value,
  onChange,
  nullable,
}: Props) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(value ?? isActive)
  }, [value])

  const toggle = () => {
    if (nullable || !isActive) {
      onChange?.(!isActive) ?? setIsActive(!isActive)
    }
  }

  return (
    <div className={classNames(styles.container, className)} onClick={toggle}>
      <span
        className={classNames(styles.radio, { [styles.active]: isActive })}
      />
      {children}
    </div>
  )
}

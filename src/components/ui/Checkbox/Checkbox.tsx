import { useState, ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import Icon from '@/components/ui/Icon'
import styles from './Checkbox.module.scss'

interface Props {
  className?: string
  value?: boolean
  onChange?: (val: boolean) => void
  children?: ReactNode
}

export default function Checkbox({
  className,
  value,
  onChange,
  children,
}: Props) {
  const [isActive, setIsActive] = useState(value ?? false)

  useEffect(() => {
    setIsActive(value ?? isActive)
  }, [value])

  const toggle = () => {
    if (onChange || value !== undefined) {
      onChange?.(!isActive)
    } else {
      setIsActive(!isActive)
    }
  }

  return (
    <div className={classNames(styles.container, className)} onClick={toggle}>
      <div
        className={classNames(styles.checkbox, { [styles.active]: isActive })}
      >
        <Icon className={styles.checkboxIcon} icon="check" />
      </div>
      {children}
    </div>
  )
}

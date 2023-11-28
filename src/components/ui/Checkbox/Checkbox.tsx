import { useState, ReactNode, useEffect } from 'react'
import { getFormError } from '@/lib/get-form-error'
import classNames from 'classnames'
import Icon from '@/components/ui/Icon'
import styles from './Checkbox.module.scss'

interface Props {
  className?: string
  value?: boolean
  onChange?: (val: boolean) => void
  children?: ReactNode
  error?: string
}

export default function Checkbox({
  className,
  value,
  onChange,
  children,
  error,
}: Props) {
  // TODO: ref - for react hook form
  // TODO: disabled

  const [isActive, setIsActive] = useState(value ?? false)

  useEffect(() => {
    if (value !== undefined && value !== isActive) {
      setIsActive(value)
    }
  }, [value])

  const toggle = () => {
    if (onChange || value !== undefined) {
      onChange?.(!isActive)
      if (value === undefined) {
        setIsActive(!isActive)
      }
    } else {
      setIsActive(!isActive)
    }
  }

  return (
    <div className={classNames(styles.container, className)} onClick={toggle}>
      <div className={styles.main}>
        <div
          className={classNames(styles.checkbox, {
            [styles.active]: isActive,
            [styles.error]: !!error,
          })}
        >
          <Icon className={styles.checkboxIcon} icon="check" />
        </div>
        {children}
      </div>
      {error && <p className={styles.error}>{getFormError(error)}</p>}
    </div>
  )
}

import { ReactNode, useEffect, useState } from 'react'
import { getFormError } from '@/lib/get-form-error'
import classNames from 'classnames'
import styles from './Radio.module.scss'

interface Props {
  className?: string
  children?: ReactNode
  value?: boolean
  onChange?: (val: boolean) => void
  nullable?: boolean
  error?: string
}

export default function Radio({
  className,
  children,
  value,
  onChange,
  nullable,
  error,
}: Props) {
  // TODO: ref - for react hook form
  // TODO: disabled

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (value !== undefined && value !== isActive) {
      setIsActive(value)
    }
  }, [value])

  const toggle = () => {
    if (nullable || !isActive) {
      if (onChange || value !== undefined) {
        onChange?.(!isActive)
        if (value === undefined) {
          setIsActive(!isActive)
        }
      } else {
        setIsActive(!isActive)
      }
    }
  }

  return (
    <div className={classNames(styles.container, className)} onClick={toggle}>
      <div className={styles.main}>
        <span
          className={classNames(styles.radio, {
            [styles.active]: isActive,
            [styles.error]: !!error,
          })}
        />
        {children}
      </div>
      {error && <p className={styles.error}>{getFormError(error)}</p>}
    </div>
  )
}

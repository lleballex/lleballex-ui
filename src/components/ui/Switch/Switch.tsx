import { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './Switch.module.scss'

interface Props {
  className?: string
  value?: boolean
  onChange?: (val: boolean) => void
  children?: ReactNode
}

export default function Switch({
  className,
  value: baseValue,
  onChange: baseOnChange,
  children,
}: Props) {
  // TODO: ref - for react hook form
  // TODO: disabled

  const [value, setValue] = useState(baseValue ?? false)

  useEffect(() => {
    if (baseValue !== undefined && baseValue !== value) {
      setValue(baseValue)
    }
  }, [baseValue])

  const onChange = (val: boolean) => {
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
    <div
      className={classNames(styles.container, className)}
      onClick={() => onChange(!value)}
    >
      {children}
      <div
        className={classNames(styles.switch, {
          [styles.active]: value,
        })}
      />
    </div>
  )
}

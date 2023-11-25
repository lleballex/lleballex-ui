import { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './Switch.module.scss'

interface Props {
  className?: string
  value?: boolean
  onChange?: (val: boolean) => void
}

export default function Switch({
  className,
  value: baseValue,
  onChange,
}: Props) {
  // TODO: react hook form, disabled

  const [value, setValue] = useState(baseValue ?? false)

  useEffect(() => onChange?.(value), [value])
  useEffect(() => {
    setValue(baseValue ?? value)
  }, [baseValue])

  return (
    <div
      className={classNames(styles.switch, className, {
        [styles.active]: value,
      })}
      onClick={() => setValue(!value)}
    />
  )
}

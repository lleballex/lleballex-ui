import { MouseEventHandler, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import moment, { Moment } from 'moment'
import WithPopover from '@/components/ui/WithPopover'
import Input from '@/components/ui/Input'
import Sandwich from '@/components/ui/Sandwich'
import Icon from '@/components/ui/Icon'
import styles from './TimePicker.module.scss'

interface Props {
  value?: Moment | null
  onChange?: (val: Moment | null) => void
  className?: string
  label?: string
  placeholder?: string
  postscript?: string
  error?: string
  clearable?: boolean
}

export default function TimePicker({
  value: baseValue,
  onChange: baseOnChange,
  className,
  label,
  placeholder,
  postscript,
  error,
  clearable,
}: Props) {
  // TODO: ref - for react hook form
  // TODO: disabled

  const [isActive, setIsActive] = useState(false)

  const minutesRef = useRef<HTMLDivElement | null>(null)
  const hoursRef = useRef<HTMLDivElement | null>(null)

  const [value, setValue] = useState<Moment | null>(baseValue ?? null)

  useEffect(() => {
    if (baseValue !== undefined) {
      setValue(baseValue)
    }
  }, [baseValue])

  const onChange = (val: Moment | null) => {
    if (val) {
      hoursRef.current
        ?.querySelectorAll(`.${styles.item}`)
        [val.hour()].scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      minutesRef.current
        ?.querySelectorAll(`.${styles.item}`)
        [val.minute()].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        })
    }

    if (baseOnChange || baseValue) {
      baseOnChange?.(val)
      if (!baseValue) {
        setValue(val)
      }
    } else {
      setValue(val)
    }
  }

  const clear: MouseEventHandler = (e) => {
    e.stopPropagation()
    onChange(null)
    setIsActive(false)
  }

  return (
    <Input
      className={classNames(styles.container, className, {
        [styles.error]: error,
      })}
      label={label}
      placeholder={placeholder}
      postscript={postscript}
      error={error}
      value={value?.format('HH:mm') ?? null}
      postfix={
        <Sandwich
          items={[
            {
              key: 'true',
              value: <Icon icon="times" onClick={clear} hoverable />,
            },
            {
              key: 'false',
              value: <Icon icon="clock" />,
            },
          ]}
          activeKey={(!!(clearable && value)).toString()}
        />
      }
      inputContainer={({ props, component }) => (
        <WithPopover
          className={styles.withPopover}
          isActive={isActive}
          setIsActive={setIsActive}
          reference={component}
          referenceProps={{
            ...props,
            className: classNames(props.className, styles.inputContainer),
          }}
          popoverProps={{ className: styles.itemsContainer }}
          popover={
            <>
              <div className={styles.items} ref={hoursRef}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    className={classNames(styles.item, {
                      [styles.active]: value?.hour() === i,
                    })}
                    onClick={() => onChange(moment(value ?? undefined).hour(i))}
                  >
                    {i}
                  </span>
                ))}
              </div>
              <div className={styles.items} ref={minutesRef}>
                {Array.from({ length: 60 }).map((_, i) => (
                  <span
                    className={classNames(styles.item, {
                      [styles.active]: value?.minute() === i,
                    })}
                    onClick={() =>
                      onChange(moment(value ?? undefined).minute(i))
                    }
                  >
                    {i}
                  </span>
                ))}
              </div>
            </>
          }
        />
      )}
      blocked
    />
  )
}

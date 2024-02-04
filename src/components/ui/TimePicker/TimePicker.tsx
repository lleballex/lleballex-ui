import { MouseEventHandler, useEffect, useState, useRef } from 'react'
import { FormError } from '@/lib/form-error'
import { useControlValue } from '@/lib/control-value'
import classNames from 'classnames'
import moment, { Moment } from 'moment'
import BaseInput from '@/components/ui/BaseInput'
import BaseButton from '@/components/ui/BaseButton'
import ControlContainer from '@/components/ui/ControlContainer'
import WithPopover from '@/components/ui/WithPopover'
import Input from '@/components/ui/Input'
import Sandwich from '@/components/ui/Sandwich'
import Icon from '@/components/ui/Icon'
import styles from './TimePicker.module.scss'

interface Props {
  className?: string
  label?: string
  placeholder?: string
  postscript?: string
  error?: FormError
  clearable?: boolean
  value?: Moment | null
  onChange?: (val: Moment | null) => void
}

export default function TimePicker({
  className,
  label,
  placeholder,
  postscript,
  error,
  clearable: isClearable,
  value: baseValue,
  onChange: baseOnChange,
}: Props) {
  // TODO: ref - for react hook form
  // TODO: accessibility

  const [isActive, setIsActive] = useState(false)

  const minutesRef = useRef<HTMLDivElement | null>(null)
  const hoursRef = useRef<HTMLDivElement | null>(null)

  const { value, onChange } = useControlValue({
    baseValue,
    baseOnChange,
    transformBaseValue: (val) => val ?? null,
    transformValue: (val) => val,
  })

  useEffect(() => {
    if (value) {
      hoursRef.current
        ?.querySelectorAll(`.${styles.item}`)
        [value.hour()].scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      minutesRef.current
        ?.querySelectorAll(`.${styles.item}`)
        [value.minute()].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        })
    }
  }, [value])

  const clear: MouseEventHandler = (e) => {
    e.stopPropagation()
    onChange(null)
    setIsActive(false)
  }

  return (
    <ControlContainer
      className={classNames(className, styles.container, {
        [styles.error]: error,
      })}
      label={label}
      postscript={postscript}
      error={error}
    >
      <WithPopover
        className={styles.withPopover}
        popoverClassName={styles.itemsContainer}
        isActive={isActive}
        setIsActive={setIsActive}
        placement="bottom"
        reference={
          <BaseInput
            className={styles.inputContainer}
            inputClassName={styles.input}
            placeholder={placeholder}
            error={!!error}
            value={value?.format('HH:mm') ?? null}
            postfix={
              <Sandwich
                items={[
                  {
                    key: 'true',
                    value: (
                      <BaseButton onClick={clear} hoverable>
                        <Icon icon="times" />
                      </BaseButton>
                    ),
                  },
                  {
                    key: 'false',
                    value: <Icon icon="clock" />,
                  },
                ]}
                activeKey={(!!(isClearable && value)).toString()}
              />
            }
            blocked
          />
        }
        popover={
          <>
            <div className={styles.items} ref={hoursRef}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  className={classNames(styles.item, {
                    [styles.active]: value?.hour() === i,
                  })}
                  key={i}
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
                  key={i}
                  onClick={() => onChange(moment(value ?? undefined).minute(i))}
                >
                  {i}
                </span>
              ))}
            </div>
          </>
        }
      />
    </ControlContainer>
  )
}

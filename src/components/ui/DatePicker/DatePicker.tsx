import { MouseEventHandler, useEffect, useState } from 'react'
import { FormError } from '@/lib/form-error'
import { useControlValue } from '@/lib/control-value'
import classNames from 'classnames'
import moment, { Moment } from 'moment'
import BaseInput from '@/components/ui/BaseInput'
import BaseButton from '@/components/ui/BaseButton'
import BaseDatePicker from 'react-datepicker'
import ControlContainer from '@/components/ui/ControlContainer'
import Icon from '@/components/ui/Icon'
import Sandwich from '@/components/ui/Sandwich'
import WithPopover from '@/components/ui/WithPopover'
import styles from './DatePicker.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  className?: string
  label?: string
  placeholder?: string
  postscript?: string
  clearable?: boolean
  error?: FormError
  value?: Moment | null
  onChange?: (val: Moment | null) => void
}

export default function DatePicker({
  className,
  label,
  placeholder,
  postscript,
  error,
  clearable: isClearable,
  value: baseValue,
  onChange: baseOnChange,
}: Props) {
  // TODO: accessibility, localization
  // TODO: shift - floating middleware

  const [isActive, setIsActive] = useState(false)

  const { value, onChange } = useControlValue({
    baseValue,
    baseOnChange,
    transformBaseValue: (val) => val ?? null,
    transformValue: (val) => val,
  })

  useEffect(() => {
    setIsActive(false)
  }, [value])

  const clear: MouseEventHandler = (e) => {
    e.stopPropagation()
    onChange(null)
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
        popoverClassName={styles.calendarPopover}
        isActive={isActive}
        setIsActive={setIsActive}
        placement="bottom"
        reference={
          <BaseInput
            className={styles.inputContainer}
            inputClassName={styles.input}
            placeholder={placeholder}
            value={value?.format('DD.MM.YY') ?? null}
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
                  { key: 'false', value: <Icon icon="calendar" /> },
                ]}
                activeKey={(!!isClearable && !!value).toString()}
              />
            }
            blocked
          />
        }
        popover={
          <BaseDatePicker
            calendarClassName={styles.calendar}
            selected={value?.toDate()}
            onChange={(val) => onChange(val ? moment(val) : null)}
            nextMonthButtonLabel="sddfdsf"
            inline
            disabledKeyboardNavigation
          />
        }
      />
    </ControlContainer>
  )
}

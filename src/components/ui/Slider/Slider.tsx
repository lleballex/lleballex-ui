import { useEffect, useState } from 'react'
import { getFormError } from '@/lib/get-form-error'
import classNames from 'classnames'
import BaseSlider from 'react-slider'
import styles from './Slider.module.scss'

interface Props<Value extends number | number[]> {
  value?: Value
  onChange?: (val: Value) => void
  min?: number
  max?: number
  step?: number
  error?: string
}

export default function Slider<Value extends number | number[] = number>({
  value: baseValue,
  onChange: baseOnChange,
  min,
  max,
  step,
  error,
}: Props<Value>) {
  // TODO: ref - for react hook form
  // TODO: disabled
  // TODO: label

  const [value, setValue] = useState<number[]>(
    baseValue === undefined
      ? []
      : Array.isArray(baseValue)
        ? baseValue
        : [baseValue],
  )

  useEffect(() => {
    if (baseValue !== undefined) {
      setValue(Array.isArray(baseValue) ? baseValue : [baseValue])
    }
  }, [baseValue])

  const onChange = (val: number[] | number) => {
    if (baseOnChange || baseValue !== undefined) {
      // TODO: fix ts
      // @ts-ignore
      baseOnChange?.(val)

      if (baseValue === undefined) {
        setValue(Array.isArray(val) ? val : [val])
      }
    } else {
      setValue(Array.isArray(val) ? val : [val])
    }
  }

  return (
    <div className={styles.container}>
      <BaseSlider
        className={classNames(styles.slider, {
          [styles.multi]: value.length > 1,
        })}
        thumbClassName={styles.sliderThumbContainer}
        trackClassName={styles.sliderTrack}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={classNames(props.className, {
              [styles.first]: state.index === 0,
              [styles.last]: state.index == value.length,
            })}
          />
        )}
        renderThumb={(props, state) => (
          <div {...props}>
            <span className={styles.sliderThumb} />
            <span>{state.valueNow}</span>
          </div>
        )}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        minDistance={1}
        pearling
      />
      {error && <p className={styles.error}>{getFormError(error)}</p>}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { FormError } from '@/lib/form-error'
import classNames from 'classnames'
import BaseSlider from 'react-slider'
import ControlContainer from '@/components/ui/ControlContainer'
import styles from './Slider.module.scss'
import { useControlValue } from '@/lib/control-value'

interface Props<Value extends number | number[]> {
  className?: string
  label?: string
  postscript?: string
  error?: FormError
  min?: number
  max?: number
  step?: number
  value?: Value
  onChange?: (val: Value) => void
}

export default function Slider<Value extends number | number[] = number>({
  className,
  label,
  postscript,
  error,
  min = 0,
  max,
  step = 1,
  value: baseValue,
  onChange: baseOnChange,
}: Props<Value>) {
  // TODO: ref - for react hook form
  // TODO: accessibility
  // TODO: default value for multiple marks

  const { value, onChange } = useControlValue<number[], number | number[]>({
    baseValue,
    baseOnChange: baseOnChange as any,
    transformBaseValue: (val) =>
      Array.isArray(val) ? val : val === undefined ? [min] : [val],
    transformValue: (val) => (val.length === 1 ? val[0] : val),
  })

  return (
    <ControlContainer
      className={classNames(className, styles.container, {
        [styles.error]: error,
      })}
      label={label}
      postscript={postscript}
      error={error}
    >
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
    </ControlContainer>
  )
}

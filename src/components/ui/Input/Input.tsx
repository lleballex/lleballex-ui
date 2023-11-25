import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'

interface Props<Type extends string | number> {
  className?: string
  inputContainerClassName?: string
  label?: string
  placeholder?: string
  postscript?: string
  type?: 'text' | 'email' | 'tel' | 'number'
  prefix?: ReactNode
  postfix?: ReactNode
  error?: string
  // TODO: props type
  inputContainer?: (args: { props: {}; component: ReactNode }) => ReactNode
  blocked?: boolean
  value?: Type | null
  onChange?: (val: Type | null) => void
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

export default function Input<Type extends string | number = string>({
  className,
  inputContainerClassName,
  label,
  placeholder,
  postscript,
  type = 'text',
  prefix,
  postfix,
  error,
  inputContainer = ({ props, component }) => <div {...props}>{component}</div>,
  blocked,
  value,
  onChange: baseOnChange,
  onFocus,
  onBlur,
}: Props<Type>) {
  // TODO: value, onchange, ref, react hook form, error animation, type - arrows for number and transform value
  // TODO: disabled

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // TODO: fix typescript
    const val = e.target.value
    if (val === '') {
      baseOnChange?.(null)
    } else if (type === 'number') {
      // @ts-ignore
      baseOnChange?.(+val as const)
    } else {
      // @ts-ignore
      baseOnChange?.(val)
    }
  }

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.error]: error,
      })}
    >
      {label && <p className={styles.label}>{label}</p>}
      {inputContainer({
        props: {
          className: classNames(styles.inputContainer, inputContainerClassName),
        },
        component: (
          <>
            {prefix}
            <input
              className={styles.input}
              type={type}
              placeholder={placeholder}
              disabled={blocked}
              value={value === null ? '' : value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {postfix}
          </>
        ),
      })}
      {error && (
        <p className={classNames(styles.postscript, styles.error)}>{error}</p>
      )}
      {postscript && <p className={styles.postscript}>{postscript}</p>}
    </div>
  )
}

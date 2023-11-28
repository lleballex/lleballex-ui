import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  useRef,
} from 'react'
import { getFormError } from '@/lib/get-form-error'
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
  prefixClickable?: boolean
  postfix?: ReactNode
  postfixClickable?: boolean
  error?: string
  inputContainer?: (args: {
    props: { className: string; onClick?: MouseEventHandler<HTMLDivElement> }
    component: ReactNode
  }) => ReactNode
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
  prefixClickable,
  postfix,
  postfixClickable,
  error,
  inputContainer = ({ props, component }) => <div {...props}>{component}</div>,
  blocked,
  value,
  onChange: baseOnChange,
  onFocus,
  onBlur,
}: Props<Type>) {
  // TODO: disabled - for all fields, error animation
  // TODO: ref - for react hook form for example

  const inputRef = useRef<HTMLInputElement | null>(null)
  const prefixRef = useRef<HTMLDivElement | null>(null)
  const postfixRef = useRef<HTMLDivElement | null>(null)

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

  const onInputContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      inputRef.current &&
      e.target !== inputRef.current &&
      (!prefixRef || !prefixRef.current?.contains(e.target as Element)) &&
      (!postfixClickable || !postfixRef.current?.contains(e.target as Element))
    ) {
      inputRef.current.focus()
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
          onClick: onInputContainerClick,
        },
        component: (
          <>
            <div
              className={classNames(styles.affix, {
                [styles.clickable]: prefixClickable,
              })}
              ref={prefixRef}
            >
              {prefix}
            </div>
            <input
              className={styles.input}
              ref={inputRef}
              type={type}
              placeholder={placeholder}
              disabled={blocked}
              value={
                value === null || (value === undefined && baseOnChange)
                  ? ''
                  : value
              }
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <div
              className={classNames(styles.affix, {
                [styles.clickable]: postfixClickable,
              })}
              ref={postfixRef}
            >
              {postfix}
            </div>
          </>
        ),
      })}
      {error && (
        <p className={classNames(styles.postscript, styles.error)}>
          {getFormError(error)}
        </p>
      )}
      {postscript && <p className={styles.postscript}>{postscript}</p>}
    </div>
  )
}

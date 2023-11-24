import { HTMLInputTypeAttribute, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'

interface Props {
  className?: string
  label?: string
  placeholder?: string
  postscript?: string
  type?: HTMLInputTypeAttribute
  prefix?: ReactNode
  postfix?: ReactNode
  error?: string
}

export default function Input({
  className,
  label,
  placeholder,
  postscript,
  type = 'text',
  prefix,
  postfix,
  error,
}: Props) {
  // TODO: value, onchange, ref, react hook form, error animation

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.error]: error,
      })}
    >
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.inputContainer}>
        {prefix}
        <input className={styles.input} type={type} placeholder={placeholder} />
        {postfix}
      </div>
      {error && (
        <p className={classNames(styles.postscript, styles.error)}>{error}</p>
      )}
      {postscript && <p className={styles.postscript}>{postscript}</p>}
    </div>
  )
}

import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

interface Props {
  children?: ReactNode
  className?: string
  type?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  children,
  className,
  type = 'primary',
  disabled,
  htmlType = 'button',
  onClick,
}: Props) {
  // TODO: loading
  // TODO: full width
  // TODO: link
  // TODO: white space

  return (
    <button
      className={classNames(styles.button, styles[type], className)}
      disabled={disabled}
      type={htmlType}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

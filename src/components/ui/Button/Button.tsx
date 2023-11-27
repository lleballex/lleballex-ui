import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import Spinner from '@/components/ui/Spinner'
import styles from './Button.module.scss'

interface Props {
  children?: ReactNode
  className?: string
  type?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: MouseEventHandler<HTMLButtonElement>
  fullWidth?: boolean
  loading?: boolean
}

export default function Button({
  children,
  className,
  type = 'primary',
  disabled,
  htmlType = 'button',
  onClick,
  fullWidth,
  loading,
}: Props) {
  return (
    <button
      className={classNames(styles.button, styles[type], className, {
        [styles.full]: fullWidth,
      })}
      disabled={disabled || loading}
      type={htmlType}
      onClick={onClick}
    >
      {children}
      {loading && <Spinner />}
    </button>
  )
}

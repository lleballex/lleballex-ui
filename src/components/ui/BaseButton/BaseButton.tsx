import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './BaseButton.module.scss'

export interface BaseButtonProps {
  className?: string
  stopPropagation?: boolean
  preventDefault?: boolean
  hoverable?: boolean
  disabled?: boolean
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function BaseButton({
  className,
  stopPropagation,
  preventDefault,
  hoverable,
  disabled,
  htmlType = 'button',
  children,
  onClick: baseOnClick,
}: BaseButtonProps) {
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (stopPropagation) {
      e.stopPropagation()
    }
    if (preventDefault) {
      e.preventDefault()
    }
    baseOnClick?.(e)
  }

  return (
    <button
      className={classNames(className, styles.button, {
        [styles.hoverable]: hoverable,
      })}
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

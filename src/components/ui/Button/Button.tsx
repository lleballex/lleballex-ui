import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import MountTransition from '@/components/ui/MountTransition'
import Spinner from '@/components/ui/Spinner'
import styles from './Button.module.scss'

interface Props {
  className?: string
  type?: 'primary' | 'secondary' | 'text'
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  fullWidth?: boolean
  loading?: boolean
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  className,
  type = 'primary',
  htmlType = 'button',
  fullWidth,
  loading,
  children,
  onClick,
}: Props) {
  // TODO: ref
  // TODO: link
  // TODO: stop propagation, prevent default, base button

  return (
    <button
      className={classNames(styles.button, styles[type], className, {
        [styles.full]: fullWidth,
      })}
      disabled={loading}
      type={htmlType}
      onClick={onClick}
    >
      {children}
      <MountTransition gap horizontal>
        {loading && <Spinner />}
      </MountTransition>
    </button>
  )
}

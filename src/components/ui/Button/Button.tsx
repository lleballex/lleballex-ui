import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import MountTransition from '@/components/ui/MountTransition'
import BaseButton, { BaseButtonProps } from '@/components/ui/BaseButton'
import Spinner from '@/components/ui/Spinner'
import styles from './Button.module.scss'

interface Props extends BaseButtonProps {
  className?: string
  type?: 'primary' | 'secondary' | 'text'
  fullWidth?: boolean
  loading?: boolean
  children?: ReactNode
}

export default function Button({
  className,
  type = 'primary',
  fullWidth,
  loading,
  children,
  ...baseButtonProps
}: Props) {
  // TODO: ref
  // TODO: link

  return (
    <BaseButton
      {...baseButtonProps}
      className={classNames(styles.button, styles[type], className, {
        [styles.full]: fullWidth,
      })}
      disabled={loading}
    >
      {children}
      <MountTransition gap horizontal>
        {loading && <Spinner />}
      </MountTransition>
    </BaseButton>
  )
}

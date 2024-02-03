import { ReactNode } from 'react'
import { getFormError } from '@/lib/get-form-error'
import classNames from 'classnames'
import MountTransition from '@/components/ui/MountTransition'
import styles from './ControlContainer.module.scss'

export interface ControlContainerProps {
  className?: string
  controlId?: string
  label?: string
  postscript?: string
  error?: string
  children?: ReactNode
}

export default function ControlContainer({
  className,
  controlId,
  label,
  postscript,
  error,
  children,
}: ControlContainerProps) {
  return (
    <section className={classNames(styles.container, className)}>
      {label && (
        <label className={styles.label} htmlFor={controlId}>
          {label}
        </label>
      )}
      {children}
      <MountTransition gap>
        {error && (
          <p className={classNames(styles.postscript, styles.error)}>
            {getFormError(error)}
          </p>
        )}
      </MountTransition>
      {postscript && <p className={styles.postscript}>{postscript}</p>}
    </section>
  )
}

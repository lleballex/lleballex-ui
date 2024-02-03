import { ReactNode, useEffect, useState } from 'react'
import { Site } from '@/config/site'
import classNames from 'classnames'
import styles from './MountTransition.module.scss'

interface Props {
  className?: string
  gap?: boolean
  children?: ReactNode
}

export default function MountTransition({
  className,
  children,
  gap: hasGap,
}: Props) {
  // TODO: use react transition group

  const [prevChildren, setPrevChildren] = useState<null | ReactNode>(null)
  const [state, setState] = useState<'active' | 'inactive'>('inactive')

  useEffect(() => {
    if (children && !prevChildren) {
      setPrevChildren(children)
      setTimeout(() => {
        setState('active')
      }, 50)
    } else if (!children && prevChildren) {
      setState('inactive')
      setTimeout(() => {
        setPrevChildren(null)
      }, Site.transition.duration)
    } else if (children) {
      setPrevChildren(children)
    }
  }, [children])

  if (!prevChildren) {
    return null
  }

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.gap]: hasGap,
      })}
      data-state={state}
    >
      {prevChildren}
    </div>
  )
}

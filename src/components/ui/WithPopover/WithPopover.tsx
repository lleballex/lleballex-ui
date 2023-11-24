import { useState } from 'react'
import { ReactNode } from 'react'
import {
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
  autoUpdate,
  shift,
  flip,
  useClick,
} from '@floating-ui/react'
import { Site } from '@/config/site'
import styles from './WithPopover.module.scss'

interface Props {
  children: [ReactNode, ReactNode]
}

export default function WithPopover({ children }: Props) {
  // TODO: finish

  const [isShowed, setIsShowed] = useState(false)

  const { context, refs, floatingStyles } = useFloating({
    open: isShowed,
    onOpenChange: setIsShowed,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  })
  const { isMounted, status } = useTransitionStatus(context, {
    duration: Site.transition.duration,
  })
  const dismiss = useDismiss(context)
  const click = useClick(context)
  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ])

  return (
    <div className={styles.container} data-status={status}>
      <div
        className={styles.main}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children[0]}
      </div>
      {isMounted && (
        <div
          className={styles.popover}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {children[1]}
        </div>
      )}
    </div>
  )
}

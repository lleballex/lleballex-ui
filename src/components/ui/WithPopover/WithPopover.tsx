import { MouseEventHandler, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import {
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
  autoUpdate,
  flip,
  useClick,
} from '@floating-ui/react'
import { Site } from '@/config/site'
import classNames from 'classnames'
import styles from './WithPopover.module.scss'

interface ChildProps {
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

interface Props {
  className?: string
  referenceProps?: ChildProps
  reference: ReactNode
  popoverProps?: ChildProps
  popover: ReactNode
  noClick?: boolean
  isActive?: boolean
  setIsActive?: (val: boolean) => void
}

export default function WithPopover({
  className,
  referenceProps,
  reference,
  popoverProps,
  popover,
  noClick,
  isActive,
  setIsActive,
}: Props) {
  // TODO: more props - placement, middlewares

  const [isShowed, setIsShowed] = useState(isActive ?? false)
  useEffect(() => setIsActive?.(isShowed), [isShowed])
  useEffect(() => {
    isActive !== undefined && setIsShowed(isActive)
  }, [isActive])

  const { context, refs, floatingStyles, placement } = useFloating({
    open: isShowed,
    onOpenChange: setIsShowed,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
    placement: 'bottom-start',
  })
  const { isMounted, status } = useTransitionStatus(context, {
    duration: Site.transition.duration,
  })
  const dismiss = useDismiss(context)
  const click = useClick(context, { enabled: !noClick })
  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ])

  return (
    <div
      className={classNames(styles.container, className)}
      data-status={status}
      data-placement={placement}
    >
      <div
        className={classNames(styles.main, referenceProps?.className)}
        ref={refs.setReference}
        onClick={referenceProps?.onClick}
        {...getReferenceProps()}
      >
        {reference}
      </div>
      {isMounted && (
        <div
          className={classNames(styles.popover, popoverProps?.className)}
          ref={refs.setFloating}
          style={floatingStyles}
          onClick={popoverProps?.onClick}
          {...getFloatingProps()}
        >
          {popover}
        </div>
      )}
    </div>
  )
}

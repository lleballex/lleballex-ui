import { ReactNode } from 'react'
import {
  FloatingPortal,
  UseDismissProps,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react'
import { Site } from '@/config/site'

interface Props {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
  children?: ReactNode
  className?: string
  dismiss?: UseDismissProps
}

/**
 * Floating element that doesn't depend on the reference (fixed element)
 */
export default function Floating({
  children,
  isShowed,
  setIsShowed,
  className,
  dismiss: dismissProps,
}: Props) {
  // TODO: floating tree

  const { context, refs } = useFloating({
    open: isShowed,
    onOpenChange: setIsShowed,
  })
  const { isMounted, status } = useTransitionStatus(context, {
    duration: Site.transition.duration,
  })
  const dismiss = useDismiss(context, dismissProps)
  const { getFloatingProps } = useInteractions([dismiss])

  return (
    isMounted && (
      <FloatingPortal>
        <div
          className={className}
          data-status={status}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          {children}
        </div>
      </FloatingPortal>
    )
  )
}

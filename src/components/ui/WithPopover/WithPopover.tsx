import { ReactNode } from 'react'
import {
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
  autoUpdate,
  flip,
  useClick,
  Placement,
  UseFloatingOptions,
} from '@floating-ui/react'
import { useControlValue } from '@/lib/use-control-value'
import { Site } from '@/config/site'
import classNames from 'classnames'
import styles from './WithPopover.module.scss'

interface Props {
  className?: string
  referenceClassName?: string
  popoverClassName?: string
  strategy?: UseFloatingOptions['strategy']
  placement?: Placement
  noClick?: boolean
  reference: ReactNode
  popover: ReactNode
  isActive?: boolean
  setIsActive?: (val: boolean) => void
}

export default function WithPopover({
  className,
  referenceClassName,
  popoverClassName,
  strategy = 'absolute',
  placement: basePlacement,
  noClick,
  reference,
  popover,
  isActive: baseIsActive,
  setIsActive: baseSetIsActive,
}: Props) {
  // TODO: more props - placement, middlewares

  const { value: isActive, onChange: setIsActive } = useControlValue({
    baseValue: baseIsActive,
    baseOnChange: baseSetIsActive,
    transformBaseValue: (val) => val ?? false,
    transformValue: (val) => val,
  })

  const { context, refs, floatingStyles, placement } = useFloating({
    open: isActive,
    onOpenChange: setIsActive,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
    placement: basePlacement,
    strategy,
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
      className={classNames(className, styles.container)}
      data-status={status}
      data-placement={placement}
    >
      <div
        className={classNames(referenceClassName, styles.main)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {reference}
      </div>
      {isMounted && (
        <div
          className={classNames(popoverClassName, styles.popover)}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {popover}
        </div>
      )}
    </div>
  )
}

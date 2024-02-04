import { ReactNode, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import MountTransition from '@/components/ui/MountTransition'

interface Props {
  className?: string
  isShowed: boolean
  children?: ReactNode
  setIsShowed: (val: boolean) => void
}

export default function Floating({
  className,
  children,
  isShowed,
  setIsShowed,
}: Props) {
  const id = useId()

  const onKeyDown = (e: KeyboardEvent) => {
    const floatings = document.querySelectorAll('body > .floating')
    const floating = floatings[floatings.length - 1]

    if (floating.id === id) {
      if (e.key === 'Escape') {
        setIsShowed(false)
      } else if (e.key === 'Tab') {
        const els = floating.querySelectorAll<HTMLElement>(
          'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )

        if (floating.contains(document.activeElement)) {
          if (e.shiftKey && document.activeElement === els[0]) {
            els[els.length - 1].focus()
            e.preventDefault()
          } else if (
            !e.shiftKey &&
            document.activeElement === els[els.length - 1]
          ) {
            els[0].focus()
            e.preventDefault()
          }
        } else {
          if (e.shiftKey) {
            els[els.length - 1].focus()
          } else {
            els[0].focus()
          }
          e.preventDefault()
        }
      }
    }
  }

  useEffect(() => {
    if (isShowed) {
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    }
  }, [isShowed])

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <MountTransition
      className={classNames('floating', className)}
      id={id}
      noAnimation
    >
      {isShowed && children}
    </MountTransition>,
    document.body,
  )
}

import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Site } from '@/config/site'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import styles from './MountTransition.module.scss'

interface Props {
  className?: string
  id?: string
  gap?: boolean
  horizontal?: boolean
  noAnimation?: boolean
  children?: ReactNode
}

export default function MountTransition({
  className,
  id,
  gap: hasGap,
  horizontal: isHorizontal,
  noAnimation,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [prevChildren, setPrevChildren] = useState<null | ReactNode>(null)
  const [isShowed, setIsShowed] = useState(false)

  useEffect(() => {
    if (children && !isShowed) {
      setIsShowed(true)
      setPrevChildren(children)
    } else if (!children && isShowed) {
      setIsShowed(false)
    } else if (children && isShowed) {
      setPrevChildren(children)
    }
  }, [children])

  if (!prevChildren) {
    return null
  }

  return (
    <CSSTransition
      nodeRef={containerRef}
      timeout={Site.transition.duration}
      in={isShowed}
      onExited={() => setPrevChildren(false)}
      appear
    >
      <div
        className={classNames(styles.container, className, {
          [styles.gap]: hasGap,
          [styles.horizontal]: isHorizontal,
          [styles.noAnimation]: noAnimation,
        })}
        ref={containerRef}
        id={id}
      >
        {/* we need another wrapper because children might have width or height properties */}
        {noAnimation ? prevChildren : <div>{prevChildren}</div>}
      </div>
    </CSSTransition>
  )
}

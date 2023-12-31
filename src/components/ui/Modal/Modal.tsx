import { ReactNode } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import classNames from 'classnames'
import Floating from '@/components/ui/Floating'
import Icon from '@/components/ui/Icon'
import styles from './Modal.module.scss'

export interface ModalStateProps {
  isShowed: boolean
  setIsShowed: (val: boolean) => void
}

export interface ModalProps extends ModalStateProps {
  className?: string
  children?: ReactNode
  header: ReactNode
  mobileHeader?: ReactNode
  width?: number
  footer?: ReactNode
}

export default function Modal({
  isShowed,
  setIsShowed,
  className,
  children,
  header,
  mobileHeader = header,
  width = 600,
  footer,
}: ModalProps) {
  // TODO: floating tree or something - dismiss works wrong for nested modals (scape + outsitePress)

  return (
    <Floating
      className={styles.container}
      isShowed={isShowed}
      setIsShowed={setIsShowed}
      dismiss={{ outsidePress: false }}
    >
      <RemoveScroll>
        <span className={styles.backdrop} onClick={() => setIsShowed(false)} />
        <div className={classNames(styles.modal, className)} style={{ width }}>
          <div className={styles.modalHeader}>
            <div className={classNames(styles.modalTitle, styles.desktop)}>
              {header}
            </div>
            <div className={classNames(styles.modalTitle, styles.mobile)}>
              {mobileHeader}
            </div>
            <Icon icon="times" onClick={() => setIsShowed(false)} hoverable />
          </div>
          {children}
          {footer && <div className={styles.modalFooter}>{footer}</div>}
        </div>
      </RemoveScroll>
    </Floating>
  )
}

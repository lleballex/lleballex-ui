import { MouseEventHandler } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import styles from './Icon.module.scss'

const TimesIcon = dynamic(() => import('@/assets/icons/times.svg'))

interface Props {
  icon: 'times'
  className?: string
  onClick?: MouseEventHandler<SVGElement>
}

export default function Icon({ icon, className, onClick }: Props) {
  const args = { className: classNames(styles.icon, className), onClick } as any

  if (icon === 'times') {
    return <TimesIcon {...args} />
  }

  return null
}

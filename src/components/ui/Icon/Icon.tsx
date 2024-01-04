import { MouseEventHandler } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import styles from './Icon.module.scss'

const TimesIcon = dynamic(() => import('@/assets/icons/times.svg'))
const CheckIcon = dynamic(() => import('@/assets/icons/check.svg'))
const ChevronRightIcon = dynamic(
  () => import('@/assets/icons/chevron-right.svg'),
)
const ChevronLeftIcon = dynamic(() => import('@/assets/icons/chevron-left.svg'))
const ChevronUpIcon = dynamic(() => import('@/assets/icons/chevron-up.svg'))
const ChevronDownIcon = dynamic(() => import('@/assets/icons/chevron-down.svg'))
const LoadingIcon = dynamic(() => import('@/assets/icons/loading.svg'))
const ClockIcon = dynamic(() => import('@/assets/icons/clock.svg'))

interface Props {
  icon:
    | 'times'
    | 'check'
    | 'chevronRight'
    | 'chevronLeft'
    | 'chevronUp'
    | 'chevronDown'
    | 'loading'
    | 'clock'
  className?: string
  onClick?: MouseEventHandler<SVGElement>
  hoverable?: boolean
}

export default function Icon({ icon, className, onClick, hoverable }: Props) {
  const args = {
    className: classNames('icon', styles.icon, className, {
      [styles.hoverable]: hoverable,
    }),
    onClick,
  } as any

  switch (icon) {
    case 'times':
      return <TimesIcon {...args} />
    case 'check':
      return <CheckIcon {...args} />
    case 'chevronRight':
      return <ChevronRightIcon {...args} />
    case 'chevronLeft':
      return <ChevronLeftIcon {...args} />
    case 'chevronUp':
      return <ChevronUpIcon {...args} />
    case 'chevronDown':
      return <ChevronDownIcon {...args} />
    case 'loading':
      return <LoadingIcon {...args} />
    case 'clock':
      return <ClockIcon {...args} />
    default:
      return null
  }
}

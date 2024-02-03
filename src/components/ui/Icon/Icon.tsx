import { useMemo } from 'react'
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
const CalendarIcon = dynamic(() => import('@/assets/icons/calendar.svg'))

interface Props {
  className?: string
  icon:
    | 'times'
    | 'check'
    | 'chevronRight'
    | 'chevronLeft'
    | 'chevronUp'
    | 'chevronDown'
    | 'loading'
    | 'clock'
    | 'calendar'
}

export default function Icon({ icon, className }: Props) {
  const Icon = useMemo(() => {
    switch (icon) {
      case 'times':
        return TimesIcon
      case 'check':
        return CheckIcon
      case 'chevronRight':
        return ChevronRightIcon
      case 'chevronLeft':
        return ChevronLeftIcon
      case 'chevronUp':
        return ChevronUpIcon
      case 'chevronDown':
        return ChevronDownIcon
      case 'loading':
        return LoadingIcon
      case 'clock':
        return ClockIcon
      case 'calendar':
        return CalendarIcon
      default:
        return null
    }
  }, [icon])

  if (!Icon) {
    return null
  }

  return (
    <div className={classNames(styles.container, className, 'icon')}>
      <Icon />
    </div>
  )
}

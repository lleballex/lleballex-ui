import classNames from 'classnames'
import Icon from '@/components/ui/Icon'
import styles from './Spinner.module.scss'

interface Props {
  className?: string
}

export default function Spinner({ className }: Props) {
  return (
    <div className={classNames(styles.container, className)}>
      <Icon className={styles.spinner} icon="loading" />
    </div>
  )
}

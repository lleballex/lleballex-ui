import Switch from '@/components/ui/Switch'
import styles from './HomeSwitch.module.scss'

export default function HomeSwitch() {
  return (
    <div className={styles.container}>
      <h2>Switch</h2>
      <Switch />
      <Switch>Some words</Switch>
    </div>
  )
}

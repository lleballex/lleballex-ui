import Switch from '@/components/ui/Switch'
import styles from './HomeSwitch.module.scss'

export default function HomeSwitch() {
  return (
    <div className={styles.container}>
      <h2>Switches</h2>
      <div className={styles.switches}>
        <Switch />
        *switch with error*
        <Switch>Some words</Switch>
        *switch with content with error*
      </div>
    </div>
  )
}

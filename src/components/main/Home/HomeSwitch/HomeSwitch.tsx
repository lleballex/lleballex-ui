import Switch from '@/components/ui/Switch'
import styles from './HomeSwitch.module.scss'

export default function HomeSwitch() {
  return (
    <div className={styles.container}>
      <h2>Switches</h2>
      <div className={styles.switches}>
        <Switch />
        <Switch postscript="Postscript">Label</Switch>
        <Switch error="Error">Label</Switch>
      </div>
    </div>
  )
}

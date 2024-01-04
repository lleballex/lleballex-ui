import TimePicker from '@/components/ui/TimePicker'
import styles from './HomeTimePicker.module.scss'

export default function HomeTimePicker() {
  return (
    <div className={styles.container}>
      <h2>Time pickers</h2>
      <div className={styles.pickers}>
        <TimePicker placeholder="Default time picker" />
        <TimePicker
          label="Label"
          postscript="Postscript"
          placeholder="Placeholder"
        />
        <TimePicker
          label="Clearable"
          postscript="Postscript"
          placeholder="Placeholder"
          clearable
        />
        <TimePicker label="Label" placeholder="Placeholder" error="Error" />
      </div>
    </div>
  )
}

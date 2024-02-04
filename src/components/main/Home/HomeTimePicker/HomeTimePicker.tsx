import TimePicker from '@/components/ui/TimePicker'
import styles from './HomeTimePicker.module.scss'

export default function HomeTimePicker() {
  return (
    <div className={styles.container}>
      <h2>Time pickers</h2>
      <div className={styles.pickers}>
        <TimePicker />
        <TimePicker label="Label" postscript="Postscript" />
        <TimePicker
          label="Clearable"
          postscript="Postscript"
          placeholder="Select time"
          clearable
        />
        <TimePicker
          label="Clearable"
          placeholder="Select time"
          error="Error"
          clearable
        />
      </div>
    </div>
  )
}

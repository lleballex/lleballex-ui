import DatePicker from '@/components/ui/DatePicker'
import styles from './HomeDatePicker.module.scss'

export default function HomeDatePicker() {
  return (
    <div className={styles.container}>
      <h2>Date pickers</h2>
      <div className={styles.pickers}>
        <DatePicker />
        <DatePicker label="Label" postscript="Postscript" />
        <DatePicker
          label="Clearable"
          placeholder="Select date"
          postscript="Postscript"
          clearable
        />
        <DatePicker
          label="Clearable"
          placeholder="Select date"
          error="Error"
          clearable
        />
      </div>
    </div>
  )
}

import Checkbox from '@/components/ui/Checkbox'
import CheckboxGroup from '@/components/ui/CheckboxGroup'
import styles from './HomeCheckbox.module.scss'

export default function HomeCheckbox() {
  return (
    <div className={styles.container}>
      <h2>Checkboxes</h2>
      <div className={styles.checkboxes}>
        <Checkbox />
        <Checkbox error="Error" />
        <Checkbox>Some words</Checkbox>
        <Checkbox error="Error">Some words</Checkbox>
        <CheckboxGroup
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
        *checkbox group with error*
      </div>
    </div>
  )
}

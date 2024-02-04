import Checkbox from '@/components/ui/Checkbox'
import CheckboxGroup from '@/components/ui/CheckboxGroup'
import styles from './HomeCheckbox.module.scss'

export default function HomeCheckbox() {
  return (
    <div className={styles.container}>
      <h2>Checkboxes</h2>
      <div className={styles.checkboxes}>
        <Checkbox />
        <Checkbox postscript="Postscript">Label</Checkbox>
        <Checkbox error="Error">Label</Checkbox>
        <CheckboxGroup
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
        <CheckboxGroup
          label="Label"
          postscript="Postscript"
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
        <CheckboxGroup
          label="Label"
          error="Error"
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
      </div>
    </div>
  )
}

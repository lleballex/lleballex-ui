import Radio from '@/components/ui/Radio'
import RadioGroup from '@/components/ui/RadioGroup'
import styles from './HomeRadio.module.scss'

export default function HomeRadio() {
  return (
    <div className={styles.container}>
      <h2>Radios</h2>
      <div className={styles.radios}>
        <Radio />
        <Radio postscript="Postscript">Label</Radio>
        <Radio error="Error">Label</Radio>
        <RadioGroup
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
        <RadioGroup
          label="Label"
          postscript="Postscript"
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
        <RadioGroup
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

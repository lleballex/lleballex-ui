import Radio from '@/components/ui/Radio'
import RadioGroup from '@/components/ui/RadioGroup'
import styles from './HomeRadio.module.scss'

export default function HomeRadio() {
  return (
    <div className={styles.container}>
      <h2>Radios</h2>
      <div className={styles.radios}>
        <Radio />
        <Radio error="Error" />
        <Radio nullable>Nullable</Radio>
        <Radio nullable error="Error">
          Nullable
        </Radio>
        <RadioGroup
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
        <RadioGroup
          items={[
            { key: 'first', value: 'First element nullable' },
            { key: 'second', value: 'Second element nullable' },
          ]}
          nullable
        />
        *radio group with error*
      </div>
    </div>
  )
}

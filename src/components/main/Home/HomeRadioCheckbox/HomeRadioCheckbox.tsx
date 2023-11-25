import Radio from '@/components/ui/Radio'
import RadioGroup from '@/components/ui/RadioGroup'

export default function HomeRadioCheckbox() {
  return (
    <div>
      <div>
        <Radio nullable>one radio</Radio>
        <RadioGroup
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
      </div>
      <div>*checkbox*</div>
    </div>
  )
}

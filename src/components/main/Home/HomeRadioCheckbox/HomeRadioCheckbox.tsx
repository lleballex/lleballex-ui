import Radio from '@/components/ui/Radio'
import RadioGroup from '@/components/ui/RadioGroup'
import Checkbox from '@/components/ui/Checkbox'
import CheckboxGroup from '@/components/ui/CheckboxGroup'

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
      <div>
        <Checkbox>checkbox</Checkbox>
        <CheckboxGroup
          items={[
            { key: 'first', value: 'First element' },
            { key: 'second', value: 'Second element' },
          ]}
        />
      </div>
    </div>
  )
}

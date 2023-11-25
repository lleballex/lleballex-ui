import Input from '@/components/ui/Input'
import Icon from '@/components/ui/Icon'

export default function HomeInput() {
  return (
    <div>
      <Input label="Label" placeholder="Placeholder" postscript="Postfix" />
      <Input
        label="Label"
        placeholder="Placeholder"
        postscript="Postfix"
        prefix={<Icon icon="times" />}
        postfix={<Icon icon="times" />}
      />
      <Input
        label="Label"
        placeholder="Placeholder"
        postscript="Postfix"
        error="Error"
        type="number"
      />
    </div>
  )
}

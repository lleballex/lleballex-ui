import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

export default function HomeButton() {
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>
        Primary disabled
      </Button>
      <Button type="secondary">Secondary</Button>
      <Button type="secondary" disabled>
        Secondary disabled
      </Button>
      <Button type="primary">
        <span>Icon</span> <Icon icon="times" />
      </Button>
      <Button type="text">Text</Button>
      <Button type="text" disabled>
        Text disabled
      </Button>
    </div>
  )
}

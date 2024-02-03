import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import styles from './HomeButton.module.scss'

export default function HomeButton() {
  return (
    <div className={styles.container}>
      <h2>Buttons</h2>

      <div className={styles.buttons}>
        <Button type="primary">Primary</Button>
        <Button type="primary">
          <Icon icon="times" />
          <span>Primary icons</span>
          <Icon icon="times" />
        </Button>
        <Button type="primary" loading>
          Primary loading
        </Button>
      </div>

      <div className={styles.buttons}>
        <Button type="secondary">Secondary</Button>
        <Button type="secondary">
          <Icon icon="times" />
          <span>Secondary icon</span>
          <Icon icon="times" />
        </Button>
        <Button type="secondary" loading>
          Secondary loading
        </Button>
      </div>

      <div className={styles.buttons}>
        <Button type="text">Text</Button>
        <Button type="text">
          <Icon icon="times" />
          <span>Text icons</span>
          <Icon icon="times" />
        </Button>
        <Button type="text" loading>
          Text loading
        </Button>
      </div>
    </div>
  )
}

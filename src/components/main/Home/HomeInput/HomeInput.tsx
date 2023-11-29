import Input from '@/components/ui/Input'
import Icon from '@/components/ui/Icon'
import styles from './HomeInput.module.scss'

export default function HomeInput() {
  return (
    <div className={styles.container}>
      <h2>Inputs</h2>
      <div className={styles.inputs}>
        <Input placeholder="Default input" />
        <Input label="Label" placeholder="Placeholder" postscript="Postfix" />
        <Input
          label="Label"
          placeholder="Placeholder"
          postscript="Postfix"
          prefix={<Icon icon="times" />}
          postfix={<Icon icon="times" hoverable />}
        />
        <Input
          label="Label"
          placeholder="Placeholder"
          error="Error"
          type="number"
        />
      </div>
    </div>
  )
}

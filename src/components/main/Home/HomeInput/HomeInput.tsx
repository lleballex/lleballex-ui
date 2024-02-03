import Input from '@/components/ui/Input'
import Icon from '@/components/ui/Icon'
import BaseButton from '@/components/ui/BaseButton'
import styles from './HomeInput.module.scss'

export default function HomeInput() {
  return (
    <div className={styles.container}>
      <h2>Inputs</h2>
      <div className={styles.inputs}>
        <Input />
        <Input
          label="Label"
          postscript="Postscript"
          placeholder="Type something"
        />
        <Input
          label="Label"
          postscript="Postscript"
          placeholder="Type something"
          prefix={<Icon icon="times" />}
          postfix={
            <BaseButton hoverable stopPropagation>
              <Icon icon="times" />
            </BaseButton>
          }
        />
        <Input label="Label" placeholder="Type something" error="Error" />
      </div>
    </div>
  )
}

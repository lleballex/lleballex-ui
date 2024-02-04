import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import styles from './HomeModal.module.scss'

export default function HomeModal() {
  const [isShowed, setIsShowed] = useState(false)
  const [isInnerShowed, setIsInnerShowed] = useState(false)

  return (
    <div className={styles.container}>
      <h2>Modals</h2>

      <Button onClick={() => setIsShowed(true)}>Open modal</Button>

      <Modal
        isShowed={isShowed}
        setIsShowed={setIsShowed}
        header="Modal"
        mobileHeader="Mobile modal"
        footer={
          <>
            <Button onClick={() => setIsShowed(false)} type="secondary">
              Cancel
            </Button>
            <Button onClick={() => setIsShowed(false)} type="primary">
              Submit
            </Button>
          </>
        }
      >
        <Button type="text" onClick={() => setIsInnerShowed(true)}>
          Open another one modal
        </Button>
        <Select label="select" />
        <Input />
      </Modal>

      <Modal
        isShowed={isInnerShowed && isShowed}
        setIsShowed={setIsInnerShowed}
        header="Inner modal"
        width={400}
      >
        <p>It is second modal inside first modal</p>
        <Select label="select" inputtable />
        <Input />
      </Modal>
    </div>
  )
}

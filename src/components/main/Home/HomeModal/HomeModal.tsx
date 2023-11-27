import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

export default function HomeModal() {
  const [isShowed, setIsShowed] = useState(false)
  const [isInnerShowed, setIsInnerShowed] = useState(false)

  return (
    <>
      <Button onClick={() => setIsShowed(true)}>Open modal</Button>

      <Modal
        isShowed={isShowed}
        setIsShowed={setIsShowed}
        title="First modal"
        mobileTitle="First modal mobile title"
        footer={
          <>
            <Button>first</Button>
            <Button>second</Button>
          </>
        }
      >
        <p>First modal</p>
        <Button onClick={() => setIsInnerShowed(true)}>
          Open another one modal
        </Button>
      </Modal>

      <Modal
        isShowed={isInnerShowed}
        setIsShowed={setIsInnerShowed}
        title="Inner modal"
      >
        <p>Second modal</p>
      </Modal>
    </>
  )
}

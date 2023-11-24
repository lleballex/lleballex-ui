import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export default function HomeModal() {
  const [isShowed, setIsShowed] = useState(false)
  const [isInnerShowed, setIsInnerShowed] = useState(false)

  return (
    <>
      <button onClick={() => setIsShowed(true)}>Open modal</button>

      <Modal
        isShowed={isShowed}
        setIsShowed={setIsShowed}
        title="First modal"
        mobileTitle="First modal mobile title"
        footer={
          <>
            <button>first</button>
            <button>second</button>
          </>
        }
      >
        <p>First modal</p>
        <button onClick={() => setIsInnerShowed(true)}>
          Open another one modal
        </button>
      </Modal>

      <Modal isShowed={isInnerShowed} setIsShowed={setIsInnerShowed} title="Inner modal">
        <p>Second modal</p>
      </Modal>
    </>
  )
}

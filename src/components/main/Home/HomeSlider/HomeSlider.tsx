import { useEffect, useState } from 'react'
import Slider from '@/components/ui/Slider'
import styles from './HomeSlider.module.scss'

export default function HomeSlider() {
  // TODO: add defaultValue to slider
  const [value, setValue] = useState([10, 30, 60])

  return (
    <div className={styles.container}>
      <h2>Sliders</h2>
      <div className={styles.sliders}>
        <Slider max={100} />
        <Slider value={value} onChange={setValue} max={100} />
        <Slider error="Error" max={100} />
      </div>
    </div>
  )
}

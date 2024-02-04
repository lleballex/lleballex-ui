import Slider from '@/components/ui/Slider'
import styles from './HomeSlider.module.scss'
import { useState } from 'react'

export default function HomeSlider() {
  // TODO: add default to slider
  const [value, setValue] = useState([30, 50, 90])

  return (
    <div className={styles.container}>
      <h2>Sliders</h2>
      <div className={styles.sliders}>
        <Slider max={100} />
        <Slider label="Label" postscript="Postscript" max={100} />
        <Slider
          value={value}
          onChange={setValue}
          label="Label"
          postscript="Postscript"
          max={100}
        />
        <Slider label="Label" error="Error" max={100} />
      </div>
    </div>
  )
}

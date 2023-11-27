import HomeModal from './HomeModal'
import HomeButton from './HomeButton'
import HomeInput from './HomeInput'
// import HomeSelect from './HomeSelect'
import HomeSwitch from './HomeSwitch'
// import HomeRadioCheckbox from './HomeRadioCheckbox'
// import HomeDate from './HomeDate'
// import HomeSlider from './HomeSlider'
// import HomeToast from './HomeToast'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <HomeModal />
      <HomeInput />
      {/* <HomeSelect /> */}
      <HomeSwitch />
      {/* <HomeRadioCheckbox /> */}
      {/* <HomeDate /> */}
      {/* <HomeSlider /> */}
      {/* <HomeToast /> */}
      *filters* *password input, textarea* *forms*
    </div>
  )
}

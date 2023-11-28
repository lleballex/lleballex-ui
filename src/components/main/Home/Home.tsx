import HomeButton from './HomeButton'
import HomeInput from './HomeInput'
import HomeSwitch from './HomeSwitch'
import HomeCheckbox from './HomeCheckbox'
import HomeRadio from './HomeRadio'
import HomeForm from './HomeForm'
// import HomeModal from './HomeModal'
// import HomeSelect from './HomeSelect'
// import HomeRadioCheckbox from './HomeRadioCheckbox'
// import HomeDate from './HomeDate'
// import HomeSlider from './HomeSlider'
// import HomeToast from './HomeToast'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <HomeInput />
      <HomeSwitch />
      <HomeCheckbox />
      <HomeRadio />
      <HomeForm />
      {/* <HomeModal /> */}
      {/* <HomeSelect /> */}
      {/* <HomeRadioCheckbox /> */}
      {/* <HomeDate /> */}
      {/* <HomeSlider /> */}
      {/* <HomeToast /> */}
      *filters* *password input, textarea* *forms*
    </div>
  )
}

import HomeButton from './HomeButton'
import HomeInput from './HomeInput'
import HomeSwitch from './HomeSwitch'
import HomeCheckbox from './HomeCheckbox'
import HomeRadio from './HomeRadio'
import HomeModal from './HomeModal'
import HomeForm from './HomeForm'
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
      <HomeModal />
      <HomeForm />
      {/* <HomeSelect /> */}
      {/* <HomeRadioCheckbox /> */}
      {/* <HomeDate /> */}
      {/* <HomeSlider /> */}
      {/* <HomeToast /> */}
      *filters* *password input, textarea* *forms* *slider* *range* *date time
      range pickers*
    </div>
  )
}

import HomeButton from './HomeButton'
import HomeInput from './HomeInput'
import HomeSelect from './HomeSelect'
import HomeSwitch from './HomeSwitch'
import HomeCheckbox from './HomeCheckbox'
import HomeRadio from './HomeRadio'
import HomeModal from './HomeModal'
import HomeToast from './HomeToast'
import HomeForm from './HomeForm'
// import HomeRadioCheckbox from './HomeRadioCheckbox'
// import HomeDate from './HomeDate'
// import HomeSlider from './HomeSlider'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <HomeInput />
      <HomeSelect />
      <HomeSwitch />
      <HomeCheckbox />
      <HomeRadio />
      <HomeModal />
      <HomeToast />
      <HomeForm />
      {/* <HomeRadioCheckbox /> */}
      {/* <HomeDate /> */}
      {/* <HomeSlider /> */}
      *filters* *password input, textarea* *forms* *slider* *range* *date time
      range pickers*
    </div>
  )
}

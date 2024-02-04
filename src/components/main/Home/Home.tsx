import HomeButton from './HomeButton'
import HomeInput from './HomeInput'
import HomeSelect from './HomeSelect'
// import HomeTimePicker from './HomeTimePicker'
// import HomeDatePicker from './HomeDatePicker'
// import HomeSwitch from './HomeSwitch'
import HomeCheckbox from './HomeCheckbox'
// import HomeRadio from './HomeRadio'
// import HomeSlider from './HomeSlider'
import HomeModal from './HomeModal'
import HomeToast from './HomeToast'
import HomeForm from './HomeForm'
// import HomeRadioCheckbox from './HomeRadioCheckbox'
// import HomeDate from './HomeDate'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeButton />
      <HomeInput />
      <HomeSelect />
      {/* <HomeTimePicker /> */}
      {/* <HomeDatePicker /> */}
      {/* <HomeSwitch /> */}
      <HomeCheckbox />
      {/* <HomeRadio /> */}
      {/* <HomeSlider /> */}
      <HomeModal />
      <HomeToast />
      <HomeForm />
      {/* <HomeRadioCheckbox /> */}
      {/* <HomeDate /> */}
      {/* *filters* *password input, textarea* *forms* *slider* *range* *date time 
      range pickers* */}
    </div>
  )
}

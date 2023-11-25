import HomeModal from './HomeModal'
import HomeButton from './HomeButton'
import HomeInput from './HomeInput'
import HomeSelect from './HomeSelect'
import HomeSwitch from './HomeSwitch'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeModal />
      <HomeButton />
      <HomeInput />
      <HomeSelect />
      <HomeSwitch />
    </div>
  )
}

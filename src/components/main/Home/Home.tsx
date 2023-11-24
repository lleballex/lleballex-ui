import HomeModal from './HomeModal'
import HomeButton from './HomeButton'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeModal />
      <HomeButton />
    </div>
  )
}

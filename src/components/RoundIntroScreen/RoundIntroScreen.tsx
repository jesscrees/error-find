import styles from './RoundIntroScreen.module.css'

function RoundIntroScreen({
  activityTitle,
  id,
  roundTitle,
}: {
  activityTitle: string
  id: string
  roundTitle: string
}) {
  return (
    <div className={styles.screen} id={id}>
      <h2>{activityTitle}</h2>
      <h1>{roundTitle}</h1>
    </div>
  )
}

export default RoundIntroScreen

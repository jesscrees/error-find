import styles from './RoundIntroScreen.module.css'

function RoundIntroScreen({
  activityTitle,
  roundTitle
}: {
  activityTitle: string
  roundTitle: string
}) {
  return (
    <div className={styles.screen}>
      <h2>{activityTitle}</h2>
      <h1>{roundTitle}</h1>
    </div>
  );
}

export default RoundIntroScreen;

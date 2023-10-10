import styles from './RoundIntroScreen.module.css'

function RoundIntroScreen({
  className,
  activityTitle,
  roundTitle
}: {
  className: string
  activityTitle: string
  roundTitle: string
}) {
  return (
    <div className={`${className} ${styles.screen}`}>
      <h2>{activityTitle}</h2>
      <h1>{roundTitle}</h1>
    </div>
  );
}

export default RoundIntroScreen;

import styles from './RoundIntroScreen.module.css'

function RoundIntroScreen({
  roundTitle
}: {
  roundTitle: string
}) {
  return (
    <div className={`${styles.screen}`}>
      <p>{roundTitle}</p>
    </div>
  );
}

export default RoundIntroScreen;

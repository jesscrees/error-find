import { BUTTON_LABEL_CORRECT, BUTTON_LABEL_INCORRECT } from "@/constants/language";
import Button from "../Button/Button";
import styles from './Question.module.css'

function Question({
  question,
  onAnswerChosen
}: {
  question: Question
  onAnswerChosen: Function
}) {
  return (
    <section className={`${styles.question}`}>
      <p>{question.stimulus}</p>

      <div className={`${styles.buttonContainer}`}>
        <Button
          label={BUTTON_LABEL_CORRECT}
          onClick={() => onAnswerChosen(true)}
        />
        <Button
          label={BUTTON_LABEL_INCORRECT}
          onClick={() => onAnswerChosen(false)}
        />
      </div>
    </section>
  );
}

export default Question;

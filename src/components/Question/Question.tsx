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
    <div className={`${styles.question}`}>
      <p>{question.stimulus}</p>

      <Button label={BUTTON_LABEL_CORRECT} onClick={() => onAnswerChosen(true)} />
      <Button label={BUTTON_LABEL_INCORRECT} onClick={() => onAnswerChosen(false)} />
    </div>
  );
}

export default Question;

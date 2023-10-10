import {
  ANSWER_LABEL_CORRECT,
  ANSWER_LABEL_INCORRECT,
  QUESTION_LABEL,
} from '@/constants/language'
import styles from './ListOfAnsweredQuestions.module.css'

function ListOfAnsweredQuestions({
  answeredQuestions,
}: {
  answeredQuestions: Question[]
}) {
  return (
    <ol className={styles.list}>
      {answeredQuestions.map((question: Question) => {
        return (
          <li key={question.order}>
            <div className={styles.answerContainer}>
              <span>
                {QUESTION_LABEL}
                {question.order}
              </span>

              <span className={styles.result}>
                {question.is_correct === question.user_answers[0]
                  ? ANSWER_LABEL_CORRECT
                  : ANSWER_LABEL_INCORRECT}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default ListOfAnsweredQuestions

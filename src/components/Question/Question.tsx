import { useEffect, useState } from 'react'

import {
  BUTTON_LABEL_CORRECT,
  BUTTON_LABEL_INCORRECT,
} from '@/constants/language'
import Button from '../Button/Button'
import styles from './Question.module.css'

function Question({
  className,
  question,
  onAnswerChosen,
}: {
  className: string
  question: Question
  onAnswerChosen: Function
}) {
  // Format question to turn markdown into html
  const [formattedQuestion, setFormattedQuestion] = useState<string>('')

  useEffect(() => {
    const replacedFirstAsterisk = question?.stimulus.replace(
      '*', 
      '<strong>'
    )

    const replacedSecondAsterisk = replacedFirstAsterisk.replace(
      '*',
      '</strong>'
    )

    setFormattedQuestion(replacedSecondAsterisk)
  }, [question])

  return (
    <section className={`${className} ${styles.question}`}>
      <div className={styles.textContainer}>
        <p dangerouslySetInnerHTML={{ __html: formattedQuestion }}></p>
      </div>

      <div className={styles.buttonContainer}>
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
  )
}

export default Question

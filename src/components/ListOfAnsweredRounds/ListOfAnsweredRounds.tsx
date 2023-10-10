import ListOfAnsweredQuestions from '../ListOfAnsweredQuestions/ListOfAnsweredQuestions'
import styles from './ListOfAnsweredRounds.module.css'

function ListOfAnsweredRounds({ answeredRounds }: { answeredRounds: Round[] }) {
  return (
    <ol className={styles.list}>
      {answeredRounds.map((round: Round) => {
        return (
          <li key={round.order}>
            <span>{round.round_title}</span>
            <ListOfAnsweredQuestions answeredQuestions={round.questions} />
          </li>
        )
      })}
    </ol>
  )
}

export default ListOfAnsweredRounds

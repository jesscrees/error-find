import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'

import PageHeader from '@/components/PageHeader'
import Question from '@/components/Question/Question'
import RoundIntroScreen from '@/components/RoundIntroScreen/RoundIntroScreen'
import { QUESTION_LABEL } from '@/constants/language'
import { doesActivityContainRounds, getDataFromLocalStorage, setDataInLocalStorage } from '@/helpers'
import styles from '@/styles/Question.module.css'

const inter = Inter({ subsets: ['latin'] })

type PageProps = {
  activity: Activity
  activityId: string
  roundId: string
  questionId: string
  quiz: QuizData
}

export default function QuestionPage({
  activity,
  activityId,
  roundId,
  questionId,
  quiz,
}: PageProps) {
  const router = useRouter()

  const MILLISECONDS_TO_SHOW_ROUND_NUMBER_SCREEN = 1000

  // Store current quiz data
  const [quizData, setQuizData] = useState<QuizData>()

  // Store current round and current question
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(
    Number(roundId) - 1
  )
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    Number(questionId) - 1
  )

  // If the activity is a round, is it the beginning of the round?
  const isRound = doesActivityContainRounds(activity)
  const [isBeginningOfRound, setIsBeginningOfRound] = useState<boolean>(
    isRound && Number(questionId) === 1
  )

  // Ensure the round and question indexes are correct when the page url changes
  useEffect(() => {
    setCurrentRoundIndex(Number(roundId) - 1)
    setCurrentQuestionIndex(Number(questionId) - 1)
  }, [activityId, roundId, questionId])

  // Show a brief round intro screen if a new round has begun
  // TODO: this can be improved as we're setting some of this as state when the page loads
  useEffect(() => {
    let roundIntroScreenTimer: NodeJS.Timeout

    if (isRound && Number(questionId) == 1) {
      setIsBeginningOfRound(true)

      roundIntroScreenTimer = setTimeout(() => {
        setIsBeginningOfRound(false)
      }, MILLISECONDS_TO_SHOW_ROUND_NUMBER_SCREEN)
    }

    return () => {
      clearTimeout(roundIntroScreenTimer)
    }
  }, [currentRoundIndex, isRound, questionId])

  // Get current quiz data from local storage
  useEffect(() => {
    let dataRetrievedFromLocalStorage = getDataFromLocalStorage();

    if (dataRetrievedFromLocalStorage === null) {
      // If data in local storage is missing, use the quiz data from static props
      setDataInLocalStorage(quiz)
      dataRetrievedFromLocalStorage = quiz
    }

    setQuizData(dataRetrievedFromLocalStorage)
  }, [quiz]);

  function goToActivityResultsPage() {
    router.push(`/${activityId}/results`)
  }

  function getCurrentQuestion(_activity: Activity) {
    if (isRound && currentRoundIndex < (_activity as ActivityWithRounds).questions.length) {
      return (_activity as ActivityWithRounds).questions[currentRoundIndex].questions[currentQuestionIndex]
    }

    return (_activity as ActivityWithoutRounds).questions[currentQuestionIndex]
  }

  function submitAnswer(chosenAnswer: any) {
    let currentQuizData: QuizData | undefined = quizData
    if (!currentQuizData) return

    // Store the answer within the existing quiz data structure
    if (isRound) {
      (currentQuizData.activities[activity.order - 1] as ActivityWithRounds).questions[currentRoundIndex].questions[currentQuestionIndex].user_answers = [chosenAnswer]
    } else {
      (currentQuizData.activities[activity.order - 1] as ActivityWithoutRounds).questions[currentQuestionIndex].user_answers = [chosenAnswer]
    }

    // Store the updated data
    // TODO: setQuizData might be unneccessary here
    setQuizData(currentQuizData)
    setDataInLocalStorage(currentQuizData)

    // Send the user to the next step of the quiz
    // Either new round, new question, or show the results page for this activity
    if (currentQuestionIndex < activity.questions.length - 1) {
      // Go to next question
      let nextQuestionIndex = Number(questionId) + 1
      router.push(`/${activityId}/${roundId}/${nextQuestionIndex}`)
    } else {
      if (isRound) {
        if (currentRoundIndex < (activity as ActivityWithRounds).questions.length - 1) {
          // Go to next round
          // TODO - talk about why this automatically goes to the next round instead of prompting user as per the brief
          let nextRoundIndex = Number(roundId) + 1
          router.push(`/${activityId}/${nextRoundIndex}/1`)
        } else {
          // Last round is finished, go to results
          goToActivityResultsPage()
        }
      } else {
        // Last question is finished, go to results
        goToActivityResultsPage()
      }
    }
  }

  return (
    <>
      <PageHeader />

      {isBeginningOfRound && (
        <RoundIntroScreen
          roundTitle={
            (activity as ActivityWithRounds)
              .questions[currentRoundIndex]
              .round_title
          }
        />
      )}

      <main className={`${styles.main} ${inter.className}`}>
        <h2>
          {activity.activity_name}
          {isRound && (` / ${(
            activity as ActivityWithRounds).questions[currentRoundIndex].round_title
          }`)}
        </h2>

        <h1>
          {QUESTION_LABEL}{currentQuestionIndex + 1}.
        </h1>

        <Question
          question={getCurrentQuestion(activity)}
          onAnswerChosen={(chosenAnswer: boolean) => submitAnswer(chosenAnswer)}
        />
      </main>
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const results = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then(
    (res) => res.json()
  )

  return {
    props: {
      activity: results.activities[Number(params?.activity) - 1] || {},
      activityId: params?.activity,
      roundId: params?.round,
      questionId: params?.question,
      quiz: results,
    },
  }
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then((res) =>
    res.json()
  )

  let allQuestions: {
    activityId: string
    roundId: string
    questionId: string
  }[] = []

  // Search through all of the activities
  data.activities.map((_activity: Activity) => {
    let activityId = _activity.order.toString()
    let roundId = '0'

    if (doesActivityContainRounds(_activity)) {
      // If the activity contains rounds
      _activity.questions.map((_round: Round) => {
        roundId = _round.order.toString()

        // Search through the questions in each round
        _round.questions.map((_question: Question) => {
          let questionId = _question.order.toString()
          allQuestions.push({
            activityId,
            roundId,
            questionId,
          })
        })
      })
    } else {
      // If the activity doesn't contain rounds
      // Search through the questions in the activity
      _activity.questions.map((_question: Question) => {
        let questionId = _question.order.toString()
        allQuestions.push({
          activityId,
          roundId,
          questionId,
        })
      })
    }
  })

  const paths = allQuestions.map((_question) => {
    return {
      params: {
        activity: _question.activityId,
        round: _question.roundId,
        question: _question.questionId,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}) satisfies GetStaticPaths

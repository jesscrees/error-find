import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Inter } from 'next/font/google'

import PageHeader from '@/components/PageHeader'
import RoundIntroScreen from '@/components/RoundIntroScreen/RoundIntroScreen'
import { doesActivityContainRounds } from '@/helpers'
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
  const MILLISECONDS_TO_SHOW_ROUND_NUMBER_SCREEN = 1000

  // Store current round
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(
    Number(roundId) - 1
  )

  // If the activity is a round, briefly show a round intro screen
  const isRound = doesActivityContainRounds(activity)
  const [isBeginningOfRound, setIsBeginningOfRound] = useState<boolean>(
    isRound && Number(questionId) === 1
  )

  // Show a brief round intro screen if a new round has begun
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

      <main className={`${styles.main} ${inter.className}`}>Question Page</main>
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

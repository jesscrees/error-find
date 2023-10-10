import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Footer from '@/components/Footer/Footer'
import ListOfAnsweredQuestions from '@/components/ListOfAnsweredQuestions/ListOfAnsweredQuestions'
import ListOfAnsweredRounds from '@/components/ListOfAnsweredRounds/ListOfAnsweredRounds'
import PageHeader from '@/components/PageHeader'
import { HEADING_RESULTS } from '@/constants/language'
import { doesActivityContainRounds, getDataFromLocalStorage } from '@/helpers'
import styles from '@/styles/PageWithList.module.css'

export default function ActivityResults() {
  const router = useRouter()
  const activityId = router.query.activity

  const [activityName, setActivityName] = useState<string>()
  const [activityQuestions, setActivityQuestions] = useState<Question[]>()
  const [activityRounds, setActivityRounds] = useState<Round[]>()

  // Get current quiz data for the completed activity
  useEffect(() => {
    const dataRetrievedFromLocalStorage = getDataFromLocalStorage()

    // Send user home if there's no data
    if (dataRetrievedFromLocalStorage === null) {
      router.push('/')
    }

    const currentActivity =
      dataRetrievedFromLocalStorage?.activities[Number(activityId) - 1]

    setActivityName(currentActivity?.activity_name)

    if (doesActivityContainRounds(currentActivity)) {
      setActivityRounds(currentActivity.questions)
    } else {
      setActivityQuestions(currentActivity?.questions)
    }
  }, [activityId, router])

  return (
    <>
      <PageHeader />

      <section className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <h2>{activityName}</h2>

          <h1>{HEADING_RESULTS}</h1>
        </div>

        {activityQuestions && activityQuestions?.length > 0 && (
          <ListOfAnsweredQuestions answeredQuestions={activityQuestions} />
        )}

        {activityRounds && activityRounds?.length > 0 && (
          <ListOfAnsweredRounds answeredRounds={activityRounds} />
        )}

        <Footer />
      </section>
    </>
  )
}

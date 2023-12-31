import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import ActivityList from '@/components/ActivityList/ActivityList'
import Footer from '@/components/Footer/Footer'
import PageHeader from '@/components/PageHeader'
import { HEADING_CAE, NAVIGATION_LABEL_RESULTS } from '@/constants/language'
import {
  hasUserAnsweredEveryQuestion,
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from '@/helpers'
import styles from '@/styles/PageWithList.module.css'

export default function Home({ quiz }: { quiz: QuizData }) {
  const [isResultsLinkEnabled, setIsResultsLinkEnabled] = useState<boolean>(false)
  const [quizData, setQuizData] = useState<QuizData>(quiz)

  // Ensure that quiz data has been stored in local storage
  // but retrieve pre-existing quiz data, if it already exists,
  // as it will contain the user's answers
  useEffect(() => {
    const dataRetrievedFromLocalStorage = getDataFromLocalStorage()

    if (dataRetrievedFromLocalStorage === null) {
      setDataInLocalStorage(quiz)
    } else {
      setQuizData(dataRetrievedFromLocalStorage)
    }
  }, [quiz])

  // Find out if the user has answered every question
  // If they have then we can enable the results link
  useEffect(() => {
    async function findIfAllQuestionsAnswered() {
      const results = await hasUserAnsweredEveryQuestion(quizData)
      setIsResultsLinkEnabled(results)
    }
    findIfAllQuestionsAnswered()
  }, [quizData])

  return (
    <>
      <PageHeader />

      <section className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <h2>{HEADING_CAE}</h2>

          <h1>{quizData?.name}</h1>
        </div>

        <ActivityList activities={quizData?.activities} />

        <Footer
          linkDisabled={!isResultsLinkEnabled}
          linkHref={isResultsLinkEnabled ? 'results' : ''}
          linkLabel={NAVIGATION_LABEL_RESULTS}
        />
      </section>
    </>
  )
}

export const getStaticProps = (async () => {
  const quiz = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then((res) =>
    res.json()
  )

  return {
    props: {
      quiz,
    },
  }
}) satisfies GetStaticProps

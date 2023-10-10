import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import ActivityList from '@/components/ActivityList/ActivityList'
import Footer from '@/components/Footer/Footer'
import PageHeader from '@/components/PageHeader'
import { HEADING_CAE, NAVIGATION_LABEL_RESULTS } from '@/constants/language'
import { hasUserAnsweredEveryQuestion, getDataFromLocalStorage, setDataInLocalStorage } from '@/helpers'
import styles from '@/styles/Home.module.css'

export default function Home({ quiz }: { quiz: QuizData }) {
  const [isResultsLinkEnabled, setIsResultsLinkEnabled] = useState<boolean>(false)

  const [quizData, setQuizData] = useState<QuizData>()

  // Ensure that quiz data has been stored in local storage
  // but retrieve pre-existing quiz data, if it already exists,
  // as it will contain the user's answers
  useEffect(() => {
    const dataRetrievedFromLocalStorage = getDataFromLocalStorage()

    if (dataRetrievedFromLocalStorage === null) {
      setDataInLocalStorage(quiz)
    }

    setQuizData(dataRetrievedFromLocalStorage)

    // Find out if the user has started to answer questions
    // If they have then we can enable the results link
    setIsResultsLinkEnabled(hasUserAnsweredEveryQuestion(dataRetrievedFromLocalStorage))
  }, [quiz])

  return (
    <>
      <PageHeader />

      <main className={styles.main}>
        <h3>{HEADING_CAE}</h3>

        {quizData?.name && (
          <h1>{quizData?.name}</h1>
        )}

        {quizData?.activities && quizData?.activities?.length > 0 && (
          <ActivityList activities={quizData?.activities} />
        )}
      </main>

      <Footer
        linkDisabled={!isResultsLinkEnabled}
        linkHref="results"
        linkLabel={NAVIGATION_LABEL_RESULTS}
      />
    </>
  )
}

export const getStaticProps = (async () => {
  const quiz = await fetch(`${
    process.env.NEXT_PUBLIC_API_URL
  }`).then((res) => res.json())

  return {
    props: {
      quiz,
    },
  }
}) satisfies GetStaticProps
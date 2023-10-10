import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { Inter } from 'next/font/google'

import ActivityList from '@/components/ActivityList/ActivityList'
import Footer from '@/components/Footer/Footer'
import PageHeader from '@/components/PageHeader'
import { HEADING_CAE, NAVIGATION_LABEL_RESULTS } from '@/constants/language'
import { doUserResultsExist, getDataFromLocalStorage, setDataInLocalStorage } from '@/helpers'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ quiz }: { quiz: QuizData }) {
  const [isResultsLinkEnabled, setIsResultsLinkEnabled] = useState<boolean>(false)

  // Ensure that quiz data has been stored in local storage
  // but retrieve pre-existing quiz data, if it already exists,
  // as it will contain the user's answers
  useEffect(() => {
    const dataRetrievedFromLocalStorage = getDataFromLocalStorage()

    if (dataRetrievedFromLocalStorage === null) {
      setDataInLocalStorage(quiz)
    }

    // Find out if the user has started to answer questions
    // If they have then we can enable the results link
    setIsResultsLinkEnabled(doUserResultsExist(dataRetrievedFromLocalStorage))
  }, [quiz])

  return (
    <>
      <PageHeader />

      <main className={`${styles.main} ${inter.className}`}>
        <h3>{HEADING_CAE}</h3>

        {quiz?.name && (
          <h1>{quiz?.name}</h1>
        )}

        {quiz?.activities?.length > 0 && (
          <ActivityList activities={quiz?.activities} />
        )}
      </main>

      <Footer
        className={`${inter.className}`}
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
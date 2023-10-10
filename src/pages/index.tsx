import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { Inter } from 'next/font/google'

import { HEADING_CAE } from '@/constants/language'
import { getDataFromLocalStorage, setDataInLocalStorage } from '@/helpers'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ quiz }: { quiz: QuizData }) {
  // Ensure that quiz data has been stored in local storage
  // but retrieve pre-existing quiz data, if it already exists,
  // as it will contain the user's answers
  useEffect(() => {
    const dataRetrievedFromLocalStorage = getDataFromLocalStorage()

    if (dataRetrievedFromLocalStorage === null) {
      setDataInLocalStorage(quiz)
    }
  }, [quiz])

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <h3>{HEADING_CAE}</h3>
      <h1>{quiz?.name}</h1>
    </main>
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
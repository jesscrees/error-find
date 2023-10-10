import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import Footer from '@/components/Footer/Footer'
import PageHeader from '@/components/PageHeader'
import { getDataFromLocalStorage } from '@/helpers'
import styles from '@/styles/Results.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function ActivityResults() {
  const router = useRouter()
  const activityId = router.query.activity

  const [quizData, setQuizData] = useState<QuizData>()

  useEffect(() => {
   const dataRetrievedFromLocalStorage = getDataFromLocalStorage();

   // Send user home if there's no data
   if (dataRetrievedFromLocalStorage === null) {
     router.push("/")
   }

   setQuizData(dataRetrievedFromLocalStorage)
 }, [router]);

 console.log(quizData)

  return (
    <>
      <PageHeader />
      <main className={`${styles.main} ${inter.className}`}>
        Activity {activityId} results
      </main>
      <Footer />
    </>
  )
}

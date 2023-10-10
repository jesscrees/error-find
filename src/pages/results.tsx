import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

import { getDataFromLocalStorage } from '@/helpers';
import styles from '@/styles/Results.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Results() {
  const router = useRouter()
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
    <main className={`${styles.main} ${inter.className}`}>
      Results page for all activities
    </main>
  )
}

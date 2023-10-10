import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import Footer from '@/components/Footer/Footer';
import PageHeader from '@/components/PageHeader';
import { doesActivityContainRounds, getDataFromLocalStorage } from '@/helpers';
import styles from '@/styles/PageWithList.module.css'
import { HEADING_RESULTS } from '@/constants/language';
import ListOfAnsweredRounds from '@/components/ListOfAnsweredRounds/ListOfAnsweredRounds';
import ListOfAnsweredQuestions from '@/components/ListOfAnsweredQuestions/ListOfAnsweredQuestions';

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

 console.log(quizData?.activities)

  return (
    <>
      <PageHeader />

      <section className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <h1>
            {HEADING_RESULTS}
          </h1>
        </div>

        {quizData?.activities && quizData?.activities.length > 0 && (
          <ol className={styles.list}>
            {quizData?.activities?.map((activity: Activity) => {
              return (
                <li key={activity.order} className={styles.listHeading}>
                  <span>{activity.activity_name}</span>
                  {doesActivityContainRounds(activity) ? (
                    <ListOfAnsweredRounds answeredRounds={activity.questions} />
                  ) : (
                    <ListOfAnsweredQuestions answeredQuestions={activity.questions} />
                  )}
                </li>
              )
            })}
          </ol>
        )}

        <Footer />
      </section>
    </>
  )
}

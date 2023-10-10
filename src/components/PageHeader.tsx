import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getDataFromLocalStorage } from "@/helpers";

function PageHeader() {
  const router = useRouter()
  const [quizData, setQuizData] = useState<QuizData>()

  useEffect(() => {
    const dataRetrievedFromLocalStorage = getDataFromLocalStorage();
    setQuizData(dataRetrievedFromLocalStorage)
  }, [router]);

  return (
    <Head>
      {quizData?.name && (
        <title>{quizData?.name}</title>
      )}
      {quizData?.heading && (
        <meta name="description" content={quizData?.heading} />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default PageHeader;

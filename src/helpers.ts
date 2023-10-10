/*
 * Getting and setting quiz data
 */
const LOCAL_STORAGE_KEY = 'error-find-quiz-data'

export function getDataFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (data === null || data === "undefined") {
    return null
  } else {
    return JSON.parse(data)
  }
}

export function setDataInLocalStorage(data: QuizData) {
  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

/*
 * Check if activity contains rounds or not
 */
export function doesActivityContainRounds(activity: ActivityWithRounds|ActivityWithoutRounds) {
  // TODO: Can this function be replaced with better typescript checking?
  return activity?.questions[0]?.hasOwnProperty('round_title')
}

/*
 * Check if user results exist before allowing user to view them
 */
export function doUserResultsExist(data: QuizData) {
  // TODO: this can be improved so it stops at the first true answer

  // Go through every question and see if there are any answers in user_answers array
  let hasUserAnsweredAQuestion = false;

  data?.activities.map((activity: Activity) => {
    if (doesActivityContainRounds(activity)) {
      // If the activity is a round, go through each question in each round
      (activity as ActivityWithRounds).questions.map((round) => {
        round.questions.map((question: Question) => {
          if (question.user_answers.length > 0) {
            hasUserAnsweredAQuestion = true
          }
        })
      })
    } else {
      (activity as ActivityWithoutRounds).questions.map((question) => {
        if (question.user_answers.length > 0) {
          hasUserAnsweredAQuestion = true
        }
      })
    }
  })

  return hasUserAnsweredAQuestion
}

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
 * Check if user has answered every question
 */
export function hasUserAnsweredEveryQuestion(data: QuizData) {
  // Go through every question and see if there are any answers in user_answers array
  let hasUserNotAnsweredAQuestion = false;

  data?.activities.map((activity: Activity) => {
    if (doesActivityContainRounds(activity)) {
      // If the activity is a round, go through each question in each round
      (activity as ActivityWithRounds).questions.map((round) => {
        round.questions.map((question: Question) => {
          if (question.user_answers.length === 0) {
            hasUserNotAnsweredAQuestion = true
          }
        })
      })
    } else {
      (activity as ActivityWithoutRounds).questions.map((question) => {
        if (question.user_answers.length === 0) {
          hasUserNotAnsweredAQuestion = true
        }
      })
    }
  })

  return !hasUserNotAnsweredAQuestion
}

/*
 * Check if user has answered every question in activity
 */
export function hasUserAnsweredEveryQuestionInActivity(activity: Activity) {
  // Go through every question and see if there are any answers in user_answers array
  let hasUserNotAnsweredAQuestion = false;

  console.log(activity)

  if (doesActivityContainRounds(activity)) {
    // If the activity is a round, go through each question in each round
    (activity as ActivityWithRounds).questions.map((round) => {
      round.questions.map((question: Question) => {
        if (question.user_answers.length === 0) {
          hasUserNotAnsweredAQuestion = true
        }
      })
    })
  } else {
    (activity as ActivityWithoutRounds).questions.map((question) => {
      if (question.user_answers.length === 0) {
        hasUserNotAnsweredAQuestion = true
      }
    })
  }

  return !hasUserNotAnsweredAQuestion
}
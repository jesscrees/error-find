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

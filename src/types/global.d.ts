export {}

declare global {
  interface Question {
    feedback: string
    is_correct: boolean
    order: number
    stimulus: string
    user_answers: boolean[]
  }

  interface Round {
    order: number
    questions: Question[]
    round_title: string
  }

  interface Activity {
    activity_name: string
    order: number
    questions: []
  }
  interface ActivityWithRounds extends Activity {
    questions: Round[]
  }
  interface ActivityWithoutRounds extends Activity {
    questions: Question[]
  }

  interface QuizData {
    name: string
    heading: string
    activities: Activity[]
  }
}
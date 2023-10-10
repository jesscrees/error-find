import Link from 'next/link'

import {
  doesActivityContainRounds,
  hasUserAnsweredEveryQuestionInActivity,
} from '@/helpers'
import styles from './ActivityList.module.css'

function ActivityList({ activities }: { activities: Activity[] }) {
  const INITIAL_QUESTION_ID = 1

  return (
    <ol className={styles.list}>
      {activities?.map((activity, index) => {
        let enableLink = false

        // If it's the 1st activity then enable link
        if (index === 0) {
          enableLink = true
        } else {
          // If it's a subsequent activity, only enable link if the previous activity has been completed
          enableLink = hasUserAnsweredEveryQuestionInActivity(
            activities[index - 1]
          )
        }

        const linkHref = enableLink
          ? `/${activity?.order}/${
              doesActivityContainRounds(activity) ? '1' : '0'
            }/${INITIAL_QUESTION_ID}`
          : ''

        return (
          <li key={activity?.order}>
            <Link
              aria-disabled={!enableLink}
              className={!enableLink ? styles.disabled : ''}
              href={linkHref}
            >
              {activity?.activity_name}
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export default ActivityList

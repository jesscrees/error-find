import Link from 'next/link';

import { doesActivityContainRounds } from '@/helpers';
import styles from './ActivityList.module.css'

function ActivityList({
  activities
}: {
  activities: Activity[]
}) {
  const INITIAL_QUESTION_ID = 1

  return (
    <ol className={styles.list}>
      {activities?.map((activity) => {
        return (
          <li key={activity?.order}>
            <Link
              href={`/${
                activity?.order
              }/${
                doesActivityContainRounds(activity) ? '1' : '0'
              }/${
                INITIAL_QUESTION_ID
              }`}
            >
              {activity?.activity_name}
            </Link>
          </li>
        )
      })}
    </ol>
  );
}

export default ActivityList;

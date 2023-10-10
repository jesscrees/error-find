import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import {
  HEADING_PAGE_NOT_FOUND,
  NAVIGATION_LABEL_HOME,
  NAVIGATION_LABEL_RESULTS,
} from '@/constants/language'

export default function FourOhFour() {
  return (
    <>
      <PageHeader />

      <section>
        <h1>{HEADING_PAGE_NOT_FOUND}</h1>

        <Link href="/">{NAVIGATION_LABEL_HOME}</Link>

        <Link href="/results">{NAVIGATION_LABEL_RESULTS}</Link>
      </section>
    </>
  )
}

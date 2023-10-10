import { Inter } from 'next/font/google';
import Link from 'next/link'

import PageHeader from '@/components/PageHeader'
import { NAVIGATION_LABEL_HOME, NAVIGATION_LABEL_RESULTS } from '@/constants/language';

const inter = Inter({ subsets: ['latin'] })

export default function FourOhFour() {
  return (
    <>
      <PageHeader />

      <main className={inter.className}>
        <h1>404 - Page Not Found</h1>

        <Link href="/">
          {NAVIGATION_LABEL_HOME}
        </Link>

        <Link href="/results">
          {NAVIGATION_LABEL_RESULTS}
        </Link>
      </main>
    </>
  )
}
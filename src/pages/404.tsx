import Footer from '@/components/Footer/Footer'
import PageHeader from '@/components/PageHeader'
import { HEADING_PAGE_NOT_FOUND } from '@/constants/language'
import styles from '@/styles/PageWithList.module.css'

export default function FourOhFour() {
  return (
    <>
      <PageHeader />

      <section className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <h1>{HEADING_PAGE_NOT_FOUND}</h1>
        </div>

        <Footer />
      </section>
    </>
  )
}

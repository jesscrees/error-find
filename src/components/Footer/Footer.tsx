import Link from "next/link";

import { NAVIGATION_LABEL_HOME } from "@/constants/language";
import styles from './Footer.module.css'

function Footer({
  linkDisabled = false,
  linkHref = '',
  linkLabel = NAVIGATION_LABEL_HOME
}: {
  linkDisabled?: boolean
  linkHref?: string
  linkLabel?: string
}) {
  // Footer defaults to showing a link to the home page if nothing is passed to it
  return (
    <footer className={styles.footer}>
      <Link
        aria-disabled={linkDisabled}
        className={linkDisabled ? styles.disabled : ''}
        href={!linkDisabled ?`/${linkHref}` : ''}
      >
        {linkLabel}
      </Link>
    </footer>
  );
}

export default Footer;

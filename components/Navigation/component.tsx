import Link from "next/link"

import styles from "./styles.module.scss"

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link className={styles.navigation__link} href="/about">
        About
      </Link>
      <Link className={styles.navigation__link} href="/contacts">
        Contacts
      </Link>
      <Link className={styles.navigation__link} href="/send-message">
        Send message
      </Link>
    </nav>
  )
}

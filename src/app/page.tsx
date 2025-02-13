import styles from "./page.module.css"
import Navigation from "../../components/Navigation"

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}> Welcome to Next.js! </h1>
      </main>
    </div>
  )
}

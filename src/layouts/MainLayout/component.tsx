import Navigation from "../../components/Navigation"
import type React from "react"
import styles from "./styles.module.scss"
import { ROUTES_MAP } from "@/constants/app"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const routes = Object.values(ROUTES_MAP)
  console.log(routes)
  console.log(styles)
  return (
    <div className={styles["main-layout"]}>
      <header className={styles["main-layout__container"]}>
        <Navigation routes={routes} />
      </header>
      <div>{children}</div>
    </div>
  )
}

export default MainLayout

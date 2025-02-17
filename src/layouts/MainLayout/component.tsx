"use client"

import Navigation from "../../components/Navigation"
import type React from "react"
import styles from "./styles.module.scss"
import { ROUTES_MAP } from "@/constants/app"
import { useMemo, useState, createContext } from "react"

interface MainLayoutProps {
  children: React.ReactNode
}

export const DataContext = createContext<{
  theme: string
  setTheme: (theme: string) => void
}>({ theme: "light", setTheme: () => {} })

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const routes = Object.values(ROUTES_MAP).filter(
    (route) => route.showInNavigation
  )
  const [theme, setTheme] = useState("light")

  const dataContextInfo = useMemo(() => {
    return { theme, setTheme }
  }, [theme, setTheme])

  return (
    <div className={styles["main-layout"]}>
      <DataContext.Provider value={dataContextInfo}>
        <header className={styles["main-layout__container"]}>
          <Navigation routes={routes} />
        </header>
        <div>{children}</div>
      </DataContext.Provider>
    </div>
  )
}

export default MainLayout

import Link from "next/link"
import type React from "react"

import styles from "./styles.module.scss"
import { IRoute } from "@/constants/app"

interface NavigationProps {
  routes: IRoute[]
}

const Navigation: React.FC<NavigationProps> = ({ routes }) => {
  return (
    <nav className={styles.navigation}>
      {routes.map(route => (
        <Link
          key={route.path}
          className={styles.navigation__link}
          href={route.path}>
          {route.title}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation

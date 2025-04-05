import type React from "react"

import Link from "next/link"

import { IRoute } from "@/constants/app"

import styles from "./styles.module.scss"

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

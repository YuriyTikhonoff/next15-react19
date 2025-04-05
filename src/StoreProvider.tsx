"use client"

import React, { createContext, useContext } from "react"

import { useThemeStore } from "./store/themeStore"

const StoreContext = createContext<ReturnType<typeof useThemeStore> | null>(
  null
)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useThemeStore()
  return <StoreContext.Provider value={theme}>{children}</StoreContext.Provider>
}

export const useStoreContext = () => useContext(StoreContext)

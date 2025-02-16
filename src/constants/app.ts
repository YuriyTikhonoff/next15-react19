export enum ROUTE_KEYS {
  ABOUT = "ABOUT",
  CONTACTS = "CONTACTS",
  HOME = "HOME",
  PROJECTS = "PROJECTS",
  NOT_FOUND = "NOT_FOUND",
  SEND_MESSAGE = "SEND_MESSAGE",
}

export interface IRoute {
  path: string
  title: string
  showInNavigation?: boolean
}

export const ROUTES_MAP: Record<ROUTE_KEYS, IRoute> = {
  [ROUTE_KEYS.HOME]: {
    path: "/",
    title: "Home",
    showInNavigation: true,
  },
  [ROUTE_KEYS.ABOUT]: {
    path: "/about",
    title: "About",
    showInNavigation: true,
  },
  [ROUTE_KEYS.CONTACTS]: {
    path: "/contacts",
    title: "Contacts",
    showInNavigation: true,
  },
  [ROUTE_KEYS.PROJECTS]: {
    path: "/projects",
    title: "Projects",
    showInNavigation: true,
  },
  [ROUTE_KEYS.NOT_FOUND]: {
    path: "/404",
    title: "Not Found",
    showInNavigation: false,
  },
  [ROUTE_KEYS.SEND_MESSAGE]: {
    path: "/send-message",
    title: "Send Message",
    showInNavigation: true,
  },
}

export enum ROUTE_KEYS {
  ABOUT = "ABOUT",
  CONTACTS = "CONTACTS",
  HOME = "HOME",
  NOT_FOUND = "NOT_FOUND",
  SEND_MESSAGE = "SEND_MESSAGE",
}

export interface IRoute {
  path: string
  title: string
}

export const ROUTES_MAP: Record<ROUTE_KEYS, IRoute> = {
  [ROUTE_KEYS.ABOUT]: {
    path: "/about",
    title: "About",
  },
  [ROUTE_KEYS.CONTACTS]: {
    path: "/contacts",
    title: "Contacts",
  },
  [ROUTE_KEYS.HOME]: {
    path: "/",
    title: "Home",
  },
  [ROUTE_KEYS.NOT_FOUND]: {
    path: "/404",
    title: "Not Found",
  },
  [ROUTE_KEYS.SEND_MESSAGE]: {
    path: "/send-message",
    title: "Send Message",
  },
}

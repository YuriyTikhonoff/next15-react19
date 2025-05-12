import dayjs from "dayjs"

export const getTimeAgoValue = (timestamp: string): string =>
  dayjs(timestamp).fromNow()

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

export const getTimeAgoValue = (timestamp: string): string => {
  dayjs.extend(relativeTime)
  return dayjs(timestamp).fromNow()
}

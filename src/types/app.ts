export interface Post {
  author: string
  category: string
  content: string
  date: string
  id: number
  title: string
}

export interface MemoCard {
  id: string
  title: string
  front: string
  back: string
  category: string
  level: number
  lastPracticeTimestamp: string
  createdAtTimestamp: string
  useReversedDefaultView?: boolean
}

export enum LocalStorageFields {
  Cards = "cards",
  Categories = "categories",
}

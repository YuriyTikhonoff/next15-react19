export interface Post {
  author: string;
  category: string;
  content: string;
  date: string;
  id: number;
  title: string;
}

export interface MemoCard {
  front: string;
  back: string;
  category: string;
  level: number;
  lastPractice: string;
}

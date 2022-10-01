// 商品カテゴリ
export type Category =
  | 'flowmeter'
  | 'pressureGauge'
  | 'thermometer'
  | 'flameDetector'

// 進捗
export type Progress = 'notStarted' | 'doing' | 'postponed' | 'done'

// ユーザー
export type User = {
  id: number
  username: string
  displayName: string
  email: string
  profileImageUrl: string
  description: string
}

// 計器
export type Product = {
  id: number
  category: Category
  title: string
  description: string
  imageUrl: string
  blurDataUrl: string
  progress: Progress
  owner: User
}

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}

// 進捗
export type Filter = {
  label: string
  name: string
}

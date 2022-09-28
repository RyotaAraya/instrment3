// 商品カテゴリ
export type Category =
  | 'flowmeter'
  | 'pressureGauge'
  | 'thermometer'
  | 'flameDetector'
// プラント
export type Condition = 'new' | 'used'

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
  price: number
  condition: Condition
  owner: User
}

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}

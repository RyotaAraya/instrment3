import useSWR from 'swr'
import type { ApiContext, Category, Progress, Product } from 'types'

export type UseSearchProps = {
  /**
   * 計器カテゴリ
   */
  category?: Category
  /**
   * 計器状態
   */
  progresses?: Progress[]
  /**
   * 所有するユーザーID
   */
  userId?: number
  /**
   * ソートするキー
   */
  sort?: keyof Omit<Product, 'owner'>
  /**
   * 昇順or降順
   */
  order?: 'asc' | 'desc'
  /**
   * 初期状態
   */
  initial?: Product[]
}

export type UseSearch = {
  /**
   * 検索にヒットした計器リスト
   */
  products: Product[]
  /**
   * ロードフラグ
   */
  isLoading: boolean
  /**
   * エラーフラグ
   */
  isError: boolean
}

/**
 * プロダクトAPI（一覧取得）のカスタムフック
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 計器一覧とAPI呼び出しの状態
 */
const useSearch = (
  context: ApiContext,
  {
    category,
    userId,
    progresses,
    initial,
    sort = 'id',
    order = 'desc',
  }: UseSearchProps = {},
): UseSearch => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
  const params = new URLSearchParams()

  category && params.append('category', category)
  userId && params.append('owner.id', `${userId}`)
  progresses &&
    progresses.forEach((progress) => params.append('progress', progress))
  sort && params.append('_sort', sort)
  order && params.append('_order', order)
  const query = params.toString()
  const { data, error } = useSWR<Product[]>(
    query.length > 0 ? `${path}?${query}` : path,
  )

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useSearch

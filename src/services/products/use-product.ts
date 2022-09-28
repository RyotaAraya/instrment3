import useSWR from 'swr'
import type { ApiContext, Product } from 'types'

export type UseProductProps = {
  /**
   * 取得する計器ID
   */
  id: number
  /**
   * 初期状態
   */
  initial?: Product
}

export type UseProduct = {
  /**
   * 取得する計器
   */
  product?: Product
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
 * プロダクトAPI（個別取得）のカスタムフック
 * @param context APIコンテキスト
 * @param params 計器IDと初期状態
 * @returns 計器とAPI呼び出しの状態
 */
const useProduct = (
  context: ApiContext,
  { id, initial }: UseProductProps,
): UseProduct => {
  const { data, error } = useSWR<Product>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
  )

  return {
    product: data ?? initial,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProduct

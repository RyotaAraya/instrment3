import type { ApiContext, Product } from 'types'
import { fetcher } from 'utils'

export type GetProductParams = {
  /**
   * 取得する計器
   */
  id: number
}

/**
 * プロダクトAPI（個別取得）
 * @param context APIコンテキスト
 * @param params 計器ID
 * @returns 計器
 */
const getProduct = async (
  context: ApiContext,
  { id }: GetProductParams,
): Promise<Product> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
    {
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getProduct

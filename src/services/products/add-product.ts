import type { ApiContext, Product } from 'types'
import { fetcher } from 'utils'

export type AddProductsParams = {
  /**
   * 追加する計器
   */
  product: Omit<Product, 'id'>
}

/**
 * プロダクトAPI（新規追加）
 * @param context APIコンテキスト
 * @param params 新規追加する計器
 * @returns 新規追加した計器
 */
const addProduct = async (
  context: ApiContext,
  { product }: AddProductsParams,
): Promise<Product> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/products`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(product),
  })
}

export default addProduct

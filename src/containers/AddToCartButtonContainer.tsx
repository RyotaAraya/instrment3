import Button from 'components/atoms/Button'
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
import type { Product } from 'types'

interface AddToCartButtonContainerProps {
  /**
   * 追加される計器
   */
  product: Product
  /**
   * 追加ボタンを押した時のイベントハンドラ
   */
  onAddToCartButtonClick?: (product: Product) => void
}

/**
 * カート追加ボタンコンテナ
 */
const AddToCartButtonContainer = ({
  product,
  onAddToCartButtonClick,
}: AddToCartButtonContainerProps) => {
  const { cart, addProductToCart } = useShoppingCartContext()
  const handleAddToCartButtonClick = () => {
    const productId = Number(product.id)
    const result = cart.findIndex((v) => v.id === productId)

    // 同じ計器がカートに存在しない場合は追加する
    if (result === -1) {
      addProductToCart(product)
    }

    onAddToCartButtonClick && onAddToCartButtonClick(product)
  }

  return (
    <Button
      width={{ base: '100%', md: '400px' }}
      height="66px"
      onClick={handleAddToCartButtonClick}
    >
      変更
    </Button>
  )
}

export default AddToCartButtonContainer

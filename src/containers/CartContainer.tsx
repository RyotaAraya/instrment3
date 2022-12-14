import CartProduct from 'components/organisms/CartProduct'
import { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext'
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
import purchase from 'services/purchases/purchase'
import { ApiContext } from 'types'

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

/**
 * カートコンテナ
 */
const CartContainer = () => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const { cart, removeProductFromCart } = useShoppingCartContext()
  // 削除ボタンを押した時、計器を削除
  const handleRemoveButtonClick = (id: number) => {
    removeProductFromCart(id)
  }
  // 購入ボタンを押した時、計器を購入
  const handleBuyButtonClick = async (id: number) => {
    try {
      setGlobalSpinner(true)
      await purchase(context, { productId: id })
      window.alert('購入しました')
      // 計器購入後はカートから計器を削除する
      removeProductFromCart(id)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return (
    <>
      {cart.map((p) => (
        <CartProduct
          key={p.id}
          id={p.id}
          imageUrl={p.imageUrl}
          title={p.title}
          progress={p.progress}
          onRemoveButtonClick={handleRemoveButtonClick}
          onBuyButtonClick={handleBuyButtonClick}
        />
      ))}
    </>
  )
}

export default CartContainer

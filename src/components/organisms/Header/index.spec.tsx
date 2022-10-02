import { render, screen, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Header from '.'
import { AuthContextProvider } from 'contexts/AuthContext'
import { theme } from 'themes'
import type { User, Product } from 'types'

// ShoppingCartContextのモック
jest.mock('contexts/ShoppingCartContext')
// eslint-disable-next-line import/order
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
// オリジナルのShoppingCartContextProviderを取得
const { ShoppingCartContextProvider } = jest.requireActual(
  'contexts/ShoppingCartContext',
)

// ダミーユーザー
const authUser: User = {
  id: 1,
  username: 'dummy',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
}

describe('Header', () => {
  let renderResult: RenderResult
  const useShoppingCartContextMock =
    useShoppingCartContext as jest.MockedFunction<typeof useShoppingCartContext>

  it('サインイン', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    })

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider
            authUser={authUser}
            context={{ apiRootUrl: 'https://dummy' }}
          >
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    // サインインしている
    expect(screen.queryByTestId('profile-shape-image')).toBeTruthy()
    expect(screen.queryByTestId('profile-button')).toBeTruthy()

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })

  it('未サインイン', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    })

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    // サインインしていない
    expect(screen.queryByTestId('profile-shape-image')).toBeNull()

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })
})
